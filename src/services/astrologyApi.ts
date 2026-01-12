// Free Astrology API Services

export interface HoroscopeData {
  overview_hindi: string;
  overview_english: string;
  love_score: number;
  love_text: string;
  career_score: number;
  career_text: string;
  health_score: number;
  health_text: string;
  finance_score: number;
  finance_text: string;
  lucky_number: number;
  lucky_color: string;
  lucky_time: string;
}

export interface PanchangData {
  date: string;
  tithi: { hindi: string; english: string; end?: string };
  nakshatra: { hindi: string; english: string; end?: string };
  yoga: { hindi: string; english: string; end?: string };
  karana: { hindi: string; english: string; end?: string };
  paksha: string;
  vaar: { hindi: string; english: string };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKaal: { start: string; end: string };
  yamagandam: { start: string; end: string };
  gulikKaal: { start: string; end: string };
  abhijitMuhurat: { start: string; end: string };
  choghadiya: Array<{
    time: string;
    name: string;
    english: string;
    type: 'best' | 'good' | 'bad';
  }>;
}

// Free Horoscope API
export const fetchHoroscope = async (sign: string, period: string = 'daily'): Promise<HoroscopeData> => {
  try {
    // Using free horoscope API
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${sign.toLowerCase()}&day=today`);
    
    if (response.ok) {
      const data = await response.json();
      const horoscopeText = data.data.horoscope_data;
      
      return {
        overview_hindi: translateToHindi(horoscopeText),
        overview_english: horoscopeText,
        love_score: Math.floor(Math.random() * 30) + 70,
        love_text: 'प्रेम संबंधों में मधुरता रहेगी। साथी के साथ समय बिताएं।',
        career_score: Math.floor(Math.random() * 30) + 70,
        career_text: 'कार्यस्थल पर सम्मान मिलेगा। नई परियोजनाएं सफल होंगी।',
        health_score: Math.floor(Math.random() * 30) + 70,
        health_text: 'स्वास्थ्य का ध्यान रखें। योग और ध्यान करें।',
        finance_score: Math.floor(Math.random() * 30) + 70,
        finance_text: 'आर्थिक लाभ होगा। निवेश के लिए उचित समय।',
        lucky_number: Math.floor(Math.random() * 12) + 1,
        lucky_color: getLuckyColor(sign),
        lucky_time: getLuckyTime(),
      };
    }
  } catch (error) {
    console.error('Horoscope API error:', error);
  }
  
  // Fallback to generated data
  return generateFallbackHoroscope(sign);
};

// Free Panchang API
export const fetchPanchang = async (date: Date): Promise<PanchangData> => {
  try {
    // Try multiple free APIs
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // API 1: Try Hindu Calendar API (demo key)
    try {
      const response = await fetch(`https://api.vedicastroapi.com/v3-json/panchang/panchang?dob=${day}/${month}/${year}&tob=12:00&lat=28.6139&lon=77.2090&tz=5.5&api_key=demo`);
      if (response.ok) {
        const data = await response.json();
        // Transform API response to our format
        return transformPanchangData(data, date);
      }
    } catch (error) {
      console.log('Panchang API failed, using fallback');
    }
  } catch (error) {
    console.error('Panchang API error:', error);
  }
  
  // Fallback to generated data
  return generatePanchangData(date);
};

// Helper functions
const translateToHindi = (text: string): string => {
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
    'fortune': 'भाग्य',
    'work': 'काम',
    'relationship': 'रिश्ता'
  };

  let hindiText = text;
  Object.entries(translations).forEach(([eng, hindi]) => {
    hindiText = hindiText.replace(new RegExp(eng, 'gi'), hindi);
  });

  return `आज का दिन आपके लिए शुभ है। ${hindiText.substring(0, 100)}...`;
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

const generateFallbackHoroscope = (sign: string): HoroscopeData => {
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
    // Add more signs as needed...
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
  };
};

const transformPanchangData = (apiData: any, date: Date): PanchangData => {
  // Transform API response to our format
  return {
    date: date.toISOString().split('T')[0],
    tithi: {
      hindi: apiData.tithi?.name_hi || 'पूर्णिमा',
      english: apiData.tithi?.name || 'Purnima',
      end: apiData.tithi?.end_time || '18:45'
    },
    nakshatra: {
      hindi: apiData.nakshatra?.name_hi || 'पुष्य',
      english: apiData.nakshatra?.name || 'Pushya',
      end: apiData.nakshatra?.end_time || '14:30'
    },
    yoga: {
      hindi: apiData.yoga?.name_hi || 'शुभ',
      english: apiData.yoga?.name || 'Shubha',
      end: apiData.yoga?.end_time || '22:15'
    },
    karana: {
      hindi: apiData.karana?.name_hi || 'बव',
      english: apiData.karana?.name || 'Bava',
      end: apiData.karana?.end_time || '12:00'
    },
    paksha: apiData.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    vaar: {
      hindi: getHindiDay(date.getDay()),
      english: getDayName(date.getDay())
    },
    sunrise: apiData.sunrise || '06:45',
    sunset: apiData.sunset || '18:30',
    moonrise: apiData.moonrise || '19:15',
    moonset: apiData.moonset || '06:30',
    rahuKaal: {
      start: apiData.rahu_kaal?.start || '16:30',
      end: apiData.rahu_kaal?.end || '18:00'
    },
    yamagandam: {
      start: apiData.yamagandam?.start || '12:00',
      end: apiData.yamagandam?.end || '13:30'
    },
    gulikKaal: {
      start: apiData.gulik_kaal?.start || '15:00',
      end: apiData.gulik_kaal?.end || '16:30'
    },
    abhijitMuhurat: {
      start: apiData.abhijit?.start || '11:45',
      end: apiData.abhijit?.end || '12:30'
    },
    choghadiya: generateChoghadiya()
  };
};

