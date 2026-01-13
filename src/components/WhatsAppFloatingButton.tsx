import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/config/whatsapp';

const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Use configuration values
  const { phoneNumber, message } = WHATSAPP_CONFIG;
  
  // Hide button when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleWhatsAppClick = () => {
    setIsClicked(true);
    
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset click animation after a short delay
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div className={`
      fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
      transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
    `}>
      {/* Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group bg-gradient-to-r from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700 text-white 
          rounded-full p-3 md:p-4 shadow-lg hover:shadow-2xl
          transition-all duration-300 ease-in-out
          transform hover:scale-110 active:scale-95
          ${isClicked ? 'animate-pulse' : ''}
          ${isHovered ? 'animate-bounce' : ''}
          focus:outline-none focus:ring-4 focus:ring-green-300
        `}
        aria-label="WhatsApp पर संपर्क करें"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        
        {/* WhatsApp Icon */}
        <MessageCircle size={24} className="md:w-7 md:h-7 relative z-10" />
        
        {/* Tooltip */}
        <div className={`
          absolute bottom-full right-0 mb-2 px-3 py-2 
          bg-gray-900 text-white text-xs md:text-sm rounded-lg
          whitespace-nowrap opacity-0 pointer-events-none
          transition-all duration-300 transform translate-y-2
          ${isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : ''}
          shadow-lg border border-gray-700
        `}>
          WhatsApp पर चैट करें
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Pulsing Ring Animations */}
      <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-full border border-green-300 animate-ping opacity-20 pointer-events-none"></div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-10 blur-md animate-pulse pointer-events-none"></div>
    </div>
  );
};

export default WhatsAppFloatingButton;