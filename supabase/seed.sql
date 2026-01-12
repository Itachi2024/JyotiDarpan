-- Seed data for astrology platform

-- Update RLS policy to allow public read access to astrologers
DROP POLICY IF EXISTS "Anyone can view astrologers" ON public.astrologers;
CREATE POLICY "Anyone can view verified astrologers" ON public.astrologers 
    FOR SELECT USING (is_verified = true);

-- Update RLS policy for service rates
DROP POLICY IF EXISTS "Anyone can view service rates" ON public.service_rates;
CREATE POLICY "Anyone can view active service rates" ON public.service_rates 
    FOR SELECT USING (is_active = true);

-- Insert sample astrologers (these will be available even without authentication)
INSERT INTO public.astrologers (
    id,
    name, 
    english_name, 
    specialties, 
    experience_years, 
    rating, 
    total_reviews, 
    price_per_minute, 
    languages, 
    is_verified, 
    total_consultations, 
    description, 
    is_admin, 
    whatsapp_number, 
    email_address, 
    availability_status
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    'पंडित राजेश शर्मा',
    'Pt. Rajesh Sharma',
    ARRAY['Vedic Astrology', 'Kundli', 'Career'],
    15,
    4.9,
    2340,
    25,
    ARRAY['Hindi', 'English'],
    true,
    15000,
    'Expert in Vedic astrology with 15+ years of experience. Specialized in career guidance and relationship issues.',
    true,
    '+91-9876543210',
    'rajesh.sharma@jyotishguru.com',
    'online'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'आचार्य विनोद मिश्रा',
    'Acharya Vinod Mishra',
    ARRAY['Numerology', 'Vastu', 'Remedies'],
    20,
    4.8,
    3120,
    35,
    ARRAY['Hindi', 'Sanskrit'],
    true,
    22000,
    'Renowned numerologist and Vastu expert. Known for providing effective remedies.',
    true,
    '+91-9876543211',
    'vinod.mishra@jyotishguru.com',
    'online'
)
ON CONFLICT (id) DO NOTHING;

-- Insert service rates if not exists
INSERT INTO public.service_rates (service_name, price_inr, duration, description, is_active) VALUES
('Daily Horoscope', 0, '5 mins', 'Free daily predictions for your zodiac sign', true),
('Kundli Generation', 0, '30 mins', 'Free complete birth chart analysis', true),
('Kundli Matching', 0, '45 mins', 'Free 36 Guna compatibility analysis', true),
('Panchang Consultation', 0, '15 mins', 'Free Hindu calendar guidance', true),
('Muhurat Selection', 299, '20 mins', 'Find perfect timing for important events', true),
('Personal Call Consultation', 25, '1 min', 'One-on-one voice consultation with expert astrologer', true),
('Chat Consultation', 15, '1 min', 'Text-based consultation with astrologers', true),
('Video Call Consultation', 35, '1 min', 'Face-to-face video consultation', true),
('AI Astrology Bot', 0, 'Instant', 'Free AI-powered astrology predictions', true),
('Remedies & Solutions', 299, '40 mins', 'Personalized remedies for planetary doshas', true),
('Career Guidance', 499, '45 mins', 'Professional astrology guidance for career decisions', true),
('Love & Relationship', 399, '40 mins', 'Relationship compatibility and love guidance', true),
('Health Astrology', 349, '35 mins', 'Health predictions and wellness guidance', true),
('Vastu Consultation', 999, '60 mins', 'Complete Vastu analysis for home and office', true)
ON CONFLICT (service_name) DO NOTHING;