import { useState } from 'react';
import { Calendar, Clock, Home, Heart, Briefcase, Baby, Car, Sparkles, IndianRupee, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const muhurtaTypes = [
  { id: 'marriage', name: 'विवाह', english: 'Marriage', icon: Heart, color: 'bg-pink-500', price: '₹999' },
  { id: 'griha', name: 'गृह प्रवेश', english: 'House Warming', icon: Home, color: 'bg-amber-500', price: '₹799' },
  { id: 'business', name: 'व्यापार', english: 'Business', icon: Briefcase, color: 'bg-blue-500', price: '₹899' },
  { id: 'naming', name: 'नामकरण', english: 'Naming Ceremony', icon: Baby, color: 'bg-purple-500', price: '₹599' },
  { id: 'vehicle', name: 'वाहन खरीद', english: 'Vehicle Purchase', icon: Car, color: 'bg-green-500', price: '₹499' },
  { id: 'general', name: 'सामान्य', english: 'General Auspicious', icon: Sparkles, color: 'bg-primary', price: '₹299' },
];

const Muhurta = () => {
  const [selectedType, setSelectedType] = useState('');

  const handleContactRedirect = (type: string, price: string) => {
    const message = encodeURIComponent(`Hello! I would like to book ${type} Muhurta consultation (${price}). Please provide me with the details.`);
    window.location.href = `/contact?service=muhurta&type=${type}&price=${price}&message=${message}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Muhurta Consultation</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-shimmer">शुभ</span> मुहूर्त
          </h1>
          <p className="text-muted-foreground">Find Auspicious Timings for Important Events</p>
        </div>

        {/* Pricing Banner */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-saffron text-white text-center">
          <h2 className="text-xl font-bold mb-2">Professional Muhurta Consultation</h2>
          <p className="text-white/80 mb-4">Get personalized auspicious timings from expert astrologers</p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <IndianRupee className="w-6 h-6" />
            <span>Starting from ₹299</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Muhurta Type Selection */}
          <div className="card-spiritual p-6 lg:p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6">मुहूर्त प्रकार चुनें / Select Muhurta Type</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {muhurtaTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mx-auto mb-3`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground font-hindi text-center">{type.name}</p>
                  <p className="text-sm text-muted-foreground text-center mb-2">{type.english}</p>
                  <div className="text-center">
                    <span className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {type.price.replace('₹', '')}
                    </span>
                  </div>
                  <Button 
                    variant="saffron" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => handleContactRedirect(type.english, type.price)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="card-spiritual p-6 lg:p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">✨ Consultation Includes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Detailed birth chart analysis</li>
                  <li>• Best date and time selection</li>
                  <li>• Tithi and Nakshatra consideration</li>
                  <li>• Planetary position analysis</li>
                  <li>• Personalized recommendations</li>
                  <li>• Written report with timings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">📞 How It Works:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Contact us with your requirements</li>
                  <li>• Provide birth details and event type</li>
                  <li>• Expert astrologer analysis</li>
                  <li>• Receive detailed muhurta report</li>
                  <li>• Follow-up support included</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="card-spiritual p-6 bg-gradient-saffron text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Find Your Perfect Muhurta?</h3>
            <p className="text-white/80 mb-6">Contact our expert astrologers for personalized consultation</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact via WhatsApp
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Muhurta;
