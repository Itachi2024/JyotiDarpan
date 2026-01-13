import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { label: 'Daily Horoscope', href: '/horoscope' },
    { label: 'Free Kundli', href: '/kundli' },
    { label: 'Match Making', href: '/match-making' },
    { label: 'Panchang', href: '/panchang' },
  ];

  const services = [
    { label: 'Talk to Astrologer', href: '/astrologers' },
    { label: 'Chat with Astrologer', href: '/astrologers' },
    // { label: 'Video Consultation', href: '/video' },
    { label: 'Secure Payment', href: '/payment' },
    { label: 'Astro Shop', href: '/shop' },
  ];

  const resources = [
    { label: 'WhatsApp Community', href: 'https://chat.whatsapp.com/your_whatsapp_community_link' },
    { label: 'Hindu Calendar', href: 'https://www.drikpanchang.com/calendars/hindu/hinducalendar.html' },
    { label: 'Remedies', href: '/remedies' },
    { label: 'Gemstones', href: '/shop' },
  ];

  const legal = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ];

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gradient-saffron rounded-2xl p-6 lg:p-8 mb-12 -mt-28 relative z-10 shadow-elevated">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                दैनिक राशिफल पाएं 🌟
              </h3>
              <p className="text-white/80">
                Get daily horoscope and festival reminders in your inbox
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="gold" size="lg">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-saffron flex items-center justify-center shadow-soft">
                <span className="text-white text-2xl font-bold">ॐ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">AstroRishabh</span>
                <span className="text-xs text-white/60">एस्ट्रो ऋषभ</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              India's most trusted astrology platform. Connect with experienced astrologers for guidance on life, career, relationships, and more.
            </p>
            <div className="space-y-2">
              <a href="tel:+919799104619" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +91 97991 04619
              </a>
              <a href="mailto:rishabhdadhich21@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                rishabhdadhich21@gmail.com
              </a>
              <p className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                Purani Rakasani, Soorsagar
                Jodhpur, Rajasthan, India
                342001 
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">Follow us:</span>
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/astro_rishabh_21?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                {
          icon: FaWhatsapp,
          href: "https://chat.whatsapp.com/your_whatsapp_community_link",
        },
                { icon: Youtube, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Payment Methods
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm">Payments:</span>
              <div className="flex gap-2">
                {['UPI', 'VISA', 'Mastercard', 'Paytm'].map((method) => (
                  <span key={method} className="px-3 py-1 rounded bg-white/10 text-white/80 text-xs">
                    {method}
                  </span>
                ))}
              </div>
            </div> */}

            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © 2025 AstroRishabh. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {legal.map((link) => (
              <Link key={link.href} to={link.href} className="text-white/50 text-sm hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
