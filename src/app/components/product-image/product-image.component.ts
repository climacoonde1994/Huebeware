import { Component, computed, input, linkedSignal } from '@angular/core';
import { CategoryIconComponent } from '../category-icon/category-icon.component';

/**
 * Product photo with graceful fallbacks: your own photo (`src`) → the original photo (`fallback`)
 * → the category icon, moving to the next one whenever a photo is missing or fails to load.
 */
@Component({
  selector: 'app-product-image',
  imports: [CategoryIconComponent],
  template: `
    @if (current(); as url) {
      <img [src]="url" [alt]="alt()" loading="lazy" decoding="async" referrerpolicy="no-referrer" (error)="next()" />
    } @else {
      <div class="ph" role="img" [attr.aria-label]="alt()"><app-category-icon [name]="icon()" /></div>
    }
  `,
  styles: `
    :host { display: block; aspect-ratio: 1 / 1; background: var(--white); overflow: hidden; }
    img { width: 100%; height: 100%; object-fit: contain; display: block; padding: 8%; }
    .ph { width: 100%; height: 100%; display: grid; place-items: center; background: var(--navy-50); color: var(--navy); }
    .ph app-category-icon { width: 42%; height: 42%; opacity: .55; }
  `,
})
export class ProductImageComponent {
  readonly src = input<string | undefined>();
  readonly fallback = input<string | undefined>();
  readonly alt = input('');
  readonly icon = input('box');

  private readonly candidates = computed(() => [...new Set([this.src(), this.fallback()].filter((u): u is string => !!u))]);
  /** Index of the photo being tried; resets whenever the inputs change. */
  private readonly attempt = linkedSignal({ source: this.candidates, computation: () => 0 });
  readonly current = computed(() => this.candidates()[this.attempt()]);

  next() {
    this.attempt.update((i) => i + 1);
  }
}
