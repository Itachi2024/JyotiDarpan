import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HoroscopeRequest {
  sign: string;
  date?: string;
  period?: 'daily' | 'weekly' | 'monthly';
}

// Free horoscope APIs
const fetchHoroscopeFromAPI = async (sign: string, period: string = 'daily') => {
  try {
    // Try Horoscope API (free tier available)
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${sign.toLowerCase()}&day=today`);
    
    if (response.ok) {
      const data = await response.json();
      return {
        overview_english: data.data.horoscope_data,
        overview_hindi: translateToHindi(data.data.horoscope_data),
        love_score: Math.floor(Math.random() * 30) + 70,
        career_score: Math.floor(Math.random() * 30) + 70,
        health_score: Math.floor(Math.random() * 30) + 70,
        finance_score: Math.floor(Math.random() * 30) + 70,
        lucky_number: Math.floor(Math.random() * 12) + 1,
        lucky_color: getLuckyColor(sign),
        lucky_time: getLuckyTime(),
        isRealData: true
      };
    }
  } catch (error) {
    console.error('Horoscope API error:', error);
  }

  // Fallback to generated content
  return generateHoroscope(sign);
};

const translateToHindi = (text: string): string => {
  // Simple keyword-based translation for demo
  const translations: { [key: string]: string } = {
    'today': 'आज',
    'good': 'अच्छा',
    'love': 'प्रेम',
    'career': 'करियर',
    'health': 'स्वास्थ्य',
    'money': 'धन',
    'family': 'परिवार',
    'success': 'सफलता',
    'happiness': 'खुशी',
    'fortune': 'भाग्य'
  };

  let hindiText = text;
  Object.entries(translations).forEach(([eng, hindi]) => {
    hindiText = hindiText.replace(new RegExp(eng, 'gi'), hindi);
  });

  return hindiText;
};

const getLuckyColor = (sign: string): string => {
  const colors: { [key: string]: string } = {
    'aries': 'Red',
    'taurus': 'Green',
    'gemini': 'Yellow',
    'cancer': 'Silver',
    'leo': 'Gold',
    'virgo': 'Navy Blue',
    'libra': 'Pink',
    'scorpio': 'Maroon',
    'sagittarius': 'Purple',
    'capricorn': 'Black',
    'aquarius': 'Electric Blue',
    'pisces': 'Sea Green'
  };
  return colors[sign.toLowerCase()] || 'White';
};

const getLuckyTime = (): string => {
  const times = [
    '6:00 AM - 8:00 AM',
    '10:00 AM - 12:00 PM',
    '2:00 PM - 4:00 PM',
    '6:00 PM - 8:00 PM'
  ];
  return times[Math.floor(Math.random() * times.length)];
};

const generateHoroscope = (sign: string) => {
  const predictions: { [key: string]: any } = {
    'aries': {
      overview_hindi: 'आज का दिन आपके लिए शुभ है। करियर में नई संभावनाएं खुलेंगी और आर्थिक स्थिति मजबूत होगी।',
      overview_english: 'Today is auspicious for you. New opportunities will open in career and financial position will strengthen.',
      love_text: 'प्रेम संबंधों में मधुरता रहेगी।',
      career_text: 'कार्यस्थल पर सम्मान मिलेगा।',
      health_text: 'स्वास्थ्य का ध्यान रखें।',
      finance_text: 'आर्थिक लाभ होगा।'
    },
    'taurus': {
      overview_hindi: 'धन संबंधी मामलों में सावधानी बरतें। परिवार का साथ मिलेगा।',
      overview_english: 'Be careful in money matters. Family support will be there.',
      love_text: 'रिश्तों में समझदारी दिखाएं।',
      career_text: 'कड़ी मेहनत रंग लाएगी।',
      health_text: 'स्वास्थ्य अच्छा रहेगा।',
      finance_text: 'निवेश के लिए अच्छा समय।'
    },
    // Add more signs...
  };

  const signData = predictions[sign.toLowerCase()] || predictions['aries'];
  
  return {
    ...signData,
    love_score: Math.floor(Math.random() * 30) + 70,
    career_score: Math.floor(Math.random() * 30) + 70,
    health_score: Math.floor(Math.random() * 30) + 70,
    finance_score: Math.floor(Math.random() * 30) + 70,
    lucky_number: Math.floor(Math.random() * 12) + 1,
    lucky_color: getLuckyColor(sign),
    lucky_time: getLuckyTime(),
    isRealData: false
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { sign, date, period }: HoroscopeRequest = await req.json();
    const targetDate = date || new Date().toISOString().split('T')[0];

    // Check if we already have data for this date and sign
    const { data: existingData } = await supabaseClient
      .from('horoscopes')
      .select('*')
      .eq('sign', sign.toLowerCase())
      .eq('date', targetDate)
      .single();

    if (existingData) {
      return new Response(JSON.stringify(existingData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch new horoscope data
    const horoscopeData = await fetchHoroscopeFromAPI(sign, period || 'daily');

    // Save to database
    const { data: savedData, error } = await supabaseClient
      .from('horoscopes')
      .insert({
        date: targetDate,
        sign: sign.toLowerCase(),
        overview_hindi: horoscopeData.overview_hindi,
        overview_english: horoscopeData.overview_english,
        love_score: horoscopeData.love_score,
        love_text: horoscopeData.love_text,
        career_score: horoscopeData.career_score,
        career_text: horoscopeData.career_text,
        health_score: horoscopeData.health_score,
        health_text: horoscopeData.health_text,
        finance_score: horoscopeData.finance_score,
        finance_text: horoscopeData.finance_text,
        lucky_number: horoscopeData.lucky_number,
        lucky_color: horoscopeData.lucky_color,
        lucky_time: horoscopeData.lucky_time,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      ...savedData,
      message: horoscopeData.isRealData ? "Fetched from horoscope API" : "Generated prediction"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});