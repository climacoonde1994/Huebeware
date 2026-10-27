import { Injectable, computed, signal } from '@angular/core';
import { CATEGORIES, Category } from '../data/products';

/** Holds the catalog search text and selected category, shared by header and catalog. */
@Injectable({ providedIn: 'root' })
export class CatalogStateService {
  readonly categories = CATEGORIES;
  readonly query = signal('');
  readonly selectedId = signal<string>('all');

  readonly filtered = computed<Category[]>(() => {
    const q = this.query().trim().toLowerCase();
    const id = this.selectedId();
    return this.categories
      .filter((c) => id === 'all' || c.id === id)
      .map((c) => ({
        ...c,
        products: q
          ? c.products.filter((p) => `${c.name} ${p.name} ${p.size ?? ''}`.toLowerCase().includes(q))
          : c.products,
      }))
      .filter((c) => c.products.length > 0);
  });

  readonly resultCount = computed(() => this.filtered().reduce((n, c) => n + c.products.length, 0));

  selectCategory(id: string) {
    this.selectedId.set(id);
    this.scrollToCatalog();
  }

  search(q: string) {
    this.query.set(q);
    if (q) this.selectedId.set('all');
  }

  scrollToCatalog() {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}
