import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CatalogStateService } from '../../core/catalog-state.service';
import { PriceModeService } from '../../core/price-mode.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../core/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [DecimalPipe, ProductCardComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  readonly catalog = inject(CatalogStateService);
  readonly price = inject(PriceModeService);
  readonly cart = inject(CartService);
}
