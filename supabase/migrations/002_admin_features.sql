-- Update astrologers table for admin functionality
ALTER TABLE public.astrologers ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE public.astrologers ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.astrologers ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.astrologers ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.astrologers ADD COLUMN IF NOT EXISTS availability_status TEXT CHECK (availability_status IN ('online', 'offline', 'busy')) DEFAULT 'offline';

-- Create services and rates table
CREATE TABLE IF NOT EXISTS public.service_rates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_name TEXT NOT NULL,
    price_inr INTEGER NOT NULL,
    duration TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact form submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin astrologers
INSERT INTO public.astrologers (name, english_name, specialties, experience_years, rating, total_reviews, price_per_minute, languages, is_verified, is_online, total_consultations, description, is_admin, whatsapp_number, email_address, availability_status) VALUES
('पंडित राजेश शर्मा', 'Pt. Rajesh Sharma', ARRAY['Vedic Astrology', 'Kundli', 'Career'], 15, 4.9, 2340, 25, ARRAY['Hindi', 'English'], true, true, 15000, 'Expert in Vedic astrology with 15+ years of experience. Specialized in career guidance and relationship issues.', true, '+91-9876543210', 'rajesh.sharma@jyotishguru.com', 'online'),
('आचार्य विनोद मिश्रा', 'Acharya Vinod Mishra', ARRAY['Numerology', 'Vastu', 'Remedies'], 20, 4.8, 3120, 35, ARRAY['Hindi', 'Sanskrit'], true, true, 22000, 'Renowned numerologist and Vastu expert. Known for providing effective remedies.', true, '+91-9876543211', 'vinod.mishra@jyotishguru.com', 'online');

-- Insert default service rates
INSERT INTO public.service_rates (service_name, price_inr, duration, description) VALUES
('Daily Horoscope', 50, '5 mins', 'Personalized daily predictions for your zodiac sign'),
('Kundli Generation', 500, '30 mins', 'Complete birth chart analysis with planetary positions'),
('Kundli Matching', 800, '45 mins', '36 Guna compatibility analysis for marriage'),
('Panchang Consultation', 200, '15 mins', 'Hindu calendar guidance for auspicious timings'),
('Muhurat Selection', 300, '20 mins', 'Find perfect timing for important events'),
('Personal Consultation', 1000, '60 mins', 'One-on-one consultation with expert astrologer'),
('Remedies & Solutions', 600, '40 mins', 'Personalized remedies for planetary doshas'),
('Career Guidance', 700, '45 mins', 'Professional astrology guidance for career decisions'),
('Love & Relationship', 600, '40 mins', 'Relationship compatibility and love guidance'),
('Health Astrology', 500, '35 mins', 'Health predictions and wellness guidance');

-- Enable RLS for new tables
ALTER TABLE public.service_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service rates
CREATE POLICY "Anyone can view service rates" ON public.service_rates FOR SELECT USING (is_active = true);
CREATE POLICY "Admin astrologers can manage service rates" ON public.service_rates FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM public.astrologers WHERE is_admin = true)
);

-- RLS Policies for contact submissions
CREATE POLICY "Anyone can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin astrologers can view contact submissions" ON public.contact_submissions FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM public.astrologers WHERE is_admin = true)
);
CREATE POLICY "Admin astrologers can update contact submissions" ON public.contact_submissions FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM public.astrologers WHERE is_admin = true)
);

-- Function to update astrologer availability
CREATE OR REPLACE FUNCTION public.update_astrologer_availability(astrologer_id UUID, new_status TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user is admin astrologer
    IF auth.uid() NOT IN (SELECT user_id FROM public.astrologers WHERE is_admin = true AND id = astrologer_id) THEN
        RETURN FALSE;
    END IF;
    
    UPDATE public.astrologers 
    SET availability_status = new_status, updated_at = NOW()
    WHERE id = astrologer_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update service rates
CREATE OR REPLACE FUNCTION public.update_service_rate(service_id UUID, new_price INTEGER, new_duration TEXT, new_description TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user is admin astrologer
    IF auth.uid() NOT IN (SELECT user_id FROM public.astrologers WHERE is_admin = true) THEN
        RETURN FALSE;
    END IF;
    
    UPDATE public.service_rates 
    SET price_inr = new_price, duration = new_duration, description = new_description, updated_at = NOW()
    WHERE id = service_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;