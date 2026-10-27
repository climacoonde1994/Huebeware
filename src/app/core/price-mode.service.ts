import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../data/products';

export type PriceMode = 'cash' | 'term';

/** Shared switch between Cash / Pick-up and Term / Delivery prices. */
@Injectable({ providedIn: 'root' })
export class PriceModeService {
  readonly mode = signal<PriceMode>('cash');
  readonly label = computed(() => (this.mode() === 'cash' ? 'Cash / Pick-up' : 'Term / Delivery'));

  set(mode: PriceMode) {
    this.mode.set(mode);
  }

  priceOf(p: Product): number {
    return this.mode() === 'term' ? (p.term ?? p.cash) : p.cash;
  }
}
