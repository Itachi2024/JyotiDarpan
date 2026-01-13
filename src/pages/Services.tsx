import { 
  Star, Heart, Calendar, FileText, Phone, MessageCircle, 
  Gem, BookOpen, Sparkles, Video, Home, Clock, ShoppingBag, IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  { icon: Star, title: 'राशिफल', english: 'Horoscope', description: 'Daily, weekly & monthly predictions', href: '/horoscope', color: 'from-purple-500 to-violet-500' },
  { icon: FileText, title: 'कुंडली', english: 'Kundli', description: 'Free birth chart analysis', href: '/kundli', color: 'from-orange-500 to-red-500' },
  { icon: Heart, title: 'कुंडली मिलान', english: 'Match Making', description: '36 Guna Milan for marriage', href: '/match-making', color: 'from-pink-500 to-rose-500' },
  { icon: Calendar, title: 'पंचांग', english: 'Panchang', description: 'Daily Tithi, Nakshatra & more', href: '/panchang', color: 'from-amber-500 to-yellow-500' },
  { icon: Clock, title: 'मुहूर्त', english: 'Muhurta', description: 'Find auspicious timings', href: '/contact', color: 'from-teal-500 to-green-500' },
  { icon: Phone, title: 'कॉल पर बात', english: 'Call Astrologer', description: 'Live voice consultation', href: '/contact', color: 'from-green-500 to-emerald-500' },
  { icon: MessageCircle, title: 'चैट', english: 'Chat', description: 'Text with astrologers', href: '/contact', color: 'from-blue-500 to-cyan-500' },
  { icon: Video, title: 'वीडियो कॉल', english: 'Video Call', description: 'Face-to-face consultation', href: '/contact', color: 'from-indigo-500 to-purple-500' },
  { icon: Gem, title: 'रत्न दुकान', english: 'Astro Shop', description: 'Gemstones, Rudraksha & Yantra', href: '/contact', color: 'from-teal-500 to-cyan-500' },
  { icon: BookOpen, title: 'उपाय', english: 'Remedies', description: 'Personalized solutions', href: '/contact', color: 'from-rose-500 to-pink-500' },
  { icon: Home, title: 'वास्तु', english: 'Vastu', description: 'Home & office guidance', href: '/contact', color: 'from-amber-500 to-orange-500' },
  { icon: ShoppingBag, title: 'पेमेंट', english: 'Add Money', description: 'Secure wallet recharge', href: '/payment', color: 'from-green-500 to-teal-500' },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">All Services</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-shimmer">सभी</span> सेवाएं
          </h1>
          <p className="text-muted-foreground">Complete astrology solutions for every aspect of your life</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service) => (
            <Link
              key={service.english}
              to={service.href}
              className="group card-spiritual p-5 lg:p-6 hover:shadow-elevated transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground font-hindi mb-1">{service.title}</h3>
              <p className="text-sm text-primary font-medium mb-2">{service.english}</p>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center justify-end">
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Contact Now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust and Security Section */}
        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Choose AstroRishabh?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-spiritual p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-semibold mb-2">Verified Astrologers</h3>
                <p className="text-sm text-muted-foreground">All our astrologers are verified and experienced professionals</p>
              </div>
              <div className="card-spiritual p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">100% secure UPI payments with instant confirmation</p>
              </div>
              <div className="card-spiritual p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="font-semibold mb-2">5+ Years Trusted</h3>
                <p className="text-sm text-muted-foreground">Trusted by 50,000+ satisfied customers across India</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
