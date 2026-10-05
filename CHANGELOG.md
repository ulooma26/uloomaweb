# Ụlọ Ọma Platform Upgrade — Changelog

All notable changes and architectural upgrades applied to **Ụlọ Ọma** (`https://ulooma01.vercel.app/` / `https://github.com/ulooma26/uloomaweb`) are documented in this file.

---

## [2.0.0] - 2026-10-05

### 1. Branding & Identity Compliance (Section 2)
- **Home Page Branding**: Updated `index.html` to display the site title **Ụlọ Ọma** with the exact lowercase italicized tagline immediately underneath:
  `...your comfort, our priority.` (styled with `font-normal italic lowercase max-w-fit`).
- **Browser Title**: Set `index.html` tab title to exact required string: `Ụlọ Ọma ...your comfort, our priority.`.
- **Design System Fidelity**: Strictly preserved all established Ụlọ Ọma visual tokens:
  - Primary Teal: `#20ACB3`
  - Deep Navy/Dark Teal: `#0F3B3D`
  - Accent Teals: `#196366`, `#82E4E9`
  - Gray Text: `#5C6F70`
  - Cards: `shadow-lg p-7 rounded-4xl bg-white`
  - Buttons: `bg-[#20ACB3] text-white rounded-[20px] hover:bg-black transition`
  - Typography: System sans font with Bootstrap Icons (`bi bi-*`).

### 2. Repository & Security Hygiene (Section 3 & 7)
- **Node Modules Tracking Cleared**: Safely removed previously tracked `node_modules/` folder (thousands of tracked vendor files) from the git index (`git rm -r --cached node_modules`).
- **`.gitignore` Configured**: Added exclusions for `node_modules/`, `.env*`, `.vercel`, build caches, and OS artifacts.
- **Environment Template**: Created `.env.example` detailing Supabase keys, Flutterwave API keys, encryption keys, and webhook hashes.
- **Client Security**: Prevented hardcoding of secret keys in frontend files. Server-side payment verification implemented via serverless endpoints.

### 3. Backend Architecture & Database Schema (Section 7, 8, 10, 11, 14, 15, 22)
- **PostgreSQL / Supabase Schema** (`docs/database-schema.sql`):
  - `profiles`: User accounts, contact info, preferred locations, and RBAC roles (`tenant`, `landlord`, `staff`, `admin`).
  - `properties`: Comprehensive listing schema including Nigerian amenity flags, geolocation, verification state, and assigned representative.
  - `property_verifications`: Six granular verification checklist states (Property, Landlord, Address, Availability, Media, Inspection).
  - `access_payments`: ₦2,000 tenant exploration entitlement tracking (`properties_remaining: 3 -> 2 -> 1 -> 0`).
  - `property_views`: Audited property unlock records tied to active access payments.
  - `reservations`: "Reserve for inspection" workflow records with lifecycle status and scheduled inspection dates.
  - `rental_payments`: Full tenancy payment records with Flutterwave transaction linkage.
  - `moving_requests`: Free relocation fulfillment tracking (8 lifecycle steps).
  - `moving_out_listings`: Outgoing tenant listings for the ₦20,000 relocation reward program.
  - `representatives`: Ụlọ Ọma field viewing representatives.
  - `notifications`: User notification dispatch system.
  - `cac_documents`: Official corporate verification storage and audit records.
  - Comprehensive Row Level Security (RLS) policies and performance indexes.

### 4. Serverless API Architecture (`/api`)
- `/api/payments/verify.js`: Real server-side Flutterwave verification protecting against client manipulation, replay attacks, and duplicate transactions.
- `/api/payments/webhook.js`: Cryptographically verified webhook listener for Flutterwave payment events.
- `/api/properties/index.js` & `[id].js`: REST endpoints for listing, filtering, and detail lookups.
- `/api/reservations/index.js` & `[id].js`: Endpoints for inspection reservation management and status updates.
- `/api/moving/index.js` & `[id].js`: Endpoints for moving service scheduling and team assignments.
- `/api/rewards/index.js`: Endpoints for the ₦20,000 outgoing tenant reward pipeline.
- `/api/admin/users.js` & `/api/admin/dashboard.js`: Admin overview and user management APIs.
- `/api/auth/profile.js`: User profile retrieval and updating.
- `vercel.json`: Routing and serverless function configuration for Vercel deployment.

