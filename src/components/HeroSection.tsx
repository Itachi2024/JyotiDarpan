import { Star, Sparkles, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import heroBg from '@/assets/hero-bg.jpg';



const HeroSection = () => {
  const navigate = useNavigate();
  const todayDate = new Date().toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-card/95 via-background/90 to-muted" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-accent/20 blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Hindi Date Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
              <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary font-hindi">{todayDate}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
              <span className="text-shimmer">ज्योतिष</span> से जानें
              <br />
              <span className="text-primary">अपना भविष्य</span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-8 px-2 sm:px-0">
              भारत के विश्वसनीय ज्योतिषियों से पाएं सटीक राशिफल, कुंडली विश्लेषण, और जीवन के हर पहलू पर मार्गदर्शन।
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 -mt-2 sm:-mt-4 px-2 sm:px-0">
              Get accurate horoscope, Kundli analysis, and guidance on every aspect of life from India's trusted astrologers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <Button variant="hero" size="lg" className="w-full sm:w-auto text-sm sm:text-base" onClick={() => navigate("/astrologers")}>
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                ज्योतिषी से बात करें
              </Button>
              <Button variant="spiritual" size="lg" className="w-full sm:w-auto text-sm sm:text-base" onClick={() => navigate("/Kundli")}>
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                Free Kundli
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-saffron border-2 border-card flex items-center justify-center"
                    >
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">500+ Astrologers</span>
              </div>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-1">
                <Star className="w-3 sm:w-4 h-3 sm:h-4 text-accent fill-accent" />
                <span className="text-xs sm:text-sm font-medium">4.8</span>
                <span className="text-xs sm:text-sm text-muted-foreground">(50K+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Content - Panchang Widget */}
          <div className="relative animate-fade-in-up mt-6 lg:mt-0" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-elevated">
              {/* Panchang Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">आज का पंचांग</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Today's Panchang</p>
                </div>
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-gold flex items-center justify-center animate-glow-pulse">
                  <span className="text-xl sm:text-2xl">🕉️</span>
                </div>
              </div>

              {/* Panchang Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <PanchangItem label="तिथि" value="पूर्णिमा" english="Purnima" />
                  <PanchangItem label="नक्षत्र" value="पुष्य" english="Pushya" />
                  <PanchangItem label="योग" value="शुभ" english="Shubh" />
                  <PanchangItem label="करण" value="बव" english="Bava" />
                </div>

                <div className="h-px bg-border my-3 sm:my-4" />

                {/* Rahu Kaal */}
                <div className="p-3 sm:p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-destructive">राहु काल</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Rahu Kaal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-destructive">10:30 - 12:00</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Avoid important work</p>
                    </div>
                  </div>
                </div>

                {/* Shubh Muhurat */}
                <div className="p-3 sm:p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-primary">शुभ मुहूर्त</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Auspicious Time</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-primary">06:15 - 07:45</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Best for new beginnings</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-3 sm:mt-4 text-primary text-sm sm:text-base">
                View Full Panchang →
              </Button>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-accent/20 blur-2xl animate-float" />
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-primary/20 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

const PanchangItem = ({ label, value, english }: { label: string; value: string; english: string }) => (
  <div className="p-2 sm:p-3 rounded-xl bg-muted/50">
    <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-foreground font-hindi">{value}</p>
    <p className="text-[10px] sm:text-xs text-muted-foreground">{english}</p>
  </div>
);

export default HeroSection;
