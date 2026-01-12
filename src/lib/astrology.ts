// Astrology utility functions

export const zodiacSigns = [
  { name: 'मेष', english: 'Aries', symbol: '♈', element: 'Fire', ruler: 'Mars' },
  { name: 'वृषभ', english: 'Taurus', symbol: '♉', element: 'Earth', ruler: 'Venus' },
  { name: 'मिथुन', english: 'Gemini', symbol: '♊', element: 'Air', ruler: 'Mercury' },
  { name: 'कर्क', english: 'Cancer', symbol: '♋', element: 'Water', ruler: 'Moon' },
  { name: 'सिंह', english: 'Leo', symbol: '♌', element: 'Fire', ruler: 'Sun' },
  { name: 'कन्या', english: 'Virgo', symbol: '♍', element: 'Earth', ruler: 'Mercury' },
  { name: 'तुला', english: 'Libra', symbol: '♎', element: 'Air', ruler: 'Venus' },
  { name: 'वृश्चिक', english: 'Scorpio', symbol: '♏', element: 'Water', ruler: 'Mars' },
  { name: 'धनु', english: 'Sagittarius', symbol: '♐', element: 'Fire', ruler: 'Jupiter' },
  { name: 'मकर', english: 'Capricorn', symbol: '♑', element: 'Earth', ruler: 'Saturn' },
  { name: 'कुंभ', english: 'Aquarius', symbol: '♒', element: 'Air', ruler: 'Saturn' },
  { name: 'मीन', english: 'Pisces', symbol: '♓', element: 'Water', ruler: 'Jupiter' },
];

export const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const planets = [
  { name: 'Sun', hindi: 'सूर्य', symbol: '☉' },
  { name: 'Moon', hindi: 'चंद्र', symbol: '☽' },
  { name: 'Mars', hindi: 'मंगल', symbol: '♂' },
  { name: 'Mercury', hindi: 'बुध', symbol: '☿' },
  { name: 'Jupiter', hindi: 'गुरु', symbol: '♃' },
  { name: 'Venus', hindi: 'शुक्र', symbol: '♀' },
  { name: 'Saturn', hindi: 'शनि', symbol: '♄' },
  { name: 'Rahu', hindi: 'राहु', symbol: '☊' },
  { name: 'Ketu', hindi: 'केतु', symbol: '☋' },
];

export const getZodiacSign = (date: Date): typeof zodiacSigns[0] => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]; // Aquarius
  return zodiacSigns[11]; // Pisces
};

export const formatDegree = (degree: number): string => {
  const deg = Math.floor(degree);
  const min = Math.floor((degree - deg) * 60);
  return `${deg}°${min}'`;
};

export const getHouseSignificance = (house: number): string => {
  const significances = [
    'Self, Personality, Appearance',
    'Wealth, Family, Speech',
    'Siblings, Communication, Short Journeys',
    'Home, Mother, Emotions',
    'Children, Education, Creativity',
    'Health, Service, Daily Routine',
    'Marriage, Partnership, Business',
    'Transformation, Occult, Longevity',
    'Higher Learning, Philosophy, Long Journeys',
    'Career, Reputation, Father',
    'Gains, Friends, Aspirations',
    'Losses, Spirituality, Foreign Lands'
  ];
  return significances[house - 1] || '';
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const isAuspiciousTime = (time: string): boolean => {
  // Simple logic for demo - in real app, use proper muhurat calculations
  const hour = parseInt(time.split(':')[0]);
  const auspiciousHours = [6, 7, 8, 9, 10, 11, 16, 17, 18, 19];
  return auspiciousHours.includes(hour);
};

export const getTithiType = (tithi: string): 'shukla' | 'krishna' => {
  const shuklaTithis = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 
                       'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 
                       'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'];
  return shuklaTithis.includes(tithi) ? 'shukla' : 'krishna';
};

export const getCompatibilityScore = (sign1: string, sign2: string): number => {
  // Simplified compatibility matrix
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'Aries': { 'Leo': 90, 'Sagittarius': 85, 'Gemini': 75, 'Aquarius': 70 },
    'Taurus': { 'Virgo': 90, 'Capricorn': 85, 'Cancer': 80, 'Pisces': 75 },
    'Gemini': { 'Libra': 90, 'Aquarius': 85, 'Aries': 75, 'Leo': 70 },
    'Cancer': { 'Scorpio': 90, 'Pisces': 85, 'Taurus': 80, 'Virgo': 75 },
    'Leo': { 'Aries': 90, 'Sagittarius': 85, 'Gemini': 70, 'Libra': 75 },
    'Virgo': { 'Taurus': 90, 'Capricorn': 85, 'Cancer': 75, 'Scorpio': 70 },
    'Libra': { 'Gemini': 90, 'Aquarius': 85, 'Leo': 75, 'Sagittarius': 70 },
    'Scorpio': { 'Cancer': 90, 'Pisces': 85, 'Virgo': 70, 'Capricorn': 75 },
    'Sagittarius': { 'Aries': 85, 'Leo': 85, 'Libra': 70, 'Aquarius': 75 },
    'Capricorn': { 'Taurus': 85, 'Virgo': 85, 'Scorpio': 75, 'Pisces': 70 },
    'Aquarius': { 'Gemini': 85, 'Libra': 85, 'Aries': 70, 'Sagittarius': 75 },
    'Pisces': { 'Cancer': 85, 'Scorpio': 85, 'Taurus': 75, 'Capricorn': 70 }
  };

  return compatibilityMatrix[sign1]?.[sign2] || 50;
};