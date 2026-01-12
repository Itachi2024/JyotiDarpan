-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    time_of_birth TIME,
    place_of_birth TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    preferred_language TEXT DEFAULT 'hindi',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Astrologers table
CREATE TABLE public.astrologers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    name TEXT NOT NULL,
    english_name TEXT,
    avatar_url TEXT,
    specialties TEXT[] DEFAULT '{}',
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    price_per_minute INTEGER NOT NULL,
    languages TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT FALSE,
    is_online BOOLEAN DEFAULT FALSE,
    total_consultations INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE public.consultations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    astrologer_id UUID REFERENCES public.astrologers ON DELETE CASCADE NOT NULL,
    type TEXT CHECK (type IN ('chat', 'call', 'video')) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'active', 'completed', 'cancelled')) DEFAULT 'pending',
    duration_minutes INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    astrologer_id UUID REFERENCES public.astrologers ON DELETE CASCADE NOT NULL,
    consultation_id UUID REFERENCES public.consultations ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
    chart_data JSONB, -- Store planetary positions, houses, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match making results
CREATE TABLE public.match_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    boy_kundli_id UUID REFERENCES public.kundlis ON DELETE CASCADE NOT NULL,
    girl_kundli_id UUID REFERENCES public.kundlis ON DELETE CASCADE NOT NULL,
    total_score INTEGER,
    guna_scores INTEGER[] DEFAULT '{}',
    is_boy_manglik BOOLEAN DEFAULT FALSE,
    is_girl_manglik BOOLEAN DEFAULT FALSE,
    recommendation TEXT,
    detailed_analysis JSONB,
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
    choghadiya JSONB, -- Array of choghadiya timings
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

-- Chat messages
CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    consultation_id UUID REFERENCES public.consultations ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    message_type TEXT CHECK (message_type IN ('text', 'image', 'file')) DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    consultation_id UUID REFERENCES public.consultations ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_method TEXT,
    payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet/Credits system
CREATE TABLE public.wallets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet transactions
CREATE TABLE public.wallet_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    wallet_id UUID REFERENCES public.wallets ON DELETE CASCADE NOT NULL,
    type TEXT CHECK (type IN ('credit', 'debit')) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    reference_id UUID, -- Can reference consultation, payment, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astrologers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundlis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Astrologers (public read, own write)
CREATE POLICY "Anyone can view astrologers" ON public.astrologers FOR SELECT USING (true);
CREATE POLICY "Astrologers can update own profile" ON public.astrologers FOR UPDATE USING (auth.uid() = user_id);

-- Consultations
CREATE POLICY "Users can view own consultations" ON public.consultations FOR SELECT USING (auth.uid() = user_id OR auth.uid() = (SELECT user_id FROM public.astrologers WHERE id = astrologer_id));
CREATE POLICY "Users can create consultations" ON public.consultations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews (public read, own write)
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Kundlis
CREATE POLICY "Users can view own kundlis" ON public.kundlis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own kundlis" ON public.kundlis FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Match results
CREATE POLICY "Users can view own match results" ON public.match_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own match results" ON public.match_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat messages
CREATE POLICY "Consultation participants can view messages" ON public.chat_messages FOR SELECT USING (
    auth.uid() IN (
        SELECT user_id FROM public.consultations WHERE id = consultation_id
        UNION
        SELECT user_id FROM public.astrologers WHERE id = (SELECT astrologer_id FROM public.consultations WHERE id = consultation_id)
    )
);
CREATE POLICY "Consultation participants can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Payments
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wallets
CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);

-- Wallet transactions
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM public.wallets WHERE id = wallet_id)
);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.wallets (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update astrologer rating
CREATE OR REPLACE FUNCTION public.update_astrologer_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.astrologers 
    SET 
        rating = (SELECT AVG(rating)::DECIMAL(2,1) FROM public.reviews WHERE astrologer_id = NEW.astrologer_id),
        total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE astrologer_id = NEW.astrologer_id)
    WHERE id = NEW.astrologer_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for rating updates
CREATE TRIGGER on_review_created
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_astrologer_rating();