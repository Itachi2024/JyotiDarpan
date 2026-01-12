import { 
  Star, Heart, Calendar, FileText, Phone, MessageCircle, 
  Gem, BookOpen, Sparkles, Video, Bot, Home, Clock, ShoppingBag, IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RateChart } from '@/components/RateChart';

const services = [
  { icon: Star, title: 'राशिफल', english: 'Horoscope', description: 'Daily, weekly & monthly predictions', price: 'Free', href: '/horoscope', color: 'from-purple-500 to-violet-500' },
  { icon: FileText, title: 'कुंडली', english: 'Kundli', description: 'Free birth chart analysis', price: 'Free', href: '/kundli', color: 'from-orange-500 to-red-500' },
  { icon: Heart, title: 'कुंडली मिलान', english: 'Match Making', description: '36 Guna Milan for marriage', price: 'Free', href: '/match-making', color: 'from-pink-500 to-rose-500' },
  { icon: Calendar, title: 'पंचांग', english: 'Panchang', description: 'Daily Tithi, Nakshatra & more', price: 'Free', href: '/panchang', color: 'from-amber-500 to-yellow-500' },
  { icon: Clock, title: 'मुहूर्त', english: 'Muhurta', description: 'Find auspicious timings', price: '₹199', href: '/contact', color: 'from-teal-500 to-green-500' },
  { icon: Phone, title: 'कॉल पर बात', english: 'Call Astrologer', description: 'Live voice consultation', price: '₹25/min', href: '/contact', color: 'from-green-500 to-emerald-500' },
  { icon: MessageCircle, title: 'चैट', english: 'Chat', description: 'Text with astrologers', price: '₹15/min', href: '/contact', color: 'from-blue-500 to-cyan-500' },
  { icon: Video, title: 'वीडियो कॉल', english: 'Video Call', description: 'Face-to-face consultation', price: '₹35/min', href: '/contact', color: 'from-indigo-500 to-purple-500' },
  { icon: Bot, title: 'AI बॉट', english: 'AI Astrology', description: 'Instant AI predictions', price: 'Free', href: '/ai-bot', color: 'from-violet-500 to-purple-500' },
  { icon: Gem, title: 'रत्न दुकान', english: 'Astro Shop', description: 'Gemstones, Rudraksha & Yantra', price: '₹500+', href: '/contact', color: 'from-teal-500 to-cyan-500' },
  { icon: BookOpen, title: 'उपाय', english: 'Remedies', description: 'Personalized solutions', price: '₹299', href: '/contact', color: 'from-rose-500 to-pink-500' },
  { icon: Home, title: 'वास्तु', english: 'Vastu', description: 'Home & office guidance', price: '₹999', href: '/contact', color: 'from-amber-500 to-orange-500' },
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
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
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
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary flex items-center gap-1">
                  {service.price === 'Free' ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <>
                      <IndianRupee className="w-4 h-4" />
                      {service.price.replace('₹', '')}
                    </>
                  )}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  {service.price === 'Free' ? 'Try Now →' : 'Contact →'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Rate Chart Section */}
        <div className="mt-12">
          <RateChart title="Complete Service Pricing" showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
