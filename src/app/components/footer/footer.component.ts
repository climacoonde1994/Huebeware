import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STORE_INFO } from '../../data/store-info';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="container inner">
        <div>
          <strong>{{ store.name }}</strong>
          <span>{{ store.tagline }}</span>
        </div>
        <nav>
          <a routerLink="/" fragment="categories">Categories</a>
          <a routerLink="/" fragment="catalog">All Products</a>
          <a routerLink="/order">Order Now</a>
          <a routerLink="/" fragment="contact">Contact</a>
        </nav>
        <small>© {{ year }} {{ store.name }}. All rights reserved.</small>
      </div>
    </footer>
  `,
  styles: `
    footer { background: var(--navy-900); color: var(--on-navy-muted); border-top: 4px solid var(--orange); padding: 32px 0; font-size: 14px; }
    .inner { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
    strong { font-family: var(--font-display); font-size: 22px; color: var(--white); text-transform: uppercase; margin-right: 10px; }
    nav { display: flex; gap: 20px; a { text-decoration: none; &:hover { color: var(--accent); } } }
  `,
})
export class FooterComponent {
  readonly store = STORE_INFO;
  readonly year = new Date().getFullYear();
}
