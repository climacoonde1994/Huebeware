// NorthHue Hardware catalog — materials to build or renovate a house (no industrial steel yet).
// Prices and photos are taken from cebuhomebuilders.com (checked Oct 26, 2026) unless a product
// has `source: 'store'`, which means it comes from our own price list (PRICES.xlsx).
// Your own photos: put them in public/images/products/<category-id>/ — see public/images/IMAGE-FILENAMES.md.
// Later this will come from the ASP.NET Core API — keep the same shape so swapping is easy.
// Prices are in PHP. `cash` = Cash / Pick-up, `term` = Term / Delivery (falls back to cash if absent).

import { CATEGORY_COVERS, LOCAL_IMAGES } from './product-images.generated';

export interface Product {
  id: string; // assigned automatically below; later this is the database ProductId
  slug: string; // assigned automatically below; used in /product/:slug
  name: string;
  brand?: string;
  size?: string;
  unit?: string;
  cash: number;
  term?: number;
  /** Product photo URL. Without one, the category icon is shown. */
  image?: string;
  /** Used if `image` (your own photo) fails to load — the original photo. Set automatically. */
  imageFallback?: string;
  /** No confirmed price yet — shown as "Ask for price" and cannot be added to an order. */
  priceOnRequest?: boolean;
  note?: string;
  source?: 'cebuhomebuilders' | 'store';
}

export type CategoryGroup = 'Structure' | 'Roof & Ceiling' | 'Finishing' | 'Utilities';

export interface Category {
  id: string;
  name: string;
  group: CategoryGroup;
  icon: string; // key into the icon set in category-icon.component
  description: string;
  /** Longer text shown on the category page and product pages. */
  about: string;
  products: Product[];
}

type ProductInput = Omit<Product, 'id' | 'slug'>;
interface CategoryInput extends Omit<Category, 'products'> {
  products: ProductInput[];
}

const U = 'https://cebuhomebuilders.com/wp-content/uploads/';

