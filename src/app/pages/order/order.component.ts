import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogStateService } from '../../core/catalog-state.service';
import { PriceModeService } from '../../core/price-mode.service';
import { CartService } from '../../core/cart.service';
import { QtyStepperComponent } from '../../components/qty-stepper/qty-stepper.component';
import { OrderStepsComponent } from '../../components/order-steps/order-steps.component';
import { CategoryIconComponent } from '../../components/category-icon/category-icon.component';

/** Step 1: customer picks products and quantities. */
@Component({
  selector: 'app-order',
  imports: [DecimalPipe, RouterLink, QtyStepperComponent, OrderStepsComponent, CategoryIconComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  readonly catalog = inject(CatalogStateService);
  readonly price = inject(PriceModeService);
  readonly cart = inject(CartService);
}
