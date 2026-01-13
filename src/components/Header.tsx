import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Phone, ChevronDown, LogOut, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const navItems = [
    { label: language === 'en' ? 'Horoscope' : 'राशिफल', href: '/horoscope' },
    { label: language === 'en' ? 'Kundli' : 'कुंडली', href: '/kundli' },
    { label: language === 'en' ? 'Match Making' : 'कुंडली मिलान', href: '/match-making' },
    { label: language === 'en' ? 'Panchang' : 'पंचांग', href: '/panchang' },
    { label: language === 'en' ? 'Talk to Astrologer' : 'ज्योतिषी से बात करें', href: '/astrologers' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-saffron flex items-center justify-center shadow-soft">
              <span className="text-white text-xl lg:text-2xl font-bold">ॐ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold text-foreground">
                {language === 'en' ? 'AstroRishabh' : 'एस्ट्रो ऋषभ'}
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">
                {language === 'en' ? 'Astrology Guidance' : 'ज्योतिष मार्गदर्शन'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/services"
              className="px-4 py-2 text-sm font-medium text-primary flex items-center gap-1 hover:bg-primary/5 rounded-lg transition-colors"
            >
              {language === 'en' ? 'All Services' : 'सभी सेवाएं'}
              <ChevronDown className="w-4 h-4" />
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              {language === 'en' ? 'हिंदी' : 'EN'}
            </button>

            {/* Payment Button */}
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link to="/payment">
                <CreditCard className="w-4 h-4" />
                <span>{language === 'en' ? 'Add Money' : 'पैसे जोड़ें'}</span>
              </Link>
            </Button>

            {/* Login/Profile */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="spiritual" size="sm" className="hidden sm:flex" onClick={() => setShowAuthModal(true)}>
                <User className="w-4 h-4" />
                <span>{language === 'en' ? 'Login' : 'लॉगिन'}</span>
              </Button>
            )}

            {/* Talk Now CTA */}
            <Button variant="saffron" size="sm" className="hidden md:flex" asChild>
              <Link to="/contact">
                <Phone className="w-4 h-4" />
                <span>{language === 'en' ? 'Talk Now' : 'अभी बात करें'}</span>
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/services"
                className="px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'en' ? 'All Services' : 'सभी सेवाएं'} →
              </Link>
              <div className="flex gap-2 mt-4 px-4">
                {user ? (
                  <Button variant="spiritual" className="flex-1" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    {language === 'en' ? 'Sign Out' : 'साइन आउट'}
                  </Button>
                ) : (
                  <Button variant="spiritual" className="flex-1" onClick={() => setShowAuthModal(true)}>
                    <User className="w-4 h-4" />
                    {language === 'en' ? 'Login' : 'लॉगिन'}
                  </Button>
                )}
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/payment">
                    <CreditCard className="w-4 h-4" />
                    {language === 'en' ? 'Payment' : 'पेमेंट'}
                  </Link>
                </Button>
                <Button variant="saffron" className="flex-1" asChild>
                  <Link to="/contact">
                    <Phone className="w-4 h-4" />
                    {language === 'en' ? 'Talk Now' : 'बात करें'}
                  </Link>
                </Button>
              </div>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="mx-4 mt-3 py-2 text-sm font-medium text-center rounded-lg bg-muted hover:bg-primary/10 transition-colors"
              >
                {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
              </button>
            </nav>
          </div>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default Header;
