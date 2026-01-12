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
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Hindi Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary font-hindi">{todayDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4">
              <span className="text-shimmer">ज्योतिष</span> से जानें
              <br />
              <span className="text-primary">अपना भविष्य</span>
            </h1>
            
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              भारत के विश्वसनीय ज्योतिषियों से पाएं सटीक राशिफल, कुंडली विश्लेषण, और जीवन के हर पहलू पर मार्गदर्शन।
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 -mt-4">
              Get accurate horoscope, Kundli analysis, and guidance on every aspect of life from India's trusted astrologers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={() => navigate("/astrologers")}>
                <Phone className="w-5 h-5" />
                ज्योतिषी से बात करें
              </Button>
              <Button variant="spiritual" size="xl" onClick={() => navigate("/Kundli")}>
                <Sparkles className="w-5 h-5" />
                Free Kundli
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-saffron border-2 border-card flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">500+ Astrologers</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">(50K+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Content - Panchang Widget */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10 p-6 lg:p-8 rounded-3xl bg-card border border-border shadow-elevated">
              {/* Panchang Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">आज का पंचांग</h3>
                  <p className="text-sm text-muted-foreground">Today's Panchang</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center animate-glow-pulse">
                  <span className="text-2xl">🕉️</span>
                </div>
              </div>

              {/* Panchang Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <PanchangItem label="तिथि" value="पूर्णिमा" english="Purnima" />
                  <PanchangItem label="नक्षत्र" value="पुष्य" english="Pushya" />
                  <PanchangItem label="योग" value="शुभ" english="Shubh" />
                  <PanchangItem label="करण" value="बव" english="Bava" />
                </div>

                <div className="h-px bg-border my-4" />

                {/* Rahu Kaal */}
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-destructive">राहु काल</p>
                      <p className="text-xs text-muted-foreground">Rahu Kaal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-destructive">10:30 - 12:00</p>
                      <p className="text-xs text-muted-foreground">Avoid important work</p>
                    </div>
                  </div>
                </div>

                {/* Shubh Muhurat */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary">शुभ मुहूर्त</p>
                      <p className="text-xs text-muted-foreground">Auspicious Time</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">06:15 - 07:45</p>
                      <p className="text-xs text-muted-foreground">Best for new beginnings</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-4 text-primary">
                View Full Panchang →
              </Button>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent/20 blur-2xl animate-float" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

const PanchangItem = ({ label, value, english }: { label: string; value: string; english: string }) => (
  <div className="p-3 rounded-xl bg-muted/50">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-base font-semibold text-foreground font-hindi">{value}</p>
    <p className="text-xs text-muted-foreground">{english}</p>
  </div>
);

export default HeroSection;
