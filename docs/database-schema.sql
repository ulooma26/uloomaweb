-- docs/database-schema.sql
-- Ulo Oma Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    email TEXT,
    preferred_location TEXT,
    role TEXT DEFAULT 'tenant', -- 'tenant', 'landlord', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- PROPERTIES
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    price NUMERIC NOT NULL,
    rental_frequency TEXT DEFAULT 'Yearly',
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    amenities TEXT[],
    description TEXT,
    images TEXT[],
    videos TEXT[],
    availability BOOLEAN DEFAULT true,
    landlord_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    verification_status TEXT DEFAULT 'Pending', -- 'Pending', 'Verified', 'Rejected'
    representative_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROPERTY VERIFICATIONS
CREATE TABLE property_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_verified BOOLEAN DEFAULT false,
    landlord_verified BOOLEAN DEFAULT false,
    address_verified BOOLEAN DEFAULT false,
    availability_confirmed BOOLEAN DEFAULT false,
    media_verified BOOLEAN DEFAULT false,
    inspection_completed BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(property_id)
);

-- ACCESS PAYMENTS
CREATE TABLE access_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    transaction_ref TEXT UNIQUE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'NGN',
    status TEXT DEFAULT 'pending',
    flutterwave_tx_id TEXT,
    properties_remaining INTEGER DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROPERTY VIEWS
CREATE TABLE property_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    access_payment_id UUID REFERENCES access_payments(id),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- REPRESENTATIVES
CREATE TABLE representatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RESERVATIONS
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Requested',
    preferred_date DATE,
    representative_id UUID REFERENCES representatives(id),
    viewing_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RENTAL PAYMENTS
CREATE TABLE rental_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    transaction_ref TEXT UNIQUE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'NGN',
    status TEXT DEFAULT 'pending',
    flutterwave_tx_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MOVING REQUESTS
CREATE TABLE moving_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    old_address TEXT NOT NULL,
    new_address TEXT NOT NULL,
    preferred_date DATE,
    moving_date TIMESTAMP WITH TIME ZONE,
    team_assigned TEXT,
    status TEXT DEFAULT 'Moving Request Submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MOVING OUT LISTINGS (Rewards Program)
CREATE TABLE moving_out_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_address TEXT NOT NULL,
    property_type TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    rent NUMERIC,
    available_date DATE,
    features TEXT[],
    photos TEXT[],
    landlord_name TEXT,
    landlord_contact TEXT,
    description TEXT,
    status TEXT DEFAULT 'Submitted',
    new_tenant_id UUID REFERENCES auth.users(id),
    reward_status TEXT DEFAULT 'Submitted',
    reward_amount NUMERIC DEFAULT 20000,
    payout_ref TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT,
    title TEXT NOT NULL,
    message TEXT,
    link TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CAC DOCUMENTS
CREATE TABLE cac_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    registration_number TEXT,
    document_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Example basics)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Properties are viewable by everyone" ON properties FOR SELECT USING (true);
CREATE POLICY "Landlords can insert properties" ON properties FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role IN ('landlord', 'admin'))
);

-- INDEXES
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
