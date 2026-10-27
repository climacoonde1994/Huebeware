import { Component, input } from '@angular/core';

/** 1 Select items → 2 Details & delivery → 3 Order sent */
@Component({
  selector: 'app-order-steps',
  template: `
    <ol>
      @for (s of steps; track s; let i = $index) {
        <li [class.done]="i + 1 < current()" [class.current]="i + 1 === current()">
          <span class="n">{{ i + 1 < current() ? '✓' : i + 1 }}</span>{{ s }}
        </li>
      }
    </ol>
  `,
  styles: `
    ol { list-style: none; margin: 0; padding: 0; display: flex; gap: 8px; flex-wrap: wrap; }
    li { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; color: #8ea0bb; }
    li:not(:last-child)::after { content: ''; width: 28px; height: 2px; background: rgba(255,255,255,.18); margin-left: 4px; }
    .n { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; border: 1.5px solid currentColor; }
    li.current { color: var(--white); .n { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); } }
    li.done { color: var(--on-navy-muted); .n { background: rgba(255,255,255,.12); border-color: transparent; } }
    @media (max-width: 520px) { li:not(.current) { font-size: 0; gap: 0; } li:not(.current) .n { font-size: 12px; } li:not(:last-child)::after { width: 14px; } }
  `,
})
export class OrderStepsComponent {
  readonly current = input(1);
  readonly steps = ['Select items', 'Details & delivery', 'Order sent'];
}
