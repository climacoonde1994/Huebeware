import { Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { PriceModeService } from '../../core/price-mode.service';
import { OrderService } from '../../core/order.service';
import { Fulfillment, OrderRequest, PaymentMethod } from '../../core/order.models';
import { OrderStepsComponent } from '../../components/order-steps/order-steps.component';
import { STORE_INFO } from '../../data/store-info';

const PH_MOBILE = /^(09|\+639)\d{9}$/;

const isoDate = (d: Date) =>
  `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;

/** Step 2: contact details, pick-up or delivery, payment — then send the order. */
@Component({
  selector: 'app-checkout',
  imports: [DecimalPipe, ReactiveFormsModule, RouterLink, OrderStepsComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly orders = inject(OrderService);
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly cart = inject(CartService);
  readonly price = inject(PriceModeService);
  readonly store = STORE_INFO;

  readonly sending = signal(false);
  readonly error = signal('');

  readonly today = isoDate(new Date());
  readonly tomorrow = isoDate(new Date(Date.now() + 86_400_000));

  readonly timeSlots = [
    { value: 'morning', label: 'Morning (8 AM – 12 NN)' },
    { value: 'afternoon', label: 'Afternoon (1 PM – 5 PM)' },
    { value: 'anytime', label: 'Any time' },
  ];

  readonly payments: { value: PaymentMethod; label: string; hint: string }[] = [
    { value: 'cash', label: 'Cash', hint: 'Pay on pick-up or upon delivery' },
    { value: 'gcash', label: 'GCash', hint: 'We send payment details after confirming' },
    { value: 'bank', label: 'Bank transfer', hint: 'We send account details after confirming' },
    { value: 'term', label: 'Term / charge account', hint: 'For approved accounts only' },
  ];

  readonly form = this.fb.nonNullable.group({
    customer: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      mobile: ['', [Validators.required, Validators.pattern(PH_MOBILE)]],
      email: ['', [Validators.email]],
      company: [''],
    }),
    fulfillment: this.fb.nonNullable.control<Fulfillment>(this.price.mode() === 'term' ? 'delivery' : 'pickup'),
    preferredDate: ['', Validators.required],
    preferredTime: ['morning', Validators.required],
    delivery: this.fb.nonNullable.group({
      street: ['', Validators.required],
      barangay: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      landmark: [''],
      receiverName: [''],
      receiverMobile: ['', Validators.pattern(PH_MOBILE)],
      truckAccess: this.fb.nonNullable.control<'any' | 'small-only' | 'unsure'>('unsure'),
    }),
    paymentMethod: this.fb.nonNullable.control<PaymentMethod>('cash', Validators.required),
    notes: ['', Validators.maxLength(500)],
    agree: [false, Validators.requiredTrue],
  });

  constructor() {
    this.applyFulfillment(this.form.controls.fulfillment.value);
    this.form.controls.fulfillment.valueChanges
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((f) => this.applyFulfillment(f));

    // Keep the form in step if the Pick-up / Delivery switch in the header is used.
    effect(() => {
      const f: Fulfillment = this.price.mode() === 'term' ? 'delivery' : 'pickup';
      if (this.form.controls.fulfillment.value !== f) this.form.controls.fulfillment.setValue(f);
    });
  }

  get isDelivery() {
    return this.form.controls.fulfillment.value === 'delivery';
  }

  /** Delivery uses term prices and needs an address; pick-up uses cash prices. */
  private applyFulfillment(f: Fulfillment) {
    this.price.set(f === 'delivery' ? 'term' : 'cash');
    const d = this.form.controls.delivery;
    if (f === 'delivery') d.enable({ emitEvent: false });
    else d.disable({ emitEvent: false });
  }

  showError(c: AbstractControl | null): boolean {
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  submit() {
    this.error.set('');
    if (this.form.invalid || this.cart.itemCount() === 0) {
      this.form.markAllAsTouched();
      queueMicrotask(() =>
        this.host.nativeElement.querySelector('.ng-invalid:not(form):not(fieldset):not([formGroupName])')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      );
      return;
    }

    const v = this.form.getRawValue();
    const order: OrderRequest = {
      customer: { name: v.customer.name.trim(), mobile: v.customer.mobile.trim(), email: v.customer.email || undefined, company: v.customer.company || undefined },
      fulfillment: v.fulfillment,
      preferredDate: v.preferredDate,
      preferredTime: v.preferredTime,
      delivery: v.fulfillment === 'delivery' ? v.delivery : undefined,
      paymentMethod: v.paymentMethod,
      notes: v.notes || undefined,
      lines: this.cart.lines(),
      subtotal: this.cart.subtotal(),
    };

    this.sending.set(true);
    this.orders.submit(order).subscribe({
      next: (result) => {
        this.cart.clear();
        this.router.navigate(['/order', result.orderNumber], { state: { result } });
      },
      error: () => {
        this.sending.set(false);
        this.error.set(`We couldn't send your order. Check your connection and try again, or call us at ${this.store.phone}.`);
      },
    });
  }
}
