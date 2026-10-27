import { Component, computed, inject, input, signal, effect } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PRODUCT_BY_SLUG } from '../../data/products';
import { STORE_INFO } from '../../data/store-info';
import { PriceModeService } from '../../core/price-mode.service';
import { CartService } from '../../core/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductImageComponent } from '../../components/product-image/product-image.component';
import { QtyStepperComponent } from '../../components/qty-stepper/qty-stepper.component';

/** /product/:slug — one product with a large photo, price, quantity and related items. */
@Component({
  selector: 'app-product-page',
  imports: [DecimalPipe, RouterLink, ProductCardComponent, ProductImageComponent, QtyStepperComponent],
  template: `
    @if (entry(); as e) {
      <section class="section">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a routerLink="/">Home</a> / <a [routerLink]="['/category', e.category.id]">{{ e.category.name }}</a> / <span>{{ e.product.name }}</span>
          </nav>
          <div class="detail">
            <div class="media">
              <app-product-image [src]="e.product.image" [fallback]="e.product.imageFallback" [alt]="e.product.name" [icon]="e.category.icon" />
            </div>
            <div class="info">
              @if (e.product.brand) { <span class="brand">{{ e.product.brand }}</span> }
              <h1>{{ e.product.name }}</h1>
              @if (e.product.size) { <p class="size">{{ e.product.size }}</p> }

              @if (e.product.priceOnRequest) {
                <div class="price-box ask">
                  <strong>Ask for price</strong>
                  <span>Call or message us for today's price and available colors.</span>
                </div>
                <div class="actions">
                  <a class="btn btn-primary" [href]="'tel:' + store.phone">Call {{ store.phone }}</a>
                  <a class="btn btn-outline" [href]="'mailto:' + store.email + '?subject=Price inquiry: ' + e.product.name">Email us</a>
                </div>
              } @else {
                <div class="price-box">
                  <strong>₱{{ price.priceOf(e.product) | number: '1.2-2' }}</strong><span>per {{ e.product.unit ?? 'pc' }} · {{ price.label() }}</span>
                </div>
                <div class="actions">
                  <app-qty-stepper [value]="qty()" [label]="e.product.name" (qtyChange)="qty.set(clamp($event))" />
                  <button type="button" class="btn btn-primary" (click)="add(e.product.id)">
                    {{ cart.qtyOf(e.product.id) ? 'Add more to order' : 'Add to order' }}
                  </button>
                </div>
                @if (cart.qtyOf(e.product.id)) {
                  <p class="in-cart">{{ cart.qtyOf(e.product.id) }} {{ e.product.unit ?? 'pc' }} in your order · <a routerLink="/order">Review order →</a></p>
                }
              }
              @if (e.product.note) { <p class="note">{{ e.product.note }}</p> }

              <dl class="specs">
                <div><dt>Category</dt><dd><a [routerLink]="['/category', e.category.id]">{{ e.category.name }}</a></dd></div>
                @if (e.product.brand) { <div><dt>Brand</dt><dd>{{ e.product.brand }}</dd></div> }
                @if (e.product.size) { <div><dt>Size</dt><dd>{{ e.product.size }}</dd></div> }
                <div><dt>Sold per</dt><dd>{{ e.product.unit ?? 'pc' }}</dd></div>
              </dl>
              <p class="about">{{ e.category.about }}</p>
              <p class="disclaimer">Prices may change without notice. Pick-up and delivery available — delivery fee confirmed by the store.</p>
            </div>
          </div>

          @if (related().length) {
            <h2 class="rel-title">More in {{ e.category.name }}</h2>
            <div class="grid">
              @for (p of related(); track p.id) {
                <app-product-card [product]="p" [category]="e.category" />
              }
            </div>
          }
        </div>
      </section>
    } @else {
      <section class="section"><div class="container">
        <h1>Product not found</h1>
        <p><a routerLink="/" fragment="categories">Browse categories →</a></p>
      </div></section>
    }
  `,
  styles: `
    .section { padding-top: 28px; }
    .crumbs { font-size: 13px; color: var(--muted); margin-bottom: 20px; a { text-decoration: none; &:hover { color: var(--orange-ink); } } span { color: var(--ink); } }
    .detail { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 44px; align-items: start; }
    .media { background: var(--white); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; position: sticky; top: 130px; }
    .brand { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--navy); color: var(--white); padding: 4px 9px; border-radius: 4px; }
    h1 { font-size: clamp(32px, 4.4vw, 48px); margin-top: 12px; }
    .size { font-size: 17px; color: var(--steel); margin: 8px 0 0; }
    .price-box { margin: 22px 0 18px; padding: 16px 18px; background: var(--white); border: 1px solid var(--line); border-left: 5px solid var(--orange); border-radius: 10px;
      display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
      strong { font-size: 32px; color: var(--navy); font-variant-numeric: tabular-nums; }
      span { color: var(--muted); font-size: 14px; }
      &.ask { flex-direction: column; gap: 4px; strong { font-size: 24px; color: var(--orange-ink); } }
    }
    .actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; app-qty-stepper { height: 46px; } }
    .in-cart { font-size: 14px; color: var(--steel); a { color: var(--orange-ink); font-weight: 600; } }
    .note { font-size: 14px; background: var(--orange-50); padding: 10px 12px; border-radius: 8px; }
    .specs { margin: 26px 0 0; border-top: 1px solid var(--line);
      div { display: grid; grid-template-columns: 120px 1fr; padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 14.5px; }
      dt { color: var(--muted); } dd { margin: 0; font-weight: 600; a { color: var(--navy); } } }
    .about { color: var(--ink-2); margin: 20px 0 0; }
    .disclaimer { font-size: 12.5px; color: var(--muted); }
    .rel-title { font-size: 30px; margin: 56px 0 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    @media (max-width: 800px) {
      .detail { grid-template-columns: 1fr; gap: 20px; }
      .media { position: static; max-width: 420px; }
    }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr 1fr; gap: 10px; } }
  `,
})
export class ProductPageComponent {
  readonly slug = input.required<string>();
  readonly store = STORE_INFO;
  readonly price = inject(PriceModeService);
  readonly cart = inject(CartService);
  private readonly title = inject(Title);
  readonly qty = signal(1);

  readonly entry = computed(() => PRODUCT_BY_SLUG.get(this.slug()));
  readonly related = computed(() => {
    const e = this.entry();
    return e ? e.category.products.filter((p) => p.id !== e.product.id).slice(0, 8) : [];
  });

  constructor() {
    effect(() => {
      const e = this.entry();
      this.title.setTitle(e ? `${e.product.name}${e.product.size ? ' ' + e.product.size : ''} | ${STORE_INFO.name}` : STORE_INFO.name);
      this.qty.set(1);
    });
  }

  clamp(n: number) { return Math.max(1, Math.min(99999, Math.floor(n) || 1)); }

  add(id: string) { this.cart.add(id, this.qty()); }
}
