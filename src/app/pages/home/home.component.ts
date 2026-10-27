import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, CategoriesComponent, CatalogComponent, ContactComponent],
  template: `
    <app-hero />
    <app-categories />
    <app-catalog />
    <app-contact />
  `,
})
export class HomeComponent {}
