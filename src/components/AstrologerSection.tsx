import { Star, Phone, MessageCircle, Video, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const astrologers = [
  {
    name: 'पंडित ऋषभ दाधीच',
    english: 'Pt. Rishabh Dadhich',
    specialty: 'Vedic Astrology, Kundli',
    experience: '5+ years',
    rating: 4.9,
    reviews: 2340,
    price: 25,
    status: 'online',
    languages: ['Hindi', 'English'],
    verified: true,
  },
  {
    name: 'पंडित अशोक दाधीच',
    english: 'Pandit Ashok Dadhich',
    specialty: 'Numerology, Vastu',
    experience: '20+ years',
    rating: 4.8,
    reviews: 3120,
    price: 35,
    status: 'online',
    languages: ['Hindi', 'Sanskrit'],
    verified: true,
  },
  {
    name: 'ज्योतिषी सुनीता  ',
    english: 'Jyotishi Sunita Dadhich',
    specialty: 'Kundali, Remedies',
    experience: '10+ years',
    rating: 4.7,
    reviews: 1890,
    price: 20,
    status: 'busy',
    languages: ['Hindi', 'English', 'Marathi'],
    verified: true,
  },
  {
    name: 'पंडित महेश दाधीच ',
    english: 'Pandit Mahesh Dadhich',
    specialty: 'Muhrat, Marriage',
    experience: '12+ years',
    rating: 4.9,
    reviews: 2560,
    price: 30,
    status: 'online',
    languages: ['Hindi', 'English'],
    verified: true,
  },
];

const AstrologerSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
              <span className="text-shimmer">अनुभवी</span> ज्योतिषियों से बात करें
            </h2>
            <p className="text-muted-foreground">
              Talk to experienced astrologers • 24/7 available
            </p>
          </div>
          <Button variant="spiritual">
            View All Astrologers →
          </Button>
        </div>

        {/* Astrologer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {astrologers.map((astrologer, index) => (
            <div
              key={astrologer.english}
              className="astrologer-card p-4 lg:p-5 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with Avatar & Status */}
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-saffron flex items-center justify-center text-white text-xl font-bold">
                    {astrologer.name.charAt(0)}
                  </div>
                  {/* Online Status */}
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${
                    astrologer.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
                  }`}>
                    {astrologer.status === 'online' ? (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <Clock className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm lg:text-base font-semibold text-foreground truncate font-hindi">
                      {astrologer.name}
                    </h3>
                    {astrologer.verified && (
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{astrologer.english}</p>
                  <p className="text-xs text-primary mt-1">{astrologer.specialty}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-medium">{astrologer.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {astrologer.reviews.toLocaleString()} reviews
                </span>
              </div>

              {/* Experience & Languages */}
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                  {astrologer.experience}
                </span>
                {astrologer.languages.slice(0, 2).map((lang) => (
                  <span key={lang} className="px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <span className="text-lg font-bold text-primary">₹{astrologer.price}</span>
                  <span className="text-xs text-muted-foreground">/min</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-6 lg:p-8 rounded-2xl bg-gradient-saffron text-white relative overflow-hidden">
          <div className="absolute inset-0 mandala-pattern opacity-20" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">
                पहली बात मुफ्त! 🎉
              </h3>
              <p className="text-white/80">
                First 5 minutes FREE for new users • Register now
              </p>
            </div>
            <Button variant="gold" size="lg" className="shadow-lg">
              Start Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstrologerSection;
