import { useState } from 'react';
import { Sparkles, Search, BookOpen, Clock, Star, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const remedyCategories = [
  { id: 'planetary', name: 'ग्रह उपाय', english: 'Planetary Remedies', icon: '🪐', count: 45 },
  { id: 'health', name: 'स्वास्थ्य उपाय', english: 'Health Remedies', icon: '🌿', count: 32 },
  { id: 'career', name: 'करियर उपाय', english: 'Career Remedies', icon: '💼', count: 28 },
  { id: 'love', name: 'प्रेम उपाय', english: 'Love Remedies', icon: '💕', count: 24 },
  { id: 'wealth', name: 'धन उपाय', english: 'Wealth Remedies', icon: '💰', count: 36 },
  { id: 'family', name: 'पारिवारिक उपाय', english: 'Family Remedies', icon: '👨‍👩‍👧‍👦', count: 19 },
];

const Remedies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleContactRedirect = (category: string) => {
    const message = encodeURIComponent(`Hello! I would like to get ${category} consultation. Please provide me with personalized remedies.`);
    window.location.href = `/contact?service=remedies&category=${category}&message=${message}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Astrological Remedies</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-shimmer">ज्योतिष</span> उपाय
          </h1>
          <p className="text-muted-foreground">Effective remedies for planetary doshas and life problems</p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {remedyCategories.map((category) => (
            <div
              key={category.id}
              className="p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all text-center hover:shadow-md"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-sm font-hindi">{category.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{category.english}</p>
              <Button 
                variant="saffron" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => handleContactRedirect(category.english)}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Get Remedies
              </Button>
            </div>
          ))}
        </div>

        {/* Service Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-spiritual p-6">
            <h2 className="text-xl font-semibold mb-4">✨ What You Get</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Complete birth chart analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Identification of planetary doshas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Personalized remedy recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Step-by-step remedy instructions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Mantra and yantra suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Follow-up support for 30 days</span>
              </li>
            </ul>
          </div>

          <div className="card-spiritual p-6">
            <h2 className="text-xl font-semibold mb-4">📞 How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
                <span className="text-sm">Contact us with your birth details</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
                <span className="text-sm">Expert astrologer analyzes your chart</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
                <span className="text-sm">Receive personalized remedy report</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">4</span>
                <span className="text-sm">Start implementing remedies</span>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">5</span>
                <span className="text-sm">Get ongoing support and guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Chart */}
        {/* Popular Remedies Preview */}
        <div className="card-spiritual p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Popular Remedy Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">🪐 Mangal Dosha</h3>
              <p className="text-sm text-muted-foreground">Marriage obstacles, relationship issues</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">🌙 Shani Dosha</h3>
              <p className="text-sm text-muted-foreground">Career problems, health issues</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">💰 Wealth Issues</h3>
              <p className="text-sm text-muted-foreground">Financial problems, business losses</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">🌿 Health Problems</h3>
              <p className="text-sm text-muted-foreground">Chronic illness, mental stress</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-6 lg:p-10 rounded-2xl bg-gradient-saffron text-white text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Transform Your Life?</h2>
          <p className="text-white/80 mb-6">Get personalized remedies from expert astrologers to solve your problems</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="gold" size="xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                <Phone className="w-5 h-5 mr-2" />
                Call for Remedies
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Remedies;