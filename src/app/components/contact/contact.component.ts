import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { STORE_INFO } from '../../data/store-info';

@Component({
  selector: 'app-contact',
  template: `
    <section class="section" id="contact">
      <div class="container">
        <div class="perks">
          @for (p of perks; track p.title) {
            <div class="perk">
              <span class="num">{{ $index + 1 | number: '2.0' }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
            </div>
          }
        </div>

        <div class="cta">
          <div>
            <span class="eyebrow">Get a quote</span>
            <h2 class="section-title">Send us your material list</h2>
            <p>Message or call us with your bill of materials. We'll reply with a quote and delivery schedule.</p>
          </div>
          <ul class="contact-list">
            <li><span>Phone</span><a [href]="'tel:' + store.phone">{{ store.phone }}</a></li>
            <li><span>Email</span><a [href]="'mailto:' + store.email">{{ store.email }}</a></li>
            <li><span>Visit</span>{{ store.address }}</li>
            <li><span>Hours</span>{{ store.hours }}</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  imports: [DecimalPipe],
  styles: `
    .perks { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 56px; }
    .perk { padding: 22px; border-top: 3px solid var(--orange); background: var(--white); border-radius: 0 0 var(--radius) var(--radius); }
    .num { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--white); background: var(--orange); padding: 2px 8px; border-radius: 4px; }
    .perk h3 { font-size: 24px; margin: 14px 0 6px; }
    .perk p { margin: 0; color: var(--muted); font-size: 14px; }
    .cta {
      display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center;
      background: var(--ink); color: var(--white); border-radius: 16px; padding: 44px;
      .eyebrow { color: var(--accent); }
      p { color: var(--on-navy-muted); margin: 14px 0 0; max-width: 460px; }
    }
    .contact-list { list-style: none; margin: 0; padding: 0;
      li { display: grid; grid-template-columns: 80px 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.1); font-size: 15px; }
      li:last-child { border-bottom: 0; }
      span { color: #8ea0bb; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; font-weight: 700; padding-top: 2px; }
      a { text-decoration: none; font-weight: 600; &:hover { color: var(--accent); } }
    }
    @media (max-width: 800px) { .cta { grid-template-columns: 1fr; padding: 28px; } }
  `,
})
export class ContactComponent {
  readonly store = STORE_INFO;
  readonly perks = [
    { title: 'Cash or term', text: 'Pick-up prices for walk-in buyers, term pricing for accounts and deliveries.' },
    { title: 'Delivery', text: 'We deliver to your site — ask for schedules and rates in your area.' },
    { title: 'Bulk orders', text: 'Contractor and project quantities welcome. Ask about volume pricing.' },
    { title: 'Trusted brands', text: 'Neltex, Atlanta, SCG, Hardieflex, Knauf, Boral and more.' },
  ];
}
