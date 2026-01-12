import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PanchangRequest {
  date?: string;
  latitude?: number;
  longitude?: number;
}

// Free Panchang API integration
const fetchPanchangFromAPI = async (date: string, lat: number = 28.6139, lng: number = 77.2090) => {
  try {
    // Try using a free Hindu calendar API
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    // Alternative: Use AstrologyAPI.com free tier
    const ASTROLOGY_API_USER = Deno.env.get("ASTROLOGY_API_USER");
    const ASTROLOGY_API_KEY = Deno.env.get("ASTROLOGY_API_KEY");
    
    if (ASTROLOGY_API_USER && ASTROLOGY_API_KEY) {
      const auth = btoa(`${ASTROLOGY_API_USER}:${ASTROLOGY_API_KEY}`);
      
      const requestData = {
        day: day,
        month: month,
        year: year,
        hour: 12,
        min: 0,
        lat: lat,
        lon: lng,
        tzone: 5.5
      };

      const response = await fetch('https://json.astrologyapi.com/v1/panchang', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          tithi_name_hindi: getHindiName(data.tithi),
          tithi_name_english: data.tithi,
          tithi_end_time: data.tithi_end_time || '18:45',
          nakshatra_name_hindi: getHindiNakshatra(data.nakshatra),
          nakshatra_name_english: data.nakshatra,
          nakshatra_end_time: data.nakshatra_end_time || '14:30',
          yoga_name_hindi: getHindiYoga(data.yoga),
          yoga_name_english: data.yoga,
          yoga_end_time: data.yoga_end_time || '22:15',
          karana_name_hindi: getHindiKarana(data.karana),
          karana_name_english: data.karana,
          karana_end_time: data.karana_end_time || '12:00',
          paksha: data.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
          vaar_hindi: getHindiDay(dateObj.getDay()),
          vaar_english: getDayName(dateObj.getDay()),
          sunrise: data.sunrise || '06:45',
          sunset: data.sunset || '18:30',
          moonrise: data.moonrise || '19:15',
          moonset: data.moonset || '06:30',
          isRealData: true
        };
      }
    }
  } catch (error) {
    console.error('Panchang API error:', error);
  }

  // Fallback to calculated data
  return generatePanchang(date);
};

const getHindiName = (english: string): string => {
  const tithiMap: { [key: string]: string } = {
    'Pratipada': 'प्रतिपदा',
    'Dwitiya': 'द्वितीया',
    'Tritiya': 'तृतीया',
    'Chaturthi': 'चतुर्थी',
    'Panchami': 'पंचमी',
    'Shashthi': 'षष्ठी',
    'Saptami': 'सप्तमी',
    'Ashtami': 'अष्टमी',
    'Navami': 'नवमी',
    'Dashami': 'दशमी',
    'Ekadashi': 'एकादशी',
    'Dwadashi': 'द्वादशी',
    'Trayodashi': 'त्रयोदशी',
    'Chaturdashi': 'चतुर्दशी',
    'Purnima': 'पूर्णिमा',
    'Amavasya': 'अमावस्या'
  };
  return tithiMap[english] || english;
};

const getHindiNakshatra = (english: string): string => {
  const nakshatraMap: { [key: string]: string } = {
    'Ashwini': 'अश्विनी',
    'Bharani': 'भरणी',
    'Krittika': 'कृत्तिका',
    'Rohini': 'रोहिणी',
    'Mrigashira': 'मृगशिरा',
    'Ardra': 'आर्द्रा',
    'Punarvasu': 'पुनर्वसु',
    'Pushya': 'पुष्य',
    'Ashlesha': 'आश्लेषा',
    'Magha': 'मघा',
    'Purva Phalguni': 'पूर्व फाल्गुनी',
    'Uttara Phalguni': 'उत्तर फाल्गुनी',
    'Hasta': 'हस्त',
    'Chitra': 'चित्रा',
    'Swati': 'स्वाति',
    'Vishakha': 'विशाखा',
    'Anuradha': 'अनुराधा',
    'Jyeshtha': 'ज्येष्ठा',
    'Mula': 'मूल',
    'Purva Ashadha': 'पूर्व आषाढ़ा',
    'Uttara Ashadha': 'उत्तर आषाढ़ा',
    'Shravana': 'श्रवण',
    'Dhanishta': 'धनिष्ठा',
    'Shatabhisha': 'शतभिषा',
    'Purva Bhadrapada': 'पूर्व भाद्रपदा',
    'Uttara Bhadrapada': 'उत्तर भाद्रपदा',
    'Revati': 'रेवती'
  };
  return nakshatraMap[english] || english;
};

