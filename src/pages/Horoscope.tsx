import { useState, useEffect } from 'react';
import { ChevronRight, Star, Calendar, TrendingUp, Heart, Briefcase, Sparkles, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { RateChart } from '@/components/RateChart';
import { toast } from 'sonner';

const rashis = [
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

const horoscopeData = {
  overview: "आज का दिन आपके लिए शुभ है। करियर में नई संभावनाएं खुलेंगी और आर्थिक स्थिति मजबूत होगी। परिवार में खुशहाली का माहौल रहेगा।",
  overviewEn: "Today is auspicious for you. New opportunities will open in career and financial position will strengthen. There will be an atmosphere of happiness in the family.",
  love: { score: 85, text: "प्रेम संबंधों में मधुरता रहेगी। साथी के साथ समय बिताएं।" },
  career: { score: 90, text: "कार्यस्थल पर सम्मान मिलेगा। नई परियोजनाएं सफल होंगी।" },
  health: { score: 75, text: "स्वास्थ्य का ध्यान रखें। योग और ध्यान करें।" },
  finance: { score: 80, text: "आर्थिक लाभ होगा। निवेश के लिए उचित समय।" },
  luckyNumber: 7,
  luckyColor: "Saffron",
  luckyTime: "10:00 AM - 12:00 PM",
};

const Horoscope = () => {
  const [selectedRashi, setSelectedRashi] = useState(rashis[0]);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [horoscopeData, setHoroscopeData] = useState<any>({
    overview_hindi: 'आज का दिन आपके लिए शुभ है। करियर में नई संभावनाएं खुलेंगी।',
    overview_english: 'Today is auspicious for you. New opportunities will open in career.',
    love_score: 85,
    love_text: 'प्रेम संबंधों में मधुरता रहेगी।',
    career_score: 90,
    career_text: 'कार्यस्थल पर सम्मान मिलेगा।',
    health_score: 75,
    health_text: 'स्वास्थ्य का ध्यान रखें।',
    finance_score: 80,
    finance_text: 'आर्थिक लाभ होगा।',
    lucky_number: 7,
    lucky_color: 'Saffron',
    lucky_time: '10:00 AM - 12:00 PM',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Free Horoscope API integration
  const fetchHoroscope = async (sign: string, selectedPeriod: string = 'daily') => {
    setIsLoading(true);
    try {
      // Using Horoscope API - completely free
      const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${selectedPeriod}?sign=${sign.toLowerCase()}&day=today`);
      
      if (response.ok) {
        const data = await response.json();
        const horoscopeText = data.data.horoscope_data;
        
        setHoroscopeData({
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
        });
        toast.success('Horoscope loaded from API!');
      } else {
        throw new Error('API response not ok');
      }
    } catch (error: any) {
      console.error('Error fetching horoscope:', error);
      // Fallback to generated content
      setHoroscopeData(generateFallbackHoroscope(sign));
      toast.info('Using generated horoscope data');
    } finally {
      setIsLoading(false);
    }
  };

  const translateToHindi = (text: string): string => {
    // Simple keyword-based translation
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

  const generateFallbackHoroscope = (sign: string) => {
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
      'gemini': {
        overview_hindi: 'संवाद कौशल का फायदा उठाएं। यात्रा के योग हैं।',
        overview_english: 'Use your communication skills. Travel is indicated.',
        love_text: 'नए रिश्ते बन सकते हैं।',
        career_text: 'व्यापार में वृद्धि होगी।',
        health_text: 'तनाव से बचें।',
        finance_text: 'खर्च पर नियंत्रण रखें।'
      },
      'cancer': {
        overview_hindi: 'घर-परिवार को प्राथमिकता दें। भावनाओं को संभालें।',
        overview_english: 'Prioritize home and family. Handle emotions carefully.',
        love_text: 'प्रेम में गहराई आएगी।',
        career_text: 'धैर्य रखें, सफलता मिलेगी।',
        health_text: 'पाचन तंत्र का ध्यान रखें।',
        finance_text: 'बचत करने का समय।'
      },
      'leo': {
        overview_hindi: 'आत्मविश्वास बनाए रखें। नेतृत्व के अवसर मिलेंगे।',
        overview_english: 'Maintain confidence. Leadership opportunities will come.',
        love_text: 'गर्व न करें, विनम्र रहें।',
        career_text: 'बड़ी सफलता के संकेत।',
        health_text: 'हृदय स्वास्थ्य का ध्यान।',
        finance_text: 'बड़ा निवेश सोच-समझकर।'
      },
      'virgo': {
        overview_hindi: 'विस्तार पर ध्यान दें। सेवा भाव रखें।',
        overview_english: 'Pay attention to details. Maintain service attitude.',
        love_text: 'आलोचना से बचें।',
        career_text: 'कार्य की गुणवत्ता बढ़ाएं।',
        health_text: 'स्वास्थ्य उत्तम रहेगा।',
        finance_text: 'बजट बनाकर चलें।'
      },
      'libra': {
        overview_hindi: 'संतुलन बनाए रखें। कलात्मक कार्यों में रुचि।',
        overview_english: 'Maintain balance. Interest in artistic works.',
        love_text: 'रोमांस का समय।',
        career_text: 'साझेदारी में फायदा।',
        health_text: 'तनाव कम करें।',
        finance_text: 'सुंदरता पर खर्च।'
      },
      'scorpio': {
        overview_hindi: 'गहराई से सोचें। रहस्यों से दूर रहें।',
        overview_english: 'Think deeply. Stay away from mysteries.',
        love_text: 'जुनून को नियंत्रित करें।',
        career_text: 'छुपे हुए अवसर मिलेंगे।',
        health_text: 'पानी अधिक पिएं।',
        finance_text: 'गुप्त आय के स्रोत।'
      },
      'sagittarius': {
        overview_hindi: 'दूरदर्शिता दिखाएं। शिक्षा में रुचि बढ़ेगी।',
        overview_english: 'Show foresight. Interest in education will increase.',
        love_text: 'विदेशी संपर्क संभव।',
        career_text: 'उच्च शिक्षा के अवसर।',
        health_text: 'व्यायाम जरूरी।',
        finance_text: 'लंबी अवधि का निवेश।'
      },
      'capricorn': {
        overview_hindi: 'अनुशासन बनाए रखें। कड़ी मेहनत का फल मिलेगा।',
        overview_english: 'Maintain discipline. Hard work will pay off.',
        love_text: 'धैर्य रखें प्रेम में।',
        career_text: 'प्रमोशन के योग।',
        health_text: 'हड्डियों का ख्याल।',
        finance_text: 'संपत्ति में वृद्धि।'
      },
      'aquarius': {
        overview_hindi: 'नवाचार करें। मित्रों का साथ मिलेगा।',
        overview_english: 'Innovate. Friends will support you.',
        love_text: 'दोस्ती प्रेम में बदल सकती है।',
        career_text: 'तकनीकी क्षेत्र में फायदा।',
        health_text: 'पैरों का ध्यान रखें।',
        finance_text: 'नई तकनीक में निवेश।'
      },
      'pisces': {
        overview_hindi: 'कल्पनाशीलता का प्रयोग करें। आध्यात्म में रुचि।',
        overview_english: 'Use imagination. Interest in spirituality.',
        love_text: 'भावनात्मक जुड़ाव गहरा होगा।',
        career_text: 'कलात्मक कार्यों में सफलता।',
        health_text: 'नींद पूरी लें।',
        finance_text: 'दान-पुण्य करें।'
      }
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

  useEffect(() => {
    // Load initial data on component mount
    fetchHoroscope(selectedRashi.english, period);
  }, []);

  useEffect(() => {
    // Fetch new data when rashi or period changes
    fetchHoroscope(selectedRashi.english, period);
  }, [selectedRashi, period]);

  const handleRashiChange = (rashi: typeof rashis[0]) => {
    setSelectedRashi(rashi);
  };

  const handlePeriodChange = (newPeriod: 'daily' | 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Rashifal</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">आज का</span> राशिफल
          </h1>
          <p className="text-muted-foreground">Today's Horoscope • Select your zodiac sign</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handlePeriodChange(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                period === tab
                  ? 'bg-gradient-saffron text-white shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              {tab === 'daily' ? 'दैनिक / Daily' : tab === 'weekly' ? 'साप्ताहिक / Weekly' : 'मासिक / Monthly'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Rashi Selector Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-spiritual p-4 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">राशि चुनें / Select Sign</h3>
              <div className="space-y-2">
                {rashis.map((rashi) => (
                  <button
                    key={rashi.english}
                    onClick={() => handleRashiChange(rashi)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      selectedRashi.english === rashi.english
                        ? 'bg-gradient-saffron text-white'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="text-2xl">{rashi.symbol}</span>
                    <div className="text-left">
                      <p className="font-medium font-hindi">{rashi.name}</p>
                      <p className="text-xs opacity-80">{rashi.english}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Rate Chart */}
            <RateChart 
              title="Horoscope Services"
              showAll={false}
              filterServices={['Daily Horoscope', 'Personal Consultation']}
            />
          </div>

          {/* Horoscope Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Selected Rashi Header */}
            <div className="card-spiritual p-6 lg:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-saffron flex items-center justify-center text-4xl text-white shadow-soft">
                  {selectedRashi.symbol}
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-hindi">
                    {selectedRashi.name} राशिफल
                  </h2>
                  <p className="text-muted-foreground">{selectedRashi.english} Horoscope</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                      {selectedRashi.element}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-foreground text-xs">
                      Ruler: {selectedRashi.ruler}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* Overview */}
              <div className="p-4 rounded-xl bg-muted/50 mb-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="ml-2">Loading horoscope...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground font-hindi leading-relaxed mb-2">
                      {horoscopeData?.overview_hindi || horoscopeData?.overview}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {horoscopeData?.overview_english || horoscopeData?.overviewEn}
                    </p>
                  </>
                )}
              </div>

              {/* Lucky Items */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-primary/10">
                  <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Lucky Number</p>
                  <p className="text-xl font-bold text-primary">
                    {horoscopeData?.lucky_number || horoscopeData?.luckyNumber || 7}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-accent/20">
                  <div className="w-5 h-5 rounded-full bg-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Lucky Color</p>
                  <p className="text-sm font-bold text-foreground">
                    {horoscopeData?.lucky_color || horoscopeData?.luckyColor || 'Saffron'}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/20">
                  <Calendar className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Lucky Time</p>
                  <p className="text-sm font-bold text-foreground">
                    {horoscopeData?.lucky_time || horoscopeData?.luckyTime || '10:00 AM - 12:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Predictions */}
            <div className="grid md:grid-cols-2 gap-4">
              {!isLoading && horoscopeData && (
                <>
                  {/* Love */}
                  <div className="card-spiritual p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <h3 className="font-semibold">प्रेम / Love</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-pink-500">{horoscopeData?.love_score || 85}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted mb-3">
                      <div className="h-full rounded-full bg-pink-500" style={{ width: `${horoscopeData?.love_score || 85}%` }} />
                    </div>
                    <p className="text-sm text-muted-foreground font-hindi">{horoscopeData?.love_text || 'प्रेम संबंधों में मधुरता रहेगी।'}</p>
                  </div>

                  {/* Career */}
                  <div className="card-spiritual p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-500" />
                        <h3 className="font-semibold">करियर / Career</h3>
                      </div>
                      <span className="text-lg font-bold text-blue-500">{horoscopeData?.career_score || 90}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted mb-3">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${horoscopeData?.career_score || 90}%` }} />
                    </div>
                    <p className="text-sm text-muted-foreground font-hindi">{horoscopeData?.career_text || 'कार्यस्थल पर सम्मान मिलेगा।'}</p>
                  </div>

                  {/* Health */}
                  <div className="card-spiritual p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold">स्वास्थ्य / Health</h3>
                      </div>
                      <span className="text-lg font-bold text-green-500">{horoscopeData?.health_score || 75}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted mb-3">
                      <div className="h-full rounded-full bg-green-500" style={{ width: `${horoscopeData?.health_score || 75}%` }} />
                    </div>
                    <p className="text-sm text-muted-foreground font-hindi">{horoscopeData?.health_text || 'स्वास्थ्य का ध्यान रखें।'}</p>
                  </div>

                  {/* Finance */}
                  <div className="card-spiritual p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        <h3 className="font-semibold">धन / Finance</h3>
                      </div>
                      <span className="text-lg font-bold text-amber-500">{horoscopeData?.finance_score || 80}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted mb-3">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${horoscopeData?.finance_score || 80}%` }} />
                    </div>
                    <p className="text-sm text-muted-foreground font-hindi">{horoscopeData?.finance_text || 'आर्थिक लाभ होगा।'}</p>
                  </div>
                </>
              )}

              {isLoading && (
                <div className="col-span-2 flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2">Loading detailed predictions...</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="card-spiritual p-6 bg-gradient-saffron text-white text-center">
              <h3 className="text-xl font-bold mb-2">विस्तृत राशिफल चाहिए?</h3>
              <p className="text-white/80 mb-4">Get detailed personalized horoscope from expert astrologers</p>
              <Button variant="gold" size="lg">
                Talk to Astrologer
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Horoscope;
