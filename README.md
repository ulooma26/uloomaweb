# Ụlọ Ọma

**...your comfort, our priority.**

Ụlọ Ọma is a property discovery, rental, verification, reservation, payment, and relocation platform serving the Nigerian rental market.

## Core Value Proposition

**Find your home. We help you move in.**

- **For Tenants**: Register → Pay ₦2,000 → Explore 3 verified properties → Reserve → Visit → Pay → We move you in.
- **For Outgoing Tenants**: List your old apartment → Someone moves in through Ụlọ Ọma → Earn ₦20,000.
- **For Landlords**: Register → Verify → List properties → Manage enquiries → Track rentals.

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS v4, Bootstrap Icons
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database & Auth**: Supabase (PostgreSQL)
- **Payments**: Flutterwave
- **File Storage**: Supabase Storage
- **Deployment**: Vercel

## Development Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Tailwind CSS watcher for development.

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Flutterwave
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_WEBHOOK_HASH=your_webhook_hash

# App
APP_URL=https://ulooma01.vercel.app
```

> **IMPORTANT**: Never commit `.env` files or secret keys to the repository.

### Deployment

The project deploys automatically to Vercel. Ensure all environment variables are configured in the Vercel dashboard.

## Project Structure

```
├── index.html              # Homepage
├── explore.html            # Property marketplace
├── property-details.html   # Property detail page
├── signup.html             # User registration
├── login.html              # User login
├── tenant-dashboard.html   # Tenant dashboard
├── landlord-dashboard.html # Landlord dashboard
├── admin/                  # Admin dashboard
├── api/                    # Vercel serverless functions
│   ├── auth/               # Authentication endpoints
│   ├── payments/           # Payment verification
│   ├── properties/         # Property management
│   ├── reservations/       # Reservation management
│   └── moving/             # Moving service management
├── js/                     # Shared JavaScript modules
│   ├── supabase.js         # Supabase client
│   ├── auth.js             # Auth utilities
│   ├── payments.js         # Payment utilities
│   └── components.js       # Shared UI components
├── images/                 # Static assets
├── src/
│   ├── input.css           # Tailwind CSS source
│   └── output.css          # Compiled CSS
└── docs/                   # Documentation
```

## Features

See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for current feature status.

## License

© 2025 Ụlọ Ọma. All Rights Reserved.
