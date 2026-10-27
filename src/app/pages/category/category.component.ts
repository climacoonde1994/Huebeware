import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CATEGORIES, CATEGORY_BY_ID, coverFallback, coverImage } from '../../data/products';
import { STORE_INFO } from '../../data/store-info';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductImageComponent } from '../../components/product-image/product-image.component';

/** /category/:id — all products in one category as photo cards. */
@Component({
  selector: 'app-category-page',
  imports: [RouterLink, ProductCardComponent, ProductImageComponent],
  template: `
    @if (category(); as c) {
      <section class="page-head">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb"><a routerLink="/">Home</a> / <a routerLink="/" fragment="categories">Categories</a> / <span>{{ c.name }}</span></nav>
          <span class="eyebrow">{{ c.group }}</span>
          <h1>{{ c.name }}</h1>
          <p>{{ c.about }}</p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <p class="count">{{ c.products.length }} items</p>
          <div class="grid">
            @for (p of c.products; track p.id) {
              <app-product-card [product]="p" [category]="c" />
            }
          </div>
          <h2 class="more-title">More categories</h2>
          <div class="more">
            @for (o of others(); track o.id) {
              <a [routerLink]="['/category', o.id]">
                <app-product-image [src]="cover(o)" [fallback]="coverFallback(o)" [alt]="o.name" [icon]="o.icon" />
                <span>{{ o.name }}</span>
              </a>
            }
          </div>
        </div>
      </section>
    } @else {
      <section class="section"><div class="container">
        <h1>Category not found</h1>
        <p><a routerLink="/" fragment="categories">See all categories →</a></p>
      </div></section>
    }
  `,
  styles: `
    .page-head { background: var(--navy); color: var(--white); padding: 40px 0 44px; border-bottom: 5px solid var(--orange);
      h1 { font-size: clamp(38px, 6vw, 60px); }
      p { color: var(--on-navy-muted); max-width: 680px; margin: 12px 0 0; }
      .eyebrow { color: var(--orange); }
    }
    .crumbs { font-size: 13px; color: var(--on-navy-muted); margin-bottom: 18px; a { text-decoration: none; &:hover { color: var(--orange); } } span { color: var(--white); } }
    .section { padding-top: 32px; }
    .count { color: var(--muted); font-size: 14px; margin: 0 0 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .more-title { font-size: 28px; margin: 56px 0 16px; }
    .more { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px;
      a { display: block; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; text-decoration: none;
        span { display: block; padding: 10px 12px; font-weight: 600; font-size: 14px; }
        &:hover { border-color: var(--orange); span { color: var(--orange-ink); } } }
    }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr 1fr; gap: 10px; } }
  `,
})
export class CategoryPageComponent {
  readonly id = input.required<string>();
  private readonly title = inject(Title);
  readonly category = computed(() => {
    const c = CATEGORY_BY_ID.get(this.id());
    this.title.setTitle(c ? `${c.name} | ${STORE_INFO.name}` : STORE_INFO.name);
    return c;
  });
  readonly others = computed(() => CATEGORIES.filter((c) => c.id !== this.id()));
  readonly cover = coverImage;
  readonly coverFallback = coverFallback;
}
