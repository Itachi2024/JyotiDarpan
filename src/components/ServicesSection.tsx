import { 
  Star, 
  Heart, 
  Calendar, 
  FileText, 
  Phone, 
  MessageCircle, 
  Gem, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: FileText,
    title: 'कुंडली',
    english: 'Kundli',
    description: 'Get detailed birth chart analysis',
    href: '/kundli',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Heart,
    title: 'कुंडली मिलान',
    english: 'Match Making',
    description: '36 Guna Milan for marriage',
    href: '/match-making',
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Calendar,
    title: 'मुहूर्त',
    english: 'Muhurta',
    description: 'Find auspicious timings',
    href: '/contact',
    color: 'bg-amber-500',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Star,
    title: 'राशिफल',
    english: 'Horoscope',
    description: 'Daily, weekly & monthly predictions',
    href: '/horoscope',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: Phone,
    title: 'कॉल पर बात',
    english: 'Call Astrologer',
    description: 'Live voice consultation',
    href: '/contact',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: MessageCircle,
    title: 'चैट',
    english: 'Chat',
    description: 'Text with astrologers',
    href: '/contact',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gem,
    title: 'रत्न दुकान',
    english: 'Astro Shop',
    description: 'Gemstones, Rudraksha & Yantra',
    href: '/contact',
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-green-500',
  },
  {
    icon: BookOpen,
    title: 'उपाय',
    english: 'Remedies',
    description: 'Personalized solutions',
    href: '/contact',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-muted/50 mandala-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 mb-3 sm:mb-4">
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-2">
            हमारी सेवाएं
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2 sm:px-0">
            Complete astrology solutions for every aspect of your life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {services.map((service, index) => (
            <Link
              key={service.english}
              to={service.href}
              className="group card-spiritual p-4 sm:p-5 lg:p-6 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <service.icon className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground font-hindi mb-1">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium mb-2">
                {service.english}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3 hidden sm:block">
                {service.description}
              </p>

              {/* Contact CTA */}
              <div className="flex items-center justify-end">
                <div className="text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Contact →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-10">
          <a 
            href="/services" 
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-card border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-soft text-sm sm:text-base"
          >
            <span>सभी सेवाएं देखें</span>
            <span className="text-muted-foreground hidden sm:inline">/ View All Services</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