const CATEGORY_DATA: CategoryInput[] = [
  {
    id: 'cement',
    name: 'Cement',
    group: 'Structure',
    icon: 'cement',
    description: 'Portland and pozzolan cement for footings, slabs, walls and plastering.',
    about:
      'Portland cement is the all-round choice for columns, beams and slabs. Pozzolan (blended) cement sets a little slower and is popular for masonry, plastering and general house work.',
    products: [
      { name: 'Apo Portland Cement', brand: 'Apo', size: '40 kg', unit: 'bag', cash: 265, image: U + '2020/02/apo-portland-cement.png' },
      { name: 'Mabuhay Pozzolan Cement', brand: 'Mabuhay', size: '40 kg', unit: 'bag', cash: 207.5 },
    ],
  },
  {
    id: 'tile-adhesive-grout',
    name: 'Tile Adhesive & Grout',
    group: 'Finishing',
    icon: 'tile',
    description: 'Tile adhesives for floors and walls, plus colored tile grout.',
    about:
      'Use regular tile adhesive for standard floor and wall tiles, and heavy-duty adhesive for large-format or heavy tiles. Finish the joints with a grout color that matches your tiles.',
    products: [
      { name: 'ABC Tile Adhesive Regular Grey', brand: 'ABC', size: '25 kg', unit: 'bag', cash: 323.75, image: U + '2020/02/abc-tile-regular-300x300.png' },
      { name: 'ABC Tile Adhesive Regular Grey', brand: 'ABC', size: '5 kg', unit: 'bag', cash: 109.5, image: U + '2020/02/abc-tile-adhesive-regular-5kgs-300x300.jpg' },
      { name: 'Davco Tile Adhesive Regular', brand: 'Davco', size: '25 kg', unit: 'bag', cash: 497, image: U + '2020/02/davco-tile-regular-300x300.png' },
      { name: 'Novtek Tile Regular', brand: 'Novtek', size: '25 kg', unit: 'bag', cash: 281.25, image: U + '2021/11/novtek-tile-regular-300x300.jpg' },
      { name: 'Stik Dikit Tile Adhesive', brand: 'Stik Dikit', size: '25 kg', unit: 'bag', cash: 262.5, image: U + '2005271.jpg' },
      { name: 'ABC Tile Grout F1 Beige', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 96.25, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout F11 Terracotta', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 96.25, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout F12 Black', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 151.5, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout F14 Grey', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 87.5, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout F15 White', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 87.5, image: U + '2002128.jpg' },
      { name: 'ABC Tile Grout F16 Cream', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 96.25, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout F20 Dark Brown', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 151.5, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout P25 Burgundy', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 151.5, image: U + '2020/02/abc-tile-grout-300x300.png' },
      { name: 'ABC Tile Grout P8 Sorrento Blue', brand: 'ABC', size: '2 kg', unit: 'pack', cash: 151.5, image: U + '2020/02/abc-tile-grout-300x300.png' },
    ],
  },
  {
    id: 'roofing',
    name: 'Roofing & Gutters',
    group: 'Roof & Ceiling',
    icon: 'roof',
    description: 'PVC gutters and fittings, plus purlins for roof framing.',
    about:
      'Everything to carry rainwater off the roof — gutters, downspouts, outlets and hangers — plus C-purlins and hat-type purlins for the roof frame. Ask us about color roofing sheets cut to your length.',
    products: [
      { name: 'Mr. Gutter PVC Gutter', brand: 'Mr. Gutter', size: '105 × 85 × 2900mm', unit: 'pc', cash: 695, image: U + '1043580.webp' },
      { name: 'Mr. Gutter PVC Downspout', brand: 'Mr. Gutter', size: '63 × 86 × 2900mm', unit: 'pc', cash: 695, image: U + '1043581.webp' },
      { name: 'Mr. Gutter Downspout Clip', brand: 'Mr. Gutter', unit: 'pc', cash: 30, image: U + '1043589.webp' },
      { name: 'Mr. Gutter Downspout Connector', brand: 'Mr. Gutter', unit: 'pc', cash: 60, image: U + '1043588.webp' },
      { name: 'Mr. Gutter Drop Outlet', brand: 'Mr. Gutter', unit: 'pc', cash: 230, image: U + '1043587.webp' },
      { name: 'Mr. Gutter Elbow 90°', brand: 'Mr. Gutter', unit: 'pc', cash: 55, image: U + '1043592.webp' },
      { name: 'Mr. Gutter End Cap', brand: 'Mr. Gutter', unit: 'pc', cash: 80 },
      { name: 'Mr. Gutter Flashing', brand: 'Mr. Gutter', unit: 'pc', cash: 435, image: U + '1043594.webp' },
      { name: 'Mr. Gutter Hanger Double Hole', brand: 'Mr. Gutter', unit: 'pc', cash: 35, image: U + '1043591.webp' },
      { name: 'C-Purlin', size: '1.2mm × 2" × 3" × 6m', unit: 'pc', cash: 280, term: 285, source: 'store' },
      { name: 'C-Purlin', size: '1.2mm × 2" × 4" × 6m', unit: 'pc', cash: 325, term: 330, source: 'store' },
      { name: 'C-Purlin', size: '1.5mm × 2" × 4" × 6m', unit: 'pc', cash: 480, term: 490, source: 'store' },
      { name: 'Hat-Type Purlin (Blue)', size: '0.6mm × 6m', unit: 'pc', cash: 275, term: 285, source: 'store' },
      { name: 'Hat-Type Purlin (Gray)', size: '0.8mm × 6m', unit: 'pc', cash: 380, term: 390, source: 'store' },
    ],
  },
  {
    id: 'pvc-ceiling',
    name: 'PVC Ceiling & Framing',
    group: 'Roof & Ceiling',
    icon: 'ceiling',
    description: 'PVC ceiling panels and the metal furring, channels and clips to hang them.',
    about:
      'PVC ceiling panels are water-resistant, termite-proof and need no painting — a favorite for kitchens, bathrooms and eaves. Hang them on a GI metal frame of carrying channels, furring and clips.',
    products: [
      { name: 'ADCO PVC Ceiling Panel CBV05', brand: 'ADCO', size: '8 × 250 × 2900mm', unit: 'pc', cash: 0, priceOnRequest: true },
      { name: 'ADCO PVC Ceiling Panel CBV06', brand: 'ADCO', size: '8 × 250 × 2900mm', unit: 'pc', cash: 0, priceOnRequest: true },
      { name: 'ADCO PVC Ceiling Panel CBV12', brand: 'ADCO', size: '8 × 250 × 2900mm', unit: 'pc', cash: 0, priceOnRequest: true },
      { name: 'ADCO PVC Ceiling Panel CBV20', brand: 'ADCO', size: '8 × 250 × 2900mm', unit: 'pc', cash: 0, priceOnRequest: true },
      { name: 'GI Metal Carrying Channel', size: '12 × 38mm × 5m, GA22 0.8mm', unit: 'pc', cash: 152, image: U + '2020/02/metal-carrying-channel-300x300.png' },
      { name: 'GI Metal C-Channel', size: '12 × 38mm × 5m, GA22 0.7mm', unit: 'pc', cash: 154.75, image: U + '2020/02/metal-carrying-channel-300x300.png' },
      { name: 'GI Metal C-Channel', size: '12 × 38mm × 5m, GA20 1.0mm', unit: 'pc', cash: 186, image: U + '2020/02/metal-carrying-channel-300x300.png' },
      { name: 'GI Metal C-Channel', size: '12 × 38mm × 5m, GA15 1.5mm', unit: 'pc', cash: 333.25, image: U + '2020/02/metal-carrying-channel-300x300.png' },
      { name: 'GI Metal J-Furring', size: '19 × 50mm × 5m, GA26 0.4mm', unit: 'pc', cash: 132, image: U + '2020/02/gi-metal-j-furring-300x300.png' },
      { name: 'GI Metal S-Furring', size: '19 × 25mm × 5m, GA24 0.6mm', unit: 'pc', cash: 146.75, image: U + '2020/02/gi-metal-s-furring-300x300.png' },
      { name: 'GI Metal Stud', size: '0.5 × 35 × 64mm × 2.44m', unit: 'pc', cash: 100, image: U + '2020/02/gi-metal-studs-300x300.png' },
      { name: 'GI Furring W-Clip (Single)', unit: 'pc', cash: 5, image: U + '2020/02/gi-metal-furring-clip-single-300x300.png' },
      { name: 'GI Furring W-Clip (Double)', unit: 'pc', cash: 5, image: U + '2020/02/gi-metal-furring-clip-double-300x300.png' },
    ],
  },
  {
    id: 'boards',
    name: 'Boards & Drywall',
    group: 'Structure',
    icon: 'board',
    description: 'Gypsum and fiber-cement (Hardiflex) boards for walls and ceilings.',
    about:
      'Gypsum boards give smooth interior walls and ceilings. Fiber-cement boards like Hardiflex resist moisture and termites, so they also work for eaves, wet areas and exterior walls.',
    products: [
      { name: 'Boral Gypsum Board Standard', brand: 'Boral', size: '9mm × 4 × 8 ft', unit: 'sheet', cash: 365, image: U + '2020/02/boral-gypsum-board-300x300.png' },
      { name: 'Boral Gypsum Board Standard', brand: 'Boral', size: '12mm × 4 × 8 ft', unit: 'sheet', cash: 409, image: U + '2020/02/boral-gypsum-board-300x300.png' },
      { name: 'Boral Gypsum Board Standard', brand: 'Boral', size: '16mm × 4 × 8 ft', unit: 'sheet', cash: 698, image: U + '2020/02/boral-gypsum-board-300x300.png' },
      { name: 'ADCO Gypsum Board', brand: 'ADCO', size: '9 × 1220 × 2440mm', unit: 'sheet', cash: 430, image: U + '2023/07/1044612.jpg' },
      { name: 'ADCO Gypsum Board', brand: 'ADCO', size: '12 × 1220 × 2440mm', unit: 'sheet', cash: 575, image: U + '2023/07/1044613.jpg' },
      { name: 'Hardiflex Board Lite', brand: 'Hardiflex', size: '3.5mm × 4 × 8 ft', unit: 'sheet', cash: 549.5, image: U + '2020/02/hardieflex-board.-300x300.png' },
      { name: 'Hardiflex Board', brand: 'Hardiflex', size: '6mm × 4 × 8 ft', unit: 'sheet', cash: 937.75, image: U + '2020/02/hardieflex-board.-300x300.png' },
      { name: 'Hardiflex Board', brand: 'Hardiflex', size: '9mm × 4 × 8 ft', unit: 'sheet', cash: 1488.25, image: U + '2020/02/hardieflex-board.-300x300.png' },
      { name: 'Hardiflex Board', brand: 'Hardiflex', size: '12mm × 4 × 8 ft', unit: 'sheet', cash: 1980, image: U + '2020/02/hardieflex-board.-300x300.png' },
    ],
  },
  {
    id: 'nails',
    name: 'Nails',
    group: 'Structure',
    icon: 'nail',
    description: 'Common wire nails and finishing nails in every everyday length.',
    about:
      'Common wire nails are for framing, formwork and general carpentry. Finishing nails have a small head that hides easily under putty and paint — use them for trims and cabinets.',
    products: [
      { name: 'Common Wire Nails', size: '25mm (1")', unit: 'kg', cash: 67, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Common Wire Nails', size: '38mm (1-1/2")', unit: 'kg', cash: 64, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Common Wire Nails', size: '50mm (2")', unit: 'kg', cash: 63.5, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Common Wire Nails', size: '63mm (2-1/2")', unit: 'kg', cash: 60, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Common Wire Nails', size: '75mm (3")', unit: 'kg', cash: 49, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Common Wire Nails', size: '100mm (4")', unit: 'kg', cash: 56, image: U + '2020/02/common-wire-nails-300x300.png' },
      { name: 'Finishing Nails', size: '25mm (1")', unit: 'kg', cash: 70, image: U + '2020/02/finishing-nails-300x300.png' },
      { name: 'Finishing Nails', size: '38mm (1-1/2")', unit: 'kg', cash: 67, image: U + '2020/02/finishing-nails-300x300.png' },
      { name: 'Finishing Nails', size: '50mm (2")', unit: 'kg', cash: 64, image: U + '2020/02/finishing-nails-300x300.png' },
    ],
  },
  {
    id: 'paints',
    name: 'Paints & Supplies',
    group: 'Finishing',
    icon: 'paint',
    description: 'Latex paint, skimcoat, primers, wood finishes, brushes and rollers.',
    about:
      'Start with skimcoat to smooth concrete walls, prime, then finish with latex for walls and ceilings or polyurethane and wood stain for doors and cabinets. Grab rollers, trays and brushes while you are here.',
    products: [
      { name: 'Boysen 701 Permacoat Flat Latex White', brand: 'Boysen', size: '4 L', unit: 'gal', cash: 697.75, image: U + '2017596014.png' },
      { name: 'Boysen 715 Permacoat Semi-Gloss Latex White', brand: 'Boysen', size: '4 L', unit: 'gal', cash: 805, image: U + '2017598010.webp' },
      { name: 'Boysen 710 Permacoat Gloss Latex White', brand: 'Boysen', size: '4 L', unit: 'gal', cash: 805, image: U + '2017597005.png' },
      { name: 'Davies Megacryl Semi-Gloss Latex White', brand: 'Davies', size: '4 L', unit: 'gal', cash: 821.75, image: U + '2020/01/davies-megacryl-gloss-latex-white.jpg' },
      { name: 'Davies Megacryl Gloss Latex White', brand: 'Davies', size: '4 L', unit: 'gal', cash: 821.75, image: U + '2020/01/davies-megacryl-gloss-latex-white.jpg' },
      { name: 'Boysen 1715 Acrytex Topcoat Semi-Gloss', brand: 'Boysen', size: '4 L', unit: 'gal', cash: 1308.75, image: U + '2020/01/boysen-1715-acrytex-topcoat-semi-gloss-300x300.jpg' },
      { name: 'Boysen K201 HP Skimcoat', brand: 'Boysen', size: '4 L', unit: 'pail', cash: 362, image: U + '2020/01/boysen-k201-300x300.jpg' },
      { name: 'Boysen K201 HP Skimcoat', brand: 'Boysen', size: '16 L', unit: 'pail', cash: 1438.25, image: U + '2020/01/boysen-k201-300x300.jpg' },
      { name: 'Boysen Lacquer Primer Surfacer White', brand: 'Boysen', size: '1 L', unit: 'can', cash: 293.5, image: U + '2020/01/boysen-lacquer-primer-surfacer-300x300.jpg' },
      { name: 'Boysen Lacquer Primer Surfacer White', brand: 'Boysen', size: '4 L', unit: 'gal', cash: 1119.75, image: U + '2020/01/boysen-lacquer-primer-surfacer-300x300.jpg' },
      { name: 'Boysen Hudson PU Sealer', brand: 'Boysen', size: '1 L', unit: 'can', cash: 393, image: U + '2020/01/polyurethane-sealr-300x300.jpg' },
      { name: 'Boysen Hudson PU Topcoat', brand: 'Boysen', size: '1 L', unit: 'can', cash: 483.5, image: U + '2020/01/polyurethane-topcoa-300x300.jpg' },
      { name: 'Boysen Hudson PU Reducer', brand: 'Boysen', size: '1 L', unit: 'can', cash: 264.75, image: U + '2020/01/polyurethane-reducer-300x300.jpg' },
      { name: 'Boysen Oil Wood Stain Oak', brand: 'Boysen', unit: 'can', cash: 745.75, image: U + '2020/01/boysen-oil-300x300.jpg' },
      { name: 'Boysen Oil Wood Stain Mahogany', brand: 'Boysen', unit: 'can', cash: 739.5, image: U + '2020/01/boysen-oil-300x300.jpg' },
      { name: 'Boysen Oil Wood Stain Dark Oak', brand: 'Boysen', unit: 'can', cash: 757.5, image: U + '2020/01/boysen-oil-300x300.jpg' },
      { name: 'BRAD Paint Brush Wooden Handle', brand: 'BRAD', size: '2"', unit: 'pc', cash: 45, image: U + '2020/01/1030458-1-300x300.jpg' },
      { name: 'BRAD Paint Roller with Handle', brand: 'BRAD', size: '7"', unit: 'pc', cash: 85, image: U + '2020/01/1030439-1030440-diy-brad-paint-roller-w-handle-300x300.jpg' },
      { name: 'BRAD Paint Roller with Handle, Shrink Type', brand: 'BRAD', size: '7"', unit: 'pc', cash: 120, image: U + '2020/01/1030441diy-brad-paint-roller-w-hndle-shrnk-7in-1-300x300.jpg' },
      { name: 'BRAD Paint Roller Tray', brand: 'BRAD', size: '7"', unit: 'pc', cash: 95, image: U + '2020/01/1030446-1030447-diy-brad-paint-roller-tray-only-1-300x300.jpg' },
      { name: 'BRAD Paint Roller Tray', brand: 'BRAD', size: '9"', unit: 'pc', cash: 100, image: U + '2020/01/1030446-1030447-diy-brad-paint-roller-tray-only-300x300.jpg' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    group: 'Utilities',
    icon: 'bolt',
    description: 'Panel boards, circuit breakers, wire, and utility and junction boxes.',
    about:
      'The basics for wiring a house: a panel board with rail-type breakers for each circuit, duplex wire for outlets and lights, and PVC boxes for switches, outlets and junctions. Have a licensed electrician size your circuits.',
    products: [
      { name: 'Ever Panel Board for Rail-Type Breaker', brand: 'Ever', size: '6 holes', unit: 'pc', cash: 495, image: U + '2020/02/ever-panel-board-for-rail-type-breaker-300x300.png' },
      { name: 'Ever Panel Board for Rail-Type Breaker', brand: 'Ever', size: '8 holes', unit: 'pc', cash: 758.75, image: U + '2020/02/ever-panel-board-for-rail-type-breaker-300x300.png' },
      { name: 'Ever Panel Board for Rail-Type Breaker', brand: 'Ever', size: '10 holes', unit: 'pc', cash: 1106.25, image: U + '2020/02/ever-panel-board-for-rail-type-breaker-300x300.png' },
      { name: 'Ever Panel Board for Rail-Type Breaker', brand: 'Ever', size: '12 holes', unit: 'pc', cash: 1362.5, image: U + '2020/02/ever-panel-board-for-rail-type-breaker-300x300.png' },
      { name: 'Ever Circuit Breaker Rail-Type 2P', brand: 'Ever', size: '16A', unit: 'pc', cash: 250, image: U + '2020/02/ever-circuit-breaker-rail-type-300x300.png' },
      { name: 'Ever Circuit Breaker Rail-Type 2P', brand: 'Ever', size: '20A', unit: 'pc', cash: 250, image: U + '2020/02/ever-circuit-breaker-rail-type-300x300.png' },
      { name: 'Ever Circuit Breaker Rail-Type 2P', brand: 'Ever', size: '25A', unit: 'pc', cash: 250, image: U + '2020/02/ever-circuit-breaker-rail-type-300x300.png' },
      { name: 'Ever Circuit Breaker Rail-Type 2P', brand: 'Ever', size: '32A', unit: 'pc', cash: 250, image: U + '2020/02/ever-circuit-breaker-rail-type-300x300.png' },
      { name: 'Ever Circuit Breaker Rail-Type 2P', brand: 'Ever', size: '40A', unit: 'pc', cash: 280, image: U + '2020/02/ever-circuit-breaker-rail-type-300x300.png' },
      { name: 'Duplex Wire 12/2', size: '3.5mm²', unit: 'm', cash: 126.25, image: U + '2020/02/2017476001-duplex-wire-awg-122-3.5mm-300x300.png', note: 'Sold per meter; full rolls available — ask for the roll price.' },
      { name: 'Cool Era PVC Utility Box', brand: 'Cool Era', size: '2 × 4"', unit: 'pc', cash: 30, image: U + '1039518.webp' },
      { name: 'Cool Era PVC Junction Box', brand: 'Cool Era', size: '4 × 4"', unit: 'pc', cash: 35, image: U + '1048265.webp' },
      { name: 'Cable Coupler', unit: 'pc', cash: 13, image: U + '2020/02/2001909-cable-coupler-300x300.png' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    group: 'Utilities',
    icon: 'pipe',
    description: 'PVC and PPR water pipes, fittings, flexible hoses and valves.',
    about:
      'Blue PVC pipes and fittings for cold-water lines, PPR pipe for hot and cold water, and the hoses and valves to connect sinks, lavatories and toilets.',
    products: [
      { name: 'Emerald PVC Pipe Blue', brand: 'Emerald', size: '1/2" (20mm)', unit: 'length', cash: 92, image: U + '2020/01/pvc-pipe-blue.jpg' },
      { name: 'Cool PPR Hot & Cold Water Pipe PN20', brand: 'Cool', size: '3/4" (25mm)', unit: 'length', cash: 400, image: U + '2020/01/1020161-300x300.jpg' },
      { name: 'Cool Era Cap Blue', brand: 'Cool Era', size: '1/2" (20mm)', unit: 'pc', cash: 6, image: U + '1039483-1049285-1049286.webp' },
      { name: 'Cool Era Cap Blue', brand: 'Cool Era', size: '3/4" (25mm)', unit: 'pc', cash: 8, image: U + '1039483-1049285-1049286.webp' },
      { name: 'Cool Era Cap Blue', brand: 'Cool Era', size: '1" (32mm)', unit: 'pc', cash: 10, image: U + '1039483-1049285-1049286.webp' },
      { name: 'Cool Era Elbow Blue 90°', brand: 'Cool Era', size: '1/2" (20mm)', unit: 'pc', cash: 7, image: U + '1039476-1039477-1039478-1039479-1039480.webp' },
      { name: 'Cool Era Elbow Blue 90°', brand: 'Cool Era', size: '1" (32mm)', unit: 'pc', cash: 18, image: U + '1039476-1039477-1039478-1039479-1039480.webp' },
      { name: 'Cool Era Elbow Blue 90°', brand: 'Cool Era', size: '1-1/4" (40mm)', unit: 'pc', cash: 31, image: U + '1039476-1039477-1039478-1039479-1039480.webp' },
      { name: 'Cool Era Elbow Blue 90°', brand: 'Cool Era', size: '1-1/2" (50mm)', unit: 'pc', cash: 58, image: U + '1039476-1039477-1039478-1039479-1039480.webp' },
      { name: 'Cool Era Elbow Blue 45°', brand: 'Cool Era', size: '1/2" (20mm)', unit: 'pc', cash: 7, image: U + '1039473-1039474-1039475.webp' },
      { name: 'Cool Era Elbow Blue 45°', brand: 'Cool Era', size: '1" (32mm)', unit: 'pc', cash: 13, image: U + '1039473-1039474-1039475.webp' },
      { name: 'Cool Era Female Thread Elbow with Copper', brand: 'Cool Era', size: '20mm × 1/2"', unit: 'pc', cash: 36, image: U + '1039512-1039513-1039514.webp' },
      { name: 'Cool Flexible Hose Stainless (Lavatory)', brand: 'Cool', size: '1/2 × 1/2 × 20"', unit: 'pc', cash: 180, image: U + '2020/01/1018423-20-inch-300x300.jpg' },
      { name: 'Cool Flexible Hose Stainless', brand: 'Cool', size: '1/2 × 1/2 × 24"', unit: 'pc', cash: 220, image: U + '2020/01/1004730-300x300.jpg' },
      { name: 'Cool Check Valve', brand: 'Cool', size: '1/2"', unit: 'pc', cash: 250, image: U + '2020/01/1030856-300x300.jpg' },
    ],
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Categories with a stable id and URL slug on every product. */
export const CATEGORIES: Category[] = CATEGORY_DATA.map((c) => ({
  ...c,
  products: c.products.map((p, i) => {
    const id = `${c.id}-${i + 1}`;
    const local = LOCAL_IMAGES[id];
    return {
      ...p,
      source: p.source ?? 'cebuhomebuilders',
      id,
      slug: slugify(`${p.name} ${p.size ?? ''}`),
      // Your own photo wins; if it doesn't exist the current photo is kept.
      image: local ?? p.image,
      imageFallback: local ? p.image : undefined,
    };
  }),
}));

export const PRODUCT_INDEX = new Map(
  CATEGORIES.flatMap((c) => c.products.map((p) => [p.id, { product: p, category: c }] as const)),
);

export const PRODUCT_BY_SLUG = new Map(
  CATEGORIES.flatMap((c) => c.products.map((p) => [p.slug, { product: p, category: c }] as const)),
);

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c] as const));

const priced = (c: Category) => c.products.filter((p) => !p.priceOnRequest);

export const startingPrice = (c: Category) => Math.min(...priced(c).map((p) => p.cash));

/** A photo to represent the category: its own cover photo, else the first product that has one. */
export const coverImage = (c: Category) => CATEGORY_COVERS[c.id] ?? c.products.find((p) => p.image)?.image;

/** Backup for the cover if it fails to load. */
export const coverFallback = (c: Category) =>
  CATEGORY_COVERS[c.id] ? c.products.find((p) => p.image)?.image : c.products.find((p) => p.image)?.imageFallback;
