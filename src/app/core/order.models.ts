// Shapes sent to / returned from the API. Mirror these as C# records in the backend:
//   POST /api/orders   body: OrderRequest   -> 201 OrderResult

export type Fulfillment = 'pickup' | 'delivery';
export type PaymentMethod = 'cash' | 'gcash' | 'bank' | 'term';

export interface OrderLine {
  productId: string;
  name: string;
  size?: string;
  unit: string;
  quantity: number;
  unitPrice: number; // price shown to the customer when ordering (server re-checks)
  lineTotal: number;
}

export interface Customer {
  name: string;
  mobile: string;
  email?: string;
  company?: string;
}

export interface DeliveryDetails {
  street: string;
  barangay: string;
  city: string;
  province: string;
  landmark?: string;
  receiverName?: string;
  receiverMobile?: string;
  truckAccess: 'any' | 'small-only' | 'unsure';
}

export interface OrderRequest {
  customer: Customer;
  fulfillment: Fulfillment;
  preferredDate: string;        // yyyy-MM-dd
  preferredTime: string;        // e.g. 'morning'
  delivery?: DeliveryDetails;   // required when fulfillment = 'delivery'
  paymentMethod: PaymentMethod;
  notes?: string;
  lines: OrderLine[];
  subtotal: number;
}

export type OrderStatus = 'received' | 'confirmed' | 'ready' | 'out-for-delivery' | 'completed' | 'cancelled';

export interface OrderResult {
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO date
  order: OrderRequest;
}
