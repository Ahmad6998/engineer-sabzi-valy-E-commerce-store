# Engineer Sabzi Valy — Online E-Commerce Store

Modern e-commerce platform for **Engineer Sabzi Valy**, inspired by [FruitSabzi.pk](https://fruitsabzi.pk/) with a focus on fresh vegetable & fruit delivery, 100% digital weighing accuracy, transparent daily Mandi auction rates, and 1-click WhatsApp order confirmation.

---

## 🌟 Key Features

1. **Brand Identity & Aesthetic**:
   - Inspired by FruitSabzi.pk's vibrant fresh green theme (`#16a34a`, `#83d026`), clean card layouts, and crisp Pakistani vegetable photography.
   - Dual Urdu & English nomenclature for every produce item (e.g. *Potato (Aloo / آلو)*, *Desi Onion (Pyaz / پیاز)*).

2. **Daily Mandi Rates Board & Live Ticker**:
   - Live ticker bar displaying today's Mandi wholesale auction rates vs typical local retail prices.
   - Transparent pricing comparison modal showing customer savings per kilogram.

3. **Smart Weight & Pack Selector**:
   - Multi-weight options per product (e.g. 500g, 1 kg, 2.5 kg, 5 kg Bachat Bags).
   - Dynamic instant price calculations based on selected weight.

4. **Slide-Out Cart Drawer**:
   - Free shipping progress meter (Free shipping on orders above Rs. 1,499).
   - Real-time quantity adjustment (`+` / `-`).
   - Voucher promo code engine (`ENGINEER10` for 10% off, `FREEDEL` for free shipping, `MANDI50` for Rs. 50 flat).

5. **Dual Checkout System**:
   - **One-Click WhatsApp Order**: Formats all basket items, weights, and total into a clean WhatsApp message link directed to the store manager.
   - **Standard Checkout Modal**: Collects name, Pakistani phone (+92), area/sector, delivery timeslot (Morning, Afternoon, Evening, Express), payment method (Cash on Delivery, JazzCash, EasyPaisa, Bank Transfer), and special packing instructions.

6. **Order Confirmation & Printable Receipt**:
   - Displays unique Order ID (`ESV-XXXXXX`), customer dispatch info, item summary, and instant "Send Receipt to WhatsApp" button.

7. **Trust & Transparency Pillars**:
   - 100% Certified Digital Scales (No manual weights or wet-soil cheating).
   - 4:00 AM Dawn Mandi Procurement.
   - Triple-stage washing and grading.
   - Doorstep replacement guarantee.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` or the address displayed in the terminal.

### 2. Build for Production
```bash
npm run build
```
Production output is located in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure
```
/home/ahmad/mac/
├── index.html                   # HTML entry point with Poppins & Arabic fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite build config
├── tailwind.config.js           # Tailwind theme configuration
├── postcss.config.js            # PostCSS configuration
├── dist/                        # Compiled production build
└── src/
    ├── main.jsx                 # React DOM mount
    ├── App.jsx                  # Main application orchestrator
    ├── index.css                # Tailwind directives & styles
    ├── context/
    │   └── CartContext.jsx      # Cart state, calculations, coupons, localStorage
    ├── data/
    │   ├── products.js          # Catalog of vegetables, fruits, bundles & dry fruits
    │   ├── mandiRates.js        # Daily Mandi wholesale rates & comparison table
    │   └── areas.js             # Delivery sectors in Lahore & Karachi
    └── components/
        ├── TopAnnouncement.jsx  # Announcement bar & location selector
        ├── Navbar.jsx           # Logo, search, Mandi rates button, cart trigger
        ├── HeroBanner.jsx       # Carousel banner with value propositions
        ├── MandiRateTicker.jsx  # Live Mandi rates ticker & comparison modal
        ├── CategoryPills.jsx    # Scrollable category selector
        ├── ProductGrid.jsx      # Filtered product grid with search & sorting
        ├── ProductCard.jsx      # Item card with weight picker & cart controls
        ├── ProductModal.jsx     # Detailed view modal with nutrition & tips
        ├── CartDrawer.jsx       # Slide-in basket drawer with free delivery meter
        ├── CheckoutModal.jsx    # Complete address, time slot & payment modal
        ├── OrderSuccessModal.jsx# Receipt display with WhatsApp confirm button
        ├── TrustPillars.jsx     # 4 Core Pillars of Engineer Sabzi Valy
        ├── CustomerReviews.jsx  # Real customer reviews & FAQ accordion
        ├── Footer.jsx           # Brand info, branches, payment partners
        └── FloatingActions.jsx  # Sticky WhatsApp button & mobile bottom bar
```

