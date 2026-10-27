import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { STORE_INFO } from '../../data/store-info';
import { CatalogStateService } from '../../core/catalog-state.service';
import { PriceModeService } from '../../core/price-mode.service';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly store = STORE_INFO;
  readonly catalog = inject(CatalogStateService);
  readonly price = inject(PriceModeService);
  readonly cart = inject(CartService);
  private readonly router = inject(Router);
  readonly menuOpen = signal(false);

  /** Search filters the price list on the home page and the product picker on the order page. */
  onSearch(value: string) {
    this.catalog.search(value);
    const path = this.router.url.split(/[?#]/)[0];
    if (path === '/order') return;
    if (path === '/' || path === '') this.catalog.scrollToCatalog();
    else this.router.navigateByUrl('/order');
  }
}
