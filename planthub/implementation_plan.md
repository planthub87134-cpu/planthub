# PlantHub — Full Professional E-Commerce Plant Shop

Transform the single-file React prototype into a production-grade, professionally structured e-commerce application with authentication, policy pages, contact/feedback forms, and a premium UI.

## Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | React 18 + Vite (deployed on **Vercel**) |
| **Styling** | Vanilla CSS with custom design system (no Tailwind) |
| **Routing** | `react-router` v7 (`createBrowserRouter`) |
| **Backend / DB** | **Supabase** (PostgreSQL + Auth + Realtime) |
| **Auth** | Supabase Auth — Email/Password, Google OAuth, Phone OTP |
| **Charts** | Recharts |

---

## User Review Required

> [!IMPORTANT]
> **Supabase credentials required.** You will need to create a Supabase project at [supabase.com/dashboard](https://supabase.com/dashboard) and provide:
> - `VITE_SUPABASE_URL` — your project URL
> - `VITE_SUPABASE_ANON_KEY` — your anon/public key
>
> These will go into a `.env` file (gitignored). The app will work without them in "demo mode" with mock data, but real auth and database features require live credentials.

> [!WARNING]
> **OAuth & Phone Auth setup required on Supabase Dashboard:**
> - **Google Sign-In**: You must create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/) and configure them in Supabase → Authentication → Providers → Google.
> - **Phone Auth**: Requires an SMS provider (Twilio/MessageBird/Vonage) configured in Supabase → Authentication → Providers → Phone.
> - **Email Auth**: Enabled by default in Supabase.

---

## Open Questions

> [!IMPORTANT]
> 1. **Project Name**: I'll name the project **`planthub`** (folder: `planthub/`). Is this acceptable, or do you prefer a different name?
> 2. **Supabase project**: Have you already created a Supabase project, or should I set up the app to work in demo/mock mode first and you'll add credentials later?
> 3. **Role-based access**: In the prototype, Manager and Admin are separate roles. Should sign-up only create "customer" accounts, with Manager/Admin roles assigned manually in Supabase? (Recommended for security)

---

## Proposed Changes

### Project Initialization

#### [NEW] Project scaffolding via Vite

```
planthub/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                    # Static assets (images, icons)
│   ├── components/                # Reusable UI components
│   │   ├── common/                # Button, Input, Modal, Card, Badge, Spinner
│   │   └── layout/                # Navbar, MegaFooter, PageLayout
│   ├── context/                   # React contexts
│   │   └── AuthContext.jsx        # Auth state provider
│   ├── features/                  # Feature modules
│   │   ├── auth/                  # Login, Signup, AuthCallback
│   │   ├── shop/                  # Product listing, Product detail
│   │   ├── cart/                  # Cart, Checkout
│   │   ├── orders/                # Order history, Order tracking
│   │   ├── profile/               # User profile management
│   │   ├── admin/                 # Admin dashboard, analytics, inventory
│   │   └── manager/               # Manager dashboard, order management
│   ├── hooks/                     # Custom hooks (useAuth, useCart, useOrders)
│   ├── lib/                       # Third-party configs
│   │   └── supabase.js            # Supabase client init
│   ├── pages/                     # Route-level page components
│   │   ├── LandingPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── FeedbackPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManagerDashboard.jsx
│   │   └── policies/
│   │       ├── PrivacyPolicy.jsx
│   │       ├── ReturnPolicy.jsx
│   │       ├── CookiePolicy.jsx
│   │       └── TermsAndConditions.jsx
│   ├── router/                    # Routing configuration
│   │   └── index.jsx              # createBrowserRouter setup
│   ├── styles/                    # Global styles & design system
│   │   ├── index.css              # CSS reset + design tokens + utilities
│   │   ├── components.css         # Component-specific styles
│   │   ├── pages.css              # Page-specific styles
│   │   └── animations.css         # Micro-animations & transitions
│   ├── utils/                     # Helper functions
│   │   ├── formatters.js          # Currency, date formatters
│   │   └── constants.js           # App constants, product data
│   ├── App.jsx                    # Root component with RouterProvider
│   └── main.jsx                   # Entry point
├── .env.example                   # Template for environment variables
├── .gitignore
├── index.html
├── package.json
├── vercel.json                    # Vercel SPA rewrite config
└── vite.config.js
```

---

### Design System & Styles

#### [NEW] `src/styles/index.css`
- CSS custom properties (design tokens): colors, spacing, typography, shadows, border-radius
- CSS reset (modern normalize)
- Dark-mode-ready color palette with emerald/green primary, neutral grays
- Premium typography using Google Fonts (Inter + Outfit)
- Utility classes for common patterns

