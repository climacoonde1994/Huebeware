import { Component, OnInit, inject, input, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../core/order.service';
import { OrderResult } from '../../core/order.models';
import { OrderStepsComponent } from '../../components/order-steps/order-steps.component';
import { STORE_INFO } from '../../data/store-info';

/** Step 3: order received — shows the order number and what happens next. */
@Component({
  selector: 'app-confirmation',
  imports: [DecimalPipe, DatePipe, RouterLink, OrderStepsComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  readonly orderNumber = input.required<string>();
  private readonly orders = inject(OrderService);
  private readonly router = inject(Router);
  readonly store = STORE_INFO;

  readonly result = signal<OrderResult | undefined>(undefined);
  readonly loading = signal(true);
  readonly copied = signal(false);

  readonly timeLabels: Record<string, string> = { morning: 'Morning (8 AM – 12 NN)', afternoon: 'Afternoon (1 PM – 5 PM)', anytime: 'Any time' };
  readonly payLabels: Record<string, string> = { cash: 'Cash', gcash: 'GCash', bank: 'Bank transfer', term: 'Term / charge account' };

  ngOnInit() {
    const fromNav = this.router.lastSuccessfulNavigation?.extras.state?.['result'] as OrderResult | undefined;
    if (fromNav?.orderNumber === this.orderNumber()) {
      this.result.set(fromNav);
      this.loading.set(false);
      return;
    }
    this.orders.get(this.orderNumber()).subscribe({
      next: (r) => { this.result.set(r); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  /** Plain-text copy of the order the customer can paste into Messenger, Viber or SMS. */
  async copySummary() {
    const r = this.result();
    if (!r) return;
    const o = r.order;
    const lines = o.lines.map((l) => `- ${l.quantity} x ${l.name}${l.size ? ' ' + l.size : ''} = P${l.lineTotal.toFixed(2)}`);
    const text = [
      `${this.store.name} order ${r.orderNumber}`,
      `${o.customer.name} · ${o.customer.mobile}`,
      o.fulfillment === 'delivery'
        ? `Delivery: ${o.delivery?.street}, ${o.delivery?.barangay}, ${o.delivery?.city}, ${o.delivery?.province}`
        : 'Pick-up at store',
      `Date: ${o.preferredDate} (${this.timeLabels[o.preferredTime] ?? o.preferredTime})`,
      ...lines,
      `Subtotal: P${o.subtotal.toFixed(2)}${o.fulfillment === 'delivery' ? ' + delivery fee' : ''}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    } catch {
      window.getSelection()?.selectAllChildren(document.querySelector('.receipt') as Node);
    }
  }
}
