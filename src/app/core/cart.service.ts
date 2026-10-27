import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { PRODUCT_INDEX } from '../data/products';
import { PriceModeService } from './price-mode.service';
import { OrderLine } from './order.models';

const STORAGE_KEY = 'northhue.cart.v1';
export const MAX_QTY = 99999;

/** Items the customer has selected. Quantities are kept per product id. */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly price = inject(PriceModeService);
  private readonly quantities = signal<Record<string, number>>(this.load());

  /** Order lines priced by the current mode (pick-up = cash, delivery = term). */
  readonly lines = computed<OrderLine[]>(() =>
    Object.entries(this.quantities())
      .map(([id, quantity]): OrderLine | null => {
        const entry = PRODUCT_INDEX.get(id);
        if (!entry) return null;
        const unitPrice = this.price.priceOf(entry.product);
        return {
          productId: id,
          name: entry.product.name,
          size: entry.product.size,
          unit: entry.product.unit ?? 'pc',
          quantity,
          unitPrice,
          lineTotal: round2(unitPrice * quantity),
        };
      })
      .filter((l): l is OrderLine => l !== null),
  );

  readonly itemCount = computed(() => this.lines().length);
  readonly subtotal = computed(() => round2(this.lines().reduce((s, l) => s + l.lineTotal, 0)));

  constructor() {
    effect(() => this.save(this.quantities()));
  }

  qtyOf(id: string): number {
    return this.quantities()[id] ?? 0;
  }

  add(id: string, qty = 1) {
    this.setQty(id, this.qtyOf(id) + qty);
  }

  setQty(id: string, qty: number) {
    const q = Math.min(MAX_QTY, Math.max(0, Math.floor(Number(qty) || 0)));
    this.quantities.update((m) => {
      const next = { ...m };
      if (q === 0) delete next[id];
      else next[id] = q;
      return next;
    });
  }

  remove(id: string) {
    this.setQty(id, 0);
  }

  clear() {
    this.quantities.set({});
  }

  private load(): Record<string, number> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private save(value: Record<string, number>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* storage unavailable — cart still works for this visit */
    }
  }
}

export const round2 = (n: number) => Math.round(n * 100) / 100;
