import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const rashis = [
  { name: 'मेष', english: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', color: 'from-red-500 to-orange-500' },
  { name: 'वृषभ', english: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', color: 'from-green-500 to-emerald-500' },
  { name: 'मिथुन', english: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', color: 'from-yellow-500 to-amber-500' },
  { name: 'कर्क', english: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', color: 'from-blue-400 to-cyan-500' },
  { name: 'सिंह', english: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', color: 'from-orange-500 to-red-500' },
  { name: 'कन्या', english: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', color: 'from-teal-500 to-green-500' },
  { name: 'तुला', english: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', color: 'from-pink-500 to-rose-500' },
  { name: 'वृश्चिक', english: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', color: 'from-purple-600 to-indigo-600' },
  { name: 'धनु', english: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', color: 'from-violet-500 to-purple-500' },
  { name: 'मकर', english: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', color: 'from-slate-600 to-gray-600' },
  { name: 'कुंभ', english: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', color: 'from-sky-500 to-blue-500' },
  { name: 'मीन', english: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', color: 'from-indigo-500 to-blue-600' },
];

const RashiSection = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
            <span className="text-shimmer">आज का</span> राशिफल
          </h2>
          <p className="text-muted-foreground">Today's Horoscope • अपनी राशि चुनें</p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-saffron text-white shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              {tab === 'daily' ? 'दैनिक / Daily' : tab === 'weekly' ? 'साप्ताहिक / Weekly' : 'मासिक / Monthly'}
            </button>
          ))}
        </div>

        {/* Rashi Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {rashis.map((rashi, index) => (
            <div
              key={rashi.english}
              className="rashi-card group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Symbol with gradient background */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${rashi.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <span className="text-2xl text-white">{rashi.symbol}</span>
                </div>
                
                {/* Names */}
                <h3 className="text-base font-semibold text-foreground font-hindi">{rashi.name}</h3>
                <p className="text-xs text-muted-foreground">{rashi.english}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{rashi.dates}</p>
              </div>
              
              {/* Hover Arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="spiritual" size="lg">
            View Detailed Horoscope
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RashiSection;
