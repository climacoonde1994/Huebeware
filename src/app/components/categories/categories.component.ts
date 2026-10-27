import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogStateService } from '../../core/catalog-state.service';
import { ProductImageComponent } from '../product-image/product-image.component';
import { coverFallback, coverImage, startingPrice } from '../../data/products';

/** Category tiles with a product photo; each opens its own category page. */
@Component({
  selector: 'app-categories',
  imports: [DecimalPipe, RouterLink, ProductImageComponent],
  template: `
    <section class="section" id="categories">
      <div class="container">
        <span class="eyebrow">Shop by category</span>
        <h2 class="section-title">Everything to build or renovate your home</h2>
        <div class="grid">
          @for (c of catalog.categories; track c.id) {
            <a class="card" [routerLink]="['/category', c.id]">
              <app-product-image [src]="cover(c)" [fallback]="coverFallback(c)" [alt]="c.name" [icon]="c.icon" />
              <div class="body">
                <span class="group">{{ c.group }}</span>
                <h3>{{ c.name }}</h3>
                <p>{{ c.description }}</p>
                <span class="from">From <strong>₱{{ startingPrice(c) | number: '1.2-2' }}</strong> · {{ c.products.length }} items</span>
                <span class="go">Shop {{ c.name }} →</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 32px; }
    .card {
      display: flex; flex-direction: column; text-decoration: none; color: var(--ink);
      background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden;
      transition: border-color .15s, transform .15s, box-shadow .15s;
      app-product-image { aspect-ratio: 16 / 10; border-bottom: 4px solid var(--navy); transition: border-color .15s; }
      &:hover { border-color: #c9d2e0; transform: translateY(-2px); box-shadow: var(--shadow);
        app-product-image { border-bottom-color: var(--orange); } .go { color: var(--orange-ink); } }
    }
    .body { display: flex; flex-direction: column; padding: 16px 18px 18px; flex: 1; }
    .group { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--orange-ink); }
    h3 { font-size: 26px; margin: 4px 0 8px; color: var(--navy); }
    p { margin: 0 0 14px; color: var(--muted); font-size: 14px; flex: 1; }
    .from { font-size: 13px; color: var(--steel); strong { color: var(--navy); font-size: 15px; } }
    .go { margin-top: 10px; font-weight: 700; font-size: 14px; color: var(--navy); }
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr 1fr; gap: 10px; }
      .body { padding: 10px 12px 12px; }
      h3 { font-size: 19px; }
      p, .go { display: none; }
      .from { margin-top: 4px; font-size: 12px; strong { font-size: 13px; } }
    }
  `,
})
export class CategoriesComponent {
  readonly catalog = inject(CatalogStateService);
  readonly startingPrice = startingPrice;
  readonly cover = coverImage;
  readonly coverFallback = coverFallback;
}
