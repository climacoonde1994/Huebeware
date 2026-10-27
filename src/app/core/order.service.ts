import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { OrderRequest, OrderResult } from './order.models';
import { STORE_INFO } from '../data/store-info';

const SAVED_KEY = 'northhue.orders.v1';

const peso = (n: number) => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Cash', gcash: 'GCash', bank: 'Bank transfer', term: 'Term / charge account',
};

/**
 * Sends orders to the store.
 * - No backend (API_BASE_URL empty): the order is emailed to STORE_INFO.orderEmail
 *   using FormSubmit (https://formsubmit.co) — free, no account needed.
 * - Backend set: POST to `${API_BASE_URL}/orders` instead.
 * A copy is also kept in the customer's browser so the confirmation page can show it.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  submit(order: OrderRequest): Observable<OrderResult> {
    if (API_BASE_URL) {
      return this.http.post<OrderResult>(`${API_BASE_URL}/orders`, order);
    }
    const result: OrderResult = {
      orderNumber: newOrderNumber(),
      status: 'received',
      createdAt: new Date().toISOString(),
      order,
    };
    return this.emailOrder(result).pipe(
      map(() => result),
      tap(() => this.save(result)),
    );
  }

  get(orderNumber: string): Observable<OrderResult | undefined> {
    if (API_BASE_URL) {
      return this.http.get<OrderResult>(`${API_BASE_URL}/orders/${encodeURIComponent(orderNumber)}`);
    }
    return of(this.readSaved().find((o) => o.orderNumber === orderNumber));
  }

  /** Emails the order to the store via FormSubmit's AJAX endpoint. */
  private emailOrder(r: OrderResult): Observable<unknown> {
    const o = r.order;
    const isDelivery = o.fulfillment === 'delivery';
    const d = o.delivery;
    const items = o.lines
      .map((l) => `${l.quantity} ${l.unit} × ${l.name}${l.size ? ' ' + l.size : ''} @ ${peso(l.unitPrice)} = ${peso(l.lineTotal)}`)
      .join('\n');

    const body: Record<string, string> = {
      _subject: `New order ${r.orderNumber} — ${o.customer.name} (${isDelivery ? 'Delivery' : 'Pick-up'}, ${peso(o.subtotal)})`,
      _template: 'table',
      _captcha: 'false',
      'Order number': r.orderNumber,
      'Ordered on': new Date(r.createdAt).toLocaleString('en-PH'),
      Customer: o.customer.name,
      Mobile: o.customer.mobile,
      Email: o.customer.email ?? '—',
      Company: o.customer.company ?? '—',
      'Pick-up or delivery': isDelivery ? 'Delivery (term price)' : 'Pick-up (cash price)',
      'Preferred date': `${o.preferredDate} (${o.preferredTime})`,
      Payment: PAYMENT_LABELS[o.paymentMethod] ?? o.paymentMethod,
      Items: items,
      Subtotal: peso(o.subtotal),
      Notes: o.notes ?? '—',
    };
    if (isDelivery && d) {
      body['Delivery address'] = [d.street, d.barangay, d.city, d.province].filter(Boolean).join(', ');
      body['Landmark'] = d.landmark || '—';
      body['Receiver'] = [d.receiverName, d.receiverMobile].filter(Boolean).join(' · ') || 'Same as customer';
      body['Truck access'] = d.truckAccess;
    }
    if (o.customer.email) body['_replyto'] = o.customer.email;

    const url = `https://formsubmit.co/ajax/${encodeURIComponent(STORE_INFO.orderEmail)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' });
    return this.http.post<{ success: string | boolean; message?: string }>(url, body, { headers }).pipe(
      tap((res) => {
        if (String(res?.success) !== 'true') throw new Error(res?.message || 'Order email was not sent');
      }),
    );
  }

  private readSaved(): OrderResult[] {
    try {
      return JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]');
    } catch {
      return this.memory;
    }
  }

  private memory: OrderResult[] = [];

  private save(result: OrderResult) {
    this.memory = [result, ...this.memory];
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([result, ...this.readSaved()].slice(0, 50)));
    } catch {
      /* keep in memory only */
    }
  }
}

/** e.g. NH-261024-4821 */
function newOrderNumber(): string {
  const d = new Date();
  const ymd = `${d.getFullYear() % 100}`.padStart(2, '0') + `${d.getMonth() + 1}`.padStart(2, '0') + `${d.getDate()}`.padStart(2, '0');
  return `NH-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}
