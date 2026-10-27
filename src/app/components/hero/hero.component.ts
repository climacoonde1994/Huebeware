import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIES, Product } from '../../data/products';
import { PriceModeService } from '../../core/price-mode.service';
import { ProductImageComponent } from '../product-image/product-image.component';

interface Featured { category: string; product: Product; }

const pick = (catId: string, index: number): Featured => {
  const c = CATEGORIES.find((x) => x.id === catId)!;
  return { category: c.name, product: c.products[index] };
};

@Component({
  selector: 'app-hero',
  imports: [DecimalPipe, RouterLink, ProductImageComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly price = inject(PriceModeService);
  readonly totalItems = CATEGORIES.reduce((n, c) => n + c.products.length, 0);
  readonly totalCategories = CATEGORIES.length;

  readonly featured: Featured[] = [
    pick('cement', 0),
    pick('paints', 0),
    pick('boards', 6),
    pick('electrical', 9),
    pick('plumbing', 0),
  ];
}