### 5. Client Modular Libraries (`/js`)
- `js/supabase.js`: Dynamic client initialization with live env injection and graceful fallback.
- `js/auth.js`: Registration, login, session persistence, role checks, and password security.
- `js/payments.js`: Flutterwave checkout orchestration, server verification calls, and access countdown.
- `js/properties.js`: Query engine supporting Nigerian amenity filters (water, electricity, parking, security, gated estate).
- `js/reservations.js`: Inspection scheduling controller.
- `js/moving.js`: Moving service status and timeline management.
- `js/rewards.js`: Outgoing tenant listing and ₦20,000 reward tracking.
- `js/components.js`: Reusable UI components (header, footer, badges, toast notifications, modals, spinners).
- `js/notifications.js`: Interactive notification center with unread counters and badge indicators.

### 6. Tenant Access Model: ₦2,000 for 3 Verified Properties (Section 5)
- Clear entitlement counter: `Properties remaining: 3 -> 2 -> 1 -> 0`.
- Implemented visual indicators (three green/teal dots that decrement upon unlocking verified property details).
- Access prompt banners on `explore.html`, `tenant-dashboard.html`, and `property-details.html`.

### 7. New Applications & Dashboards
- **`tenant-dashboard.html`**:
  - Welcome banner with live user profile details.
  - Access entitlement card with real-time remaining counter and Flutterwave top-up.
  - Reservation history cards with color-coded status badges.
  - 8-stage Moving timeline visualization.
  - ₦20,000 reward tracking card.
- **`landlord-dashboard.html`**:
  - Property inventory grid with 10 lifecycle badges (Draft, Submitted, Under Review, Approved, Verified, Published, etc.).
  - Document verification upload section.
  - Enquiries and viewing management table.
  - Direct CTA to `list-property.html`.
- **`admin/index.html`**:
  - Central Operations Control Center for Ụlọ Ọma administrators.
  - Dedicated tabs: Overview KPI stats, Users, Properties, Reservations, Payments, Moving, ₦20,000 Rewards, CAC Credentials.
  - Action buttons for verification, representative assignment, viewing scheduling, and reward payouts.
- **`moving-out.html`**:
  - Dedicated page for outgoing tenants to earn ₦20,000.
  - 4-step explanation of the reward process.
  - Complete apartment submission form with amenities, landlord contact info, and legal authorization confirmation.
  - 9-step reward tracking timeline for submitted listings.

### 8. Upgraded Existing Pages & Workflows
- **`property-details.html`**:
  - Section 10: Six verified status badges (Property Verified, Landlord Verified, Address Verified, Availability Confirmed, Media Verified, Inspection Completed).
  - Section 11 & 13: "Reserve for inspection" action with interactive inspection booking modal.
  - Section 12: Assigned Ụlọ Ọma Property Representative card with name, phone, and availability badge.
  - Entitlement enforcement and countdown.
- **`card-payment.html`**:
  - Real Flutterwave standard modal integration (`FlutterwaveCheckout`).
  - Calls `/api/payments/verify` on completion.
  - Secure state management without client-side trusting.
- **`bank_transfer.html`**:
  - Working clipboard copy for bank account details with toast feedback.
  - Confirmation submission routing to `successful.html`.
- **`successful.html` & `failed.html`**:
  - Dynamic transaction parameter parsing (`tx_id`, `amount`, `purpose`).
  - Active button handlers directing tenants to reservations and dashboard.
- **`about.html`**:
  - Section 22: Official CAC Certificate / Company Credentials section with document details and interactive lightbox preview.
  - Updated navigation and standard branded footer.
- **`contact.html`**:
  - Complete form validation, submit loading state, and toast feedback.
- **`signup.html` & `login.html`**:
  - Form validation with Nigerian phone format validation, password strength meters, and Supabase auth connection.
- **`how-it-works.html`**:
  - Tabbed interface switching between Tenant and Landlord guides.
  - Full explanation of ₦2,000 access, free viewing transport, free moving, and ₦20,000 reward.
- **`list-property.html`**:
  - Full Nigerian residential property listing form with multi-photo input and landlord authorization.

### 9. Route & File Hygiene
- Created seamless client-side redirects for space-named legacy URLs (`apartment details.html`, `card payment reservation.html`, `how it works.html`, `rent for apartment.html`) to their canonical hyphenated equivalents.
- Normalized all asset links to `./images/`.