const getHindiYoga = (english: string): string => {
  const yogaMap: { [key: string]: string } = {
    'Vishkambha': 'विष्कम्भ',
    'Preeti': 'प्रीति',
    'Ayushman': 'आयुष्मान',
    'Saubhagya': 'सौभाग्य',
    'Shobhana': 'शोभन',
    'Atiganda': 'अतिगण्ड',
    'Sukarma': 'सुकर्म',
    'Dhriti': 'धृति',
    'Shula': 'शूल',
    'Ganda': 'गण्ड',
    'Vriddhi': 'वृद्धि',
    'Dhruva': 'ध्रुव',
    'Vyaghata': 'व्याघात',
    'Harshana': 'हर्षण',
    'Vajra': 'वज्र',
    'Siddhi': 'सिद्धि',
    'Vyatipata': 'व्यतीपात',
    'Variyana': 'वरीयान',
    'Parigha': 'परिघ',
    'Shiva': 'शिव',
    'Siddha': 'सिद्ध',
    'Sadhya': 'साध्य',
    'Shubha': 'शुभ',
    'Shukla': 'शुक्ल',
    'Brahma': 'ब्रह्म',
    'Indra': 'इन्द्र',
    'Vaidhriti': 'वैधृति'
  };
  return yogaMap[english] || 'शुभ';
};

const getHindiKarana = (english: string): string => {
  const karanaMap: { [key: string]: string } = {
    'Bava': 'बव',
    'Balava': 'बालव',
    'Kaulava': 'कौलव',
    'Taitila': 'तैतिल',
    'Gara': 'गर',
    'Vanija': 'वणिज',
    'Vishti': 'विष्टि',
    'Shakuni': 'शकुनि',
    'Chatushpada': 'चतुष्पद',
    'Naga': 'नाग',
    'Kimstughna': 'किंस्तुघ्न'
  };
  return karanaMap[english] || 'बव';
};

const getHindiDay = (dayIndex: number): string => {
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  return days[dayIndex];
};

const getDayName = (dayIndex: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

const generatePanchang = (date: string) => {
  const dateObj = new Date(date);
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const tithis = ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'];
  const nakshatras = ['अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्व फाल्गुनी', 'उत्तर फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्व आषाढ़ा', 'उत्तर आषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्व भाद्रपदा', 'उत्तर भाद्रपदा', 'रेवती'];
  
  return {
    tithi_name_hindi: tithis[dayOfYear % 15],
    tithi_name_english: ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'][dayOfYear % 15],
    tithi_end_time: '18:45',
    nakshatra_name_hindi: nakshatras[dayOfYear % 27],
    nakshatra_name_english: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'][dayOfYear % 27],
    nakshatra_end_time: '14:30',
    yoga_name_hindi: 'शुभ',
    yoga_name_english: 'Shubha',
    yoga_end_time: '22:15',
    karana_name_hindi: 'बव',
    karana_name_english: 'Bava',
    karana_end_time: '12:00',
    paksha: dayOfYear % 30 < 15 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    vaar_hindi: getHindiDay(dateObj.getDay()),
    vaar_english: getDayName(dateObj.getDay()),
    sunrise: '06:45',
    sunset: '18:30',
    moonrise: '19:15',
    moonset: '06:30',
    rahu_kaal_start: ['16:30', '07:30', '15:00', '12:00', '13:30', '10:30', '09:00'][dateObj.getDay()],
    rahu_kaal_end: ['18:00', '09:00', '16:30', '13:30', '15:00', '12:00', '10:30'][dateObj.getDay()],
    yamagandam_start: '12:00',
    yamagandam_end: '13:30',
    gulik_kaal_start: '15:00',
    gulik_kaal_end: '16:30',
    abhijit_start: '11:45',
    abhijit_end: '12:30',
    choghadiya: [
      { time: '06:45 - 08:15', name: 'उद्वेग', english: 'Udveg', type: 'bad' },
      { time: '08:15 - 09:45', name: 'चर', english: 'Char', type: 'good' },
      { time: '09:45 - 11:15', name: 'लाभ', english: 'Labh', type: 'good' },
      { time: '11:15 - 12:45', name: 'अमृत', english: 'Amrit', type: 'best' },
      { time: '12:45 - 14:15', name: 'काल', english: 'Kaal', type: 'bad' },
      { time: '14:15 - 15:45', name: 'शुभ', english: 'Shubh', type: 'good' },
      { time: '15:45 - 17:15', name: 'रोग', english: 'Rog', type: 'bad' },
      { time: '17:15 - 18:45', name: 'उद्वेग', english: 'Udveg', type: 'bad' },
    ],
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

    const { date, latitude, longitude }: PanchangRequest = await req.json();
    const targetDate = date || new Date().toISOString().split('T')[0];

    // Check if we already have data for this date
    const { data: existingData } = await supabaseClient
      .from('panchangs')
      .select('*')
      .eq('date', targetDate)
      .single();

    if (existingData) {
      return new Response(JSON.stringify(existingData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch new panchang data
    const panchangData = await fetchPanchangFromAPI(targetDate, latitude, longitude);

    // Save to database
    const { data: savedData, error } = await supabaseClient
      .from('panchangs')
      .insert({
        date: targetDate,
        ...panchangData
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      ...savedData,
      message: panchangData.isRealData ? "Fetched from astrology API" : "Generated panchang data"
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