#### [NEW] `src/styles/components.css`
- Styles for: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-ghost`
- `.card`, `.card-hover`, `.card-glass` (glassmorphism)
- `.input`, `.input-group`, `.form-field`
- `.modal`, `.modal-overlay`
- `.badge`, `.badge-success`, `.badge-warning`, `.badge-danger`
- `.table`, `.table-row`
- `.spinner`, `.skeleton`

#### [NEW] `src/styles/pages.css`
- Page-specific layout styles for landing, shop, dashboard, policy pages

#### [NEW] `src/styles/animations.css`
- `@keyframes` for fadeIn, slideUp, slideDown, pulse, shimmer
- Hover effects, transition utilities
- Scroll-reveal animations

---

### Layout Components

#### [NEW] `src/components/layout/Navbar.jsx`
- Sticky responsive navigation bar
- Logo + navigation links (Shop, About, Contact)
- Auth-aware: shows Login/Signup when logged out, profile dropdown when logged in
- Cart icon with item count badge
- Role-based menu items (Admin link for admins, Manager link for managers)
- Mobile hamburger menu
- Glassmorphism/blur effect on scroll

#### [NEW] `src/components/layout/MegaFooter.jsx`
- 4-column mega footer:
  - **Column 1**: Brand + description + social links
  - **Column 2**: Quick Links (Shop, Categories, New Arrivals)
  - **Column 3**: Support (Contact, Feedback, FAQ)
  - **Column 4**: Legal (Privacy, Return, Cookie, Terms)
- Newsletter signup form
- Copyright bar at bottom
- Plant-themed decorative elements

#### [NEW] `src/components/layout/PageLayout.jsx`
- Wraps Navbar + `<Outlet />` + MegaFooter for all public routes
- Separate `DashboardLayout.jsx` for admin/manager routes (sidebar nav)

---

### Authentication System

#### [NEW] `src/lib/supabase.js`
- Initialize Supabase client with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Falls back gracefully if env vars are missing (demo mode)

#### [NEW] `src/context/AuthContext.jsx`
- React context providing: `user`, `session`, `loading`, `signIn`, `signUp`, `signOut`, `signInWithGoogle`, `signInWithPhone`, `verifyOtp`
- Listens to `supabase.auth.onAuthStateChange` for session persistence
- Provides user role from Supabase `user_metadata` or a `profiles` table

#### [NEW] `src/features/auth/LoginPage.jsx`
- Email + password login form
- "Sign in with Google" button (OAuth redirect)
- Phone number login with OTP verification (2-step: enter phone → enter OTP)
- "Forgot password?" link
- Link to signup page
- Premium glassmorphism card design with plant illustrations

#### [NEW] `src/features/auth/SignupPage.jsx`
- Email + password registration
- Name, email, password, confirm password fields
- Google sign-up option
- Phone sign-up option
- Terms agreement checkbox
- Auto-redirect to shop after signup

#### [NEW] `src/features/auth/AuthCallback.jsx`
- Handles OAuth redirect callback from Google
- Shows loading spinner, then redirects to dashboard

#### [NEW] `src/router/ProtectedRoute.jsx`
- Route guard component: redirects to `/login` if not authenticated
- Optional role check (e.g., only `admin` can access `/admin`)

---

### New Pages

#### [NEW] `src/pages/policies/PrivacyPolicy.jsx`
- Professional privacy policy page with proper headings and sections
- Information we collect, how we use it, third-party sharing, cookies, user rights

#### [NEW] `src/pages/policies/ReturnPolicy.jsx`
- Return & refund policy: 30-day return window, conditions, process, refund timeline

#### [NEW] `src/pages/policies/CookiePolicy.jsx`
- Cookie types, purposes, management, third-party cookies

#### [NEW] `src/pages/policies/TermsAndConditions.jsx`
- Terms of service: account terms, payment, shipping, liability, governing law

#### [NEW] `src/pages/ContactPage.jsx`
- Contact form (name, email, subject, message)
- Contact info sidebar (email, phone, address, hours)
- Embedded map placeholder
- Social media links

#### [NEW] `src/pages/FeedbackPage.jsx`
- Star rating system
- Category selection (Product Quality, Delivery, Customer Service, Website)
- Text feedback area
- Success confirmation with animation

---

### Enhanced Existing Features

#### [NEW] `src/pages/LandingPage.jsx`
- Hero section with parallax plant imagery and CTA
- Featured products carousel
- "Why Choose PlantHub" section with animated icons
- Testimonials section
- Newsletter signup
- Statistics section (plants sold, happy customers, etc.)

#### [NEW] `src/pages/ShopPage.jsx`
- Product grid with filter sidebar (category, price range, availability)
- Search bar
- Sort dropdown (price low-high, name A-Z, newest)
- Add to cart with quantity selector
- Quick view modal

#### [NEW] `src/pages/AdminDashboard.jsx`
- Analytics with Recharts (line, bar, pie charts)
- Product management (CRUD)
- Inventory management with stock alerts
- Order overview

#### [NEW] `src/pages/ManagerDashboard.jsx`
- Pending/shipped/delivered order management
- Order detail panel with status update buttons

---

### Router Configuration

#### [NEW] `src/router/index.jsx`

```
Routes:
/                         → LandingPage
/shop                     → ShopPage
/cart                     → CartPage
/checkout                 → CheckoutPage (protected)
/orders                   → OrdersPage (protected)
/profile                  → ProfilePage (protected)
/login                    → LoginPage
/signup                   → SignupPage
/auth/callback            → AuthCallback
/contact                  → ContactPage
/feedback                 → FeedbackPage (protected)
/privacy-policy           → PrivacyPolicy
/return-policy            → ReturnPolicy
/cookie-policy            → CookiePolicy
/terms-and-conditions     → TermsAndConditions
/admin/*                  → AdminDashboard (protected, role: admin)
/manager/*                → ManagerDashboard (protected, role: manager)
```

---

### Deployment Configuration

#### [NEW] `vercel.json`
- SPA rewrites: all routes → `index.html`

#### [NEW] `.env.example`
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### [NEW] `.gitignore`
- Standard Vite + Node gitignore
- `.env`, `.env.local` excluded

---

## Verification Plan

### Automated Tests
- `npm run build` — Ensure production build succeeds with no errors
- `npm run dev` — Verify dev server starts and all routes render

### Manual Verification
1. Navigate through all pages (landing, shop, cart, all policy pages, contact, feedback)
2. Verify responsive navbar and mega footer appear on every page
3. Test login/signup forms render correctly (actual auth requires Supabase credentials)
4. Verify admin and manager dashboards with charts render properly
5. Test cart add/remove and checkout flow
6. Verify all policy pages have proper content
7. Run `npm run build` for Vercel deployment readiness
