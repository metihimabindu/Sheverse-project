# Design Guidelines: Women Entrepreneurs E-Commerce Platform

## Design Approach
**Reference-Based:** Drawing inspiration from Pinterest and Etsy's card-based layouts with a warm, professional aesthetic that empowers rather than stereotypes. Focus on trust, accessibility, and clean modern design.

## Color Palette

### Primary Colors
- **Muted Teal:** 173 25% 48% (Primary brand color - buttons, links, accents)
- **Terracotta:** 10 62% 58% (Secondary - CTAs, highlights)
- **Charcoal Gray:** 0 0% 18% (Text, headers)

### Supporting Colors
- **Warm Sand:** 38 46% 84% (Backgrounds, cards, sections)
- **Soft White:** 0 0% 98% (Main background)
- **Light Gray:** 0 0% 95% (Borders, dividers)

### Semantic Colors
- Success: 142 71% 45%
- Error: 0 72% 51%
- Warning: 38 92% 50%

## Typography

**Font Families:**
- Headings: 'Playfair Display' or 'Lora' (serif, elegant)
- Body: 'Inter' or 'Open Sans' (sans-serif, readable)

**Scale:**
- Hero Headline: text-5xl md:text-6xl, font-bold
- Page Titles: text-4xl, font-semibold
- Section Headers: text-2xl md:text-3xl, font-semibold
- Card Titles: text-lg, font-medium
- Body Text: text-base, leading-relaxed
- Small Text: text-sm

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Card padding: p-4 md:p-6
- Section spacing: py-12 md:py-20
- Container max-width: max-w-7xl
- Content max-width: max-w-6xl

**Grid System:**
- Product Cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature Sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Consistent gap: gap-6 md:gap-8

## Component Library

### Navigation
- Sticky header with shadow on scroll
- Logo left, navigation center, cart/wishlist/profile right
- Mobile: Hamburger menu with slide-in drawer
- Background: Soft White with subtle border-b

### Product Cards (Pinterest-Style)
- Rounded corners: rounded-xl
- Image: aspect-[3/4], object-cover with hover scale-105 transition
- Overlay wishlist heart (top-right, absolute)
- Card info: product title, seller name, price, star rating
- Hover state: shadow-xl, quick-view button appears
- Background: white with border border-gray-200

### Buttons
- Primary: Muted Teal background, white text, rounded-lg, px-6 py-3
- Secondary: Terracotta background, white text
- Outline: border-2 border-teal, teal text, backdrop-blur-sm when on images
- Icon buttons: rounded-full, p-2, hover:bg-gray-100

### Forms
- Input fields: border-gray-300, rounded-lg, focus:ring-2 focus:ring-teal
- Labels: text-sm font-medium text-charcoal
- Validation: red text for errors, green checkmark for success

### Hero Section
- Large inspirational image (empowering women entrepreneurs at work)
- Overlay: gradient from charcoal/50 to transparent
- Centered headline + subheading + CTA buttons
- Height: min-h-[600px] md:min-h-[700px]

### Product Detail
- Image gallery: main image + thumbnail strip below
- Two-column layout: images left, details right
- Trust badges: secure checkout, buyer protection icons
- Review section: star distribution graph + photo reviews grid

### Cart & Checkout
- Clean table layout with product thumbnails
- Sticky order summary on right (desktop)
- Progress indicator: Cart → Information → Payment → Confirmation
- Trust signals: SSL badge, payment method icons

### Filters (Shop Page)
- Sidebar on desktop (lg:block), drawer on mobile
- Categories with icons
- Price range slider (dual-thumb)
- Star rating checkboxes
- Clear all filters button

## Images

**Required Images:**
1. **Hero Image:** Professional photo of diverse women entrepreneurs collaborating or working (warm, authentic lighting)
2. **Product Images:** High-quality photos with white/neutral backgrounds, minimum 800x800px
3. **Seller Profile Photos:** Circular avatars, authentic portraits
4. **Testimonial Images:** Real customer photos, headshots
5. **Category Banners:** Lifestyle images for fashion, wellness, handmade goods, digital services sections
6. **About Page:** Mission-aligned imagery showing women in business settings

**Image Treatment:**
- Rounded corners: rounded-xl for cards, rounded-lg for general use
- Aspect ratios: 3:4 for products, 16:9 for banners, 1:1 for profiles
- Lazy loading for performance
- Alt text for all images (accessibility)

## Animations
**Minimal & Purposeful:**
- Card hover: scale(1.02), shadow increase (200ms ease)
- Button hover: slight background darken (150ms)
- Page transitions: fade-in for content (300ms)
- No auto-playing carousels or distracting effects

## Accessibility
- WCAG AA compliant color contrast (4.5:1 minimum)
- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons
- Focus indicators: ring-2 ring-offset-2 ring-teal
- Skip to content link
- Screen reader friendly product cards

## Mobile Considerations
- Touch-friendly targets: minimum 44x44px
- Bottom navigation bar option for key actions
- Swipeable product image galleries
- Sticky add-to-cart button on product pages
- Simplified filters in slide-up modal

## Trust & Credibility Elements
- Seller verification badges
- Review authenticity indicators (verified purchase)
- Secure payment icons in footer
- Money-back guarantee badge
- "As Seen In" media logos (if applicable)
- Live chat widget (bottom-right, Warm Sand bubble with Teal icon)