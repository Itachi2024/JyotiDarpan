-- AstroRishabh Final Database Schema
-- Complete production-ready schema for astrology application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- CORE TABLES
-- =============================================

-- Users profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Astrologers table (simplified)
CREATE TABLE public.astrologers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    english_name TEXT,
    specialties TEXT[] DEFAULT '{}',
    experience_years INTEGER DEFAULT 5,
    rating DECIMAL(2,1) DEFAULT 4.9,
    total_reviews INTEGER DEFAULT 100,
    languages TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT TRUE,
    description TEXT,
    whatsapp_number TEXT DEFAULT '+919799104619',
    email_address TEXT DEFAULT 'rishabhdadhich21@gmail.com',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE public.contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ASTROLOGY DATA TABLES
-- =============================================

-- Kundli data table
CREATE TABLE public.kundlis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    place_of_birth TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    timezone TEXT,
    chart_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily horoscope data
CREATE TABLE public.horoscopes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    sign TEXT NOT NULL,
    overview_hindi TEXT,
    overview_english TEXT,
    love_score INTEGER CHECK (love_score >= 0 AND love_score <= 100),
    love_text TEXT,
    career_score INTEGER CHECK (career_score >= 0 AND career_score <= 100),
    career_text TEXT,
    health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
    health_text TEXT,
    finance_score INTEGER CHECK (finance_score >= 0 AND finance_score <= 100),
    finance_text TEXT,
    lucky_number INTEGER,
    lucky_color TEXT,
    lucky_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, sign)
);

-- Panchang data
CREATE TABLE public.panchangs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    tithi_name_hindi TEXT,
    tithi_name_english TEXT,
    tithi_end_time TIME,
    nakshatra_name_hindi TEXT,
    nakshatra_name_english TEXT,
    nakshatra_end_time TIME,
    yoga_name_hindi TEXT,
    yoga_name_english TEXT,
    yoga_end_time TIME,
    karana_name_hindi TEXT,
    karana_name_english TEXT,
    karana_end_time TIME,
    paksha TEXT,
    vaar_hindi TEXT,
    vaar_english TEXT,
    sunrise TIME,
    sunset TIME,
    moonrise TIME,
    moonset TIME,
    rahu_kaal_start TIME,
    rahu_kaal_end TIME,
    yamagandam_start TIME,
    yamagandam_end TIME,
    gulik_kaal_start TIME,
    gulik_kaal_end TIME,
    abhijit_start TIME,
    abhijit_end TIME,
    choghadiya JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Muhurta data
CREATE TABLE public.muhurats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    muhurta_type TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    quality TEXT CHECK (quality IN ('best', 'good', 'average')) DEFAULT 'good',
    tithi TEXT,
    nakshatra TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astrologers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundlis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panchangs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muhurats ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can manage their own profile
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Astrologers: Public read access
CREATE POLICY "Anyone can view astrologers" ON public.astrologers FOR SELECT USING (true);

-- Contact submissions: Anyone can create, no read access for users
CREATE POLICY "Anyone can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Kundlis: Users can manage their own kundlis
CREATE POLICY "Users can view own kundlis" ON public.kundlis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own kundlis" ON public.kundlis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own kundlis" ON public.kundlis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own kundlis" ON public.kundlis FOR DELETE USING (auth.uid() = user_id);

-- Horoscopes: Public read access
CREATE POLICY "Anyone can view horoscopes" ON public.horoscopes FOR SELECT USING (true);

-- Panchangs: Public read access
CREATE POLICY "Anyone can view panchangs" ON public.panchangs FOR SELECT USING (true);

-- Muhurats: Public read access
CREATE POLICY "Anyone can view muhurats" ON public.muhurats FOR SELECT USING (true);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert default astrologer
INSERT INTO public.astrologers (
    id,
    name, 
    english_name, 
    specialties, 
    experience_years, 
    rating, 
    total_reviews, 
    languages, 
    description,
    whatsapp_number,
    email_address
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    'पंडित ऋषभ दाधीच',
    'Pt. Rishabh Dadhich',
    ARRAY['Vedic Astrology', 'Kundli Analysis', 'Career Guidance', 'Relationship Advice'],
    5,
    4.9,
    2340,
    ARRAY['Hindi', 'English'],
    'Expert Vedic astrologer with 5+ years of experience. Specialized in career guidance, relationship advice, and life predictions using traditional Vedic methods.',
    '+919799104619',
    'rishabhdadhich21@gmail.com'
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Indexes for better query performance
CREATE INDEX idx_horoscopes_date_sign ON public.horoscopes(date, sign);
CREATE INDEX idx_panchangs_date ON public.panchangs(date);
CREATE INDEX idx_muhurats_date_type ON public.muhurats(date, muhurta_type);
CREATE INDEX idx_kundlis_user_id ON public.kundlis(user_id);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth';
COMMENT ON TABLE public.astrologers IS 'Verified astrologers information';
COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions from users';
COMMENT ON TABLE public.kundlis IS 'User birth charts and kundli data';
COMMENT ON TABLE public.horoscopes IS 'Daily horoscope predictions by zodiac sign';
COMMENT ON TABLE public.panchangs IS 'Hindu calendar data with tithi, nakshatra etc';
COMMENT ON TABLE public.muhurats IS 'Auspicious timing data for various activities';