const generatePanchangData = (date: Date): PanchangData => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const tithis = [
    { hindi: 'प्रतिपदा', english: 'Pratipada' },
    { hindi: 'द्वितीया', english: 'Dwitiya' },
    { hindi: 'तृतीया', english: 'Tritiya' },
    { hindi: 'चतुर्थी', english: 'Chaturthi' },
    { hindi: 'पंचमी', english: 'Panchami' },
    { hindi: 'षष्ठी', english: 'Shashthi' },
    { hindi: 'सप्तमी', english: 'Saptami' },
    { hindi: 'अष्टमी', english: 'Ashtami' },
    { hindi: 'नवमी', english: 'Navami' },
    { hindi: 'दशमी', english: 'Dashami' },
    { hindi: 'एकादशी', english: 'Ekadashi' },
    { hindi: 'द्वादशी', english: 'Dwadashi' },
    { hindi: 'त्रयोदशी', english: 'Trayodashi' },
    { hindi: 'चतुर्दशी', english: 'Chaturdashi' },
    { hindi: 'पूर्णिमा', english: 'Purnima' }
  ];

  const nakshatras = [
    { hindi: 'अश्विनी', english: 'Ashwini' },
    { hindi: 'भरणी', english: 'Bharani' },
    { hindi: 'कृत्तिका', english: 'Krittika' },
    { hindi: 'रोहिणी', english: 'Rohini' },
    { hindi: 'मृगशिरा', english: 'Mrigashira' },
    { hindi: 'आर्द्रा', english: 'Ardra' },
    { hindi: 'पुनर्वसु', english: 'Punarvasu' },
    { hindi: 'पुष्य', english: 'Pushya' },
    { hindi: 'आश्लेषा', english: 'Ashlesha' },
    { hindi: 'मघा', english: 'Magha' },
    { hindi: 'पूर्व फाल्गुनी', english: 'Purva Phalguni' },
    { hindi: 'उत्तर फाल्गुनी', english: 'Uttara Phalguni' },
    { hindi: 'हस्त', english: 'Hasta' },
    { hindi: 'चित्रा', english: 'Chitra' },
    { hindi: 'स्वाति', english: 'Swati' },
    { hindi: 'विशाखा', english: 'Vishakha' },
    { hindi: 'अनुराधा', english: 'Anuradha' },
    { hindi: 'ज्येष्ठा', english: 'Jyeshtha' },
    { hindi: 'मूल', english: 'Mula' },
    { hindi: 'पूर्व आषाढ़ा', english: 'Purva Ashadha' },
    { hindi: 'उत्तर आषाढ़ा', english: 'Uttara Ashadha' },
    { hindi: 'श्रवण', english: 'Shravana' },
    { hindi: 'धनिष्ठा', english: 'Dhanishta' },
    { hindi: 'शतभिषा', english: 'Shatabhisha' },
    { hindi: 'पूर्व भाद्रपदा', english: 'Purva Bhadrapada' },
    { hindi: 'उत्तर भाद्रपदा', english: 'Uttara Bhadrapada' },
    { hindi: 'रेवती', english: 'Revati' }
  ];

  const rahuKaalTimes = [
    { start: '16:30', end: '18:00' }, // Sunday
    { start: '07:30', end: '09:00' }, // Monday
    { start: '15:00', end: '16:30' }, // Tuesday
    { start: '12:00', end: '13:30' }, // Wednesday
    { start: '13:30', end: '15:00' }, // Thursday
    { start: '10:30', end: '12:00' }, // Friday
    { start: '09:00', end: '10:30' }  // Saturday
  ];

  return {
    date: date.toISOString().split('T')[0],
    tithi: tithis[dayOfYear % 15],
    nakshatra: nakshatras[dayOfYear % 27],
    yoga: { hindi: 'शुभ', english: 'Shubha', end: '22:15' },
    karana: { hindi: 'बव', english: 'Bava', end: '12:00' },
    paksha: dayOfYear % 30 < 15 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    vaar: {
      hindi: getHindiDay(date.getDay()),
      english: getDayName(date.getDay())
    },
    sunrise: '06:45',
    sunset: '18:30',
    moonrise: '19:15',
    moonset: '06:30',
    rahuKaal: rahuKaalTimes[date.getDay()],
    yamagandam: { start: '12:00', end: '13:30' },
    gulikKaal: { start: '15:00', end: '16:30' },
    abhijitMuhurat: { start: '11:45', end: '12:30' },
    choghadiya: generateChoghadiya()
  };
};

const getHindiDay = (dayIndex: number): string => {
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  return days[dayIndex];
};

const getDayName = (dayIndex: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

const generateChoghadiya = () => [
  { time: '06:45 - 08:15', name: 'उद्वेग', english: 'Udveg', type: 'bad' as const },
  { time: '08:15 - 09:45', name: 'चर', english: 'Char', type: 'good' as const },
  { time: '09:45 - 11:15', name: 'लाभ', english: 'Labh', type: 'good' as const },
  { time: '11:15 - 12:45', name: 'अमृत', english: 'Amrit', type: 'best' as const },
  { time: '12:45 - 14:15', name: 'काल', english: 'Kaal', type: 'bad' as const },
  { time: '14:15 - 15:45', name: 'शुभ', english: 'Shubh', type: 'good' as const },
  { time: '15:45 - 17:15', name: 'रोग', english: 'Rog', type: 'bad' as const },
  { time: '17:15 - 18:45', name: 'उद्वेग', english: 'Udveg', type: 'bad' as const },
];