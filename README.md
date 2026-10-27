# NorthHue Hardware Web (Angular frontend)

Landing page, category and product pages, and ordering for NorthHue Hardware (materials to build & renovate a house).

## Run it
```bash
npm install
npm start          # opens at http://localhost:4200
npm run build      # production build -> dist/huebeware-web
```
Requires Node.js 18.19+ (Node 20 or 22 recommended).

## Pages
- `/` — landing page with categories and the price list (Add buttons put items in the order)
- `/order` — create an order: search/filter products, set quantities, choose pick-up or delivery
- `/checkout` — contact details, pick-up or delivery (address, date, truck access), payment, Send order
- `/order/:orderNumber` — confirmation with order number and next steps

Pick-up uses cash prices; delivery uses term prices. The delivery fee is confirmed by the store.

## Sending orders
`src/app/core/order.service.ts` posts to `POST {API_BASE_URL}/orders`.
While `API_BASE_URL` in `src/app/core/api.config.ts` is empty, a mock saves orders in the browser so the
whole flow works without a backend. Request/response shapes are in `src/app/core/order.models.ts`.

Matching C# records for the ASP.NET Core API:
```csharp
public record OrderLine(string ProductId, string Name, string? Size, string Unit, decimal Quantity, decimal UnitPrice, decimal LineTotal);
public record Customer(string Name, string Mobile, string? Email, string? Company);
public record DeliveryDetails(string Street, string Barangay, string City, string Province, string? Landmark,
                              string? ReceiverName, string? ReceiverMobile, string TruckAccess);
public record OrderRequest(Customer Customer, string Fulfillment, string PreferredDate, string PreferredTime,
                           DeliveryDetails? Delivery, string PaymentMethod, string? Notes, List<OrderLine> Lines, decimal Subtotal);
public record OrderResult(string OrderNumber, string Status, DateTime CreatedAt, OrderRequest Order);
```
Always recompute prices on the server from your product table; don't trust prices sent by the browser.

## Where things live
- `src/app/data/store-info.ts` — store name, phone, email, address, hours
- `src/app/data/products.ts` — categories and prices (cash / term). Later this comes from the ASP.NET Core API.
- `src/app/core/` — price mode, catalog search, cart, order service and models
- `src/app/pages/` — home, order, checkout, confirmation
- `src/app/components/` — header, hero, categories, catalog (price list), contact, footer
- `src/styles.scss` — colors and fonts (CSS variables)

## Product photos

1. Open `public/images/IMAGE-FILENAMES.md` — it lists the exact file name for every product, grouped by category folder.
2. Save each photo into `public/images/products/<category>/` with that name (`.jpg`, `.jpeg`, `.png` or `.webp`).
   Optional category cover photos go in `public/images/categories/<category>.jpg`.
3. Run `npm run images` (it also runs automatically on `npm start` and `npm run build`).

Products without a photo of your own keep their current photo, or the category icon if they have none.
If you rename or resize a product in `products.ts`, its file name changes too — re-run `npm run images` and check the list.

## Browser icon

The tab icon, home-screen icon and app badge live in `public/` (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icons/`)
and are wired up in `src/index.html` and `public/site.webmanifest`.
