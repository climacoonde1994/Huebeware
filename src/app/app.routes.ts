import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent), title: 'NorthHue Hardware | Materials to Build & Renovate Your Home' },
  { path: 'category/:id', loadComponent: () => import('./pages/category/category.component').then((m) => m.CategoryPageComponent), title: 'NorthHue Hardware' },
  { path: 'product/:slug', loadComponent: () => import('./pages/product/product.component').then((m) => m.ProductPageComponent), title: 'NorthHue Hardware' },
  { path: 'order', loadComponent: () => import('./pages/order/order.component').then((m) => m.OrderComponent), title: 'Create an order | NorthHue Hardware' },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent), title: 'Checkout | NorthHue Hardware' },
  { path: 'order/:orderNumber', loadComponent: () => import('./pages/confirmation/confirmation.component').then((m) => m.ConfirmationComponent), title: 'Order sent | NorthHue Hardware' },
  { path: '**', redirectTo: '' },
];
