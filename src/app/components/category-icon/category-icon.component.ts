import { Component, input } from '@angular/core';

/** Simple line icons per product category (swap for real product photos later). */
@Component({
  selector: 'app-category-icon',
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name()) {
        @case ('purlin') { <path d="M10 10h20v6H16v16h14v6H10z"/><path d="M30 10l8 4v24l-8 4"/> }
        @case ('bar') { <path d="M6 18l36-6M6 26l36-6M6 34l36-6"/><circle cx="6" cy="18" r="1.5"/><circle cx="6" cy="26" r="1.5"/><circle cx="6" cy="34" r="1.5"/> }
        @case ('flat') { <rect x="6" y="14" width="36" height="6" rx="1"/><rect x="6" y="24" width="36" height="6" rx="1"/><rect x="6" y="34" width="36" height="4" rx="1"/> }
        @case ('angle') { <path d="M12 8v30h28"/><path d="M18 8v24h22"/><path d="M12 8h6M40 32v6"/> }
        @case ('beam') { <path d="M10 8h28M10 40h28M24 8v32"/><path d="M10 8v4h28V8M10 40v-4h28v4"/> }
        @case ('pipe') { <ellipse cx="10" cy="24" rx="4" ry="9"/><path d="M10 15h28M10 33h28"/><ellipse cx="38" cy="24" rx="4" ry="9"/> }
        @case ('fitting') { <path d="M8 18h14a8 8 0 0 1 8 8v14"/><path d="M8 30h8a2 2 0 0 1 2 2v8"/><path d="M8 14v20M26 40h8"/> }
        @case ('board') { <path d="M8 12l20-4 12 4-20 4z"/><path d="M8 12v22l12 4V16"/><path d="M40 12v22l-20 4"/> }
        @case ('frame') { <path d="M8 10h32M8 38h32M12 10v28M24 10v28M36 10v28"/> }
        @case ('nail') { <path d="M14 8h20"/><path d="M24 8v28l-3 4h6l-3-4"/><path d="M18 14h12"/> }
        @case ('wire') { <circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="8"/><path d="M38 24c4 0 4 8 0 10"/> }
        @case ('cement') { <path d="M12 12h24l3 26H9z"/><path d="M12 12l2-4h20l2 4"/><path d="M16 22h16M16 28h16"/> }
        @case ('tile') { <rect x="8" y="8" width="14" height="14" rx="1"/><rect x="26" y="8" width="14" height="14" rx="1"/><rect x="8" y="26" width="14" height="14" rx="1"/><rect x="26" y="26" width="14" height="14" rx="1"/> }
        @case ('roof') { <path d="M4 24 24 8l20 16"/><path d="M10 20v18h28V20"/><path d="M14 16l-4 3M20 12l-6 5M28 12l6 5"/> }
        @case ('ceiling') { <path d="M6 10h36"/><path d="M8 16h32M8 22h32M8 28h32"/><path d="M16 28v10M32 28v10"/><circle cx="24" cy="36" r="3"/> }
        @case ('paint') { <rect x="8" y="8" width="26" height="12" rx="2"/><path d="M34 14h6v10H22v6"/><rect x="19" y="30" width="6" height="12" rx="1"/> }
        @case ('bolt') { <path d="M26 4 10 28h12l-2 16 16-24H24z"/> }
        @case ('box') { <path d="M8 16 24 8l16 8v18l-16 8-16-8z"/><path d="M8 16l16 8 16-8M24 24v18"/> }
        @default { <rect x="10" y="10" width="28" height="28" rx="4"/> }
      }
    </svg>
  `,
  styles: `:host { display: inline-block; width: 40px; height: 40px; } svg { width: 100%; height: 100%; }`,
})
export class CategoryIconComponent {
  readonly name = input.required<string>();
}
