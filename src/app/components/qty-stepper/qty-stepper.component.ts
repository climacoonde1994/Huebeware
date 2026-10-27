import { Component, input, output } from '@angular/core';
import { MAX_QTY } from '../../core/cart.service';

/** − [qty] + control. Emits the new quantity; 0 means remove. */
@Component({
  selector: 'app-qty-stepper',
  template: `
    <button type="button" (click)="qtyChange.emit(value() - 1)" [attr.aria-label]="'Decrease ' + label()">−</button>
    <input type="number" inputmode="numeric" min="0" [max]="max" [value]="value()"
           [attr.aria-label]="'Quantity of ' + label()"
           (change)="onTyped($any($event.target))" />
    <button type="button" (click)="qtyChange.emit(value() + 1)" [attr.aria-label]="'Increase ' + label()">+</button>
  `,
  styles: `
    :host { display: inline-flex; align-items: stretch; border: 1.5px solid var(--line); border-radius: 8px; overflow: hidden; background: var(--white); height: 36px; }
    button { border: 0; background: var(--paper); width: 32px; font-size: 18px; line-height: 1; color: var(--ink); &:hover { background: var(--accent-soft); } }
    input { width: 52px; border: 0; text-align: center; font: inherit; font-weight: 600; font-variant-numeric: tabular-nums; -moz-appearance: textfield; outline: none;
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } }
    :host(:focus-within) { border-color: var(--ink); }
  `,
})
export class QtyStepperComponent {
  readonly value = input.required<number>();
  readonly label = input('item');
  readonly qtyChange = output<number>();
  readonly max = MAX_QTY;

  onTyped(el: HTMLInputElement) {
    const n = Math.floor(Number(el.value));
    const q = Number.isFinite(n) && n >= 1 ? Math.min(n, MAX_QTY) : 1;
    el.value = String(q);
    this.qtyChange.emit(q);
  }
}
