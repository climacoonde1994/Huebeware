import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category, Product } from '../../data/products';
import { PriceModeService } from '../../core/price-mode.service';
import { CartService } from '../../core/cart.service';
import { ProductImageComponent } from '../product-image/product-image.component';

/** Product tile: the photo and name open the product page; the button adds it to the order. */
@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink, ProductImageComponent],
  template: `
    <a class="photo" [routerLink]="['/product', product().slug]" [attr.aria-label]="'View ' + product().name + ' ' + (product().size ?? '')">
      <app-product-image [src]="product().image" [fallback]="product().imageFallback" [alt]="product().name" [icon]="category().icon" />
      @if (product().brand) { <span class="brand">{{ product().brand }}</span> }
    </a>
    <div class="body">
      <a class="name" [routerLink]="['/product', product().slug]">{{ product().name }}</a>
      <span class="size">{{ product().size ?? '&nbsp;' }}</span>
      <div class="foot">
        @if (product().priceOnRequest) {
          <span class="price ask">Ask for price</span>
          <a class="btn-add ghost" [routerLink]="['/product', product().slug]">Details</a>
        } @else {
          <span class="price">₱{{ price.priceOf(product()) | number: '1.2-2' }}<small>/{{ product().unit ?? 'pc' }}</small></span>
          <button type="button" class="btn-add" [class.in]="cart.qtyOf(product().id)" (click)="cart.add(product().id)"
                  [attr.aria-label]="'Add ' + product().name + ' ' + (product().size ?? '') + ' to order'">
            {{ cart.qtyOf(product().id) ? '✓ ' + cart.qtyOf(product().id) : 'Add' }}
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex; flex-direction: column; background: var(--white); border: 1px solid var(--line);
      border-radius: var(--radius); overflow: hidden; transition: box-shadow .15s, transform .15s, border-color .15s;
    }
    :host:hover { box-shadow: var(--shadow); transform: translateY(-2px); border-color: #c9d2e0; }
    .photo { position: relative; display: block; border-bottom: 1px solid var(--line); }
    .brand {
      position: absolute; left: 10px; top: 10px; font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
      background: var(--navy); color: var(--white); padding: 3px 8px; border-radius: 4px;
    }
    .body { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px 14px; flex: 1; }
    .name { font-weight: 600; font-size: 14.5px; line-height: 1.3; text-decoration: none; color: var(--ink);
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
      &:hover { color: var(--orange-ink); } }
    .size { font-size: 13px; color: var(--muted); }
    .foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: auto; padding-top: 10px; }
    .price { font-weight: 700; font-size: 16px; color: var(--navy); font-variant-numeric: tabular-nums; white-space: nowrap;
      small { font-weight: 500; font-size: 12px; color: var(--muted); } }
    .price.ask { font-size: 14px; color: var(--orange-ink); }
    .btn-add {
      border: 1.5px solid var(--navy); background: var(--white); color: var(--navy); border-radius: 7px;
      padding: 5px 12px; font-size: 13px; font-weight: 700; white-space: nowrap; text-decoration: none;
      &:hover { background: var(--navy); color: var(--white); }
      &.in { background: var(--orange); border-color: var(--orange); color: var(--white); }
      &.ghost { border-color: var(--line); color: var(--ink-2); }
    }
    @media (max-width: 560px) {
      .body { padding: 10px; }
      .name { font-size: 13.5px; }
      .price { font-size: 14.5px; }
      .foot { flex-wrap: wrap; }
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly category = input.required<Category>();
  readonly price = inject(PriceModeService);
  readonly cart = inject(CartService);
}
