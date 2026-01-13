import { Star, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import astrologerImg from "@/assets/vinu.jpg"; // add image here


const WHATSAPP_NUMBER = "+919799104619"; // 👉 replace with real number
const MESSAGE = encodeURIComponent(
  "नमस्ते पंडित जी, मुझे ज्योतिष परामर्श चाहिए।"
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;


const AstrologerSection = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Astrologer Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-saffron opacity-20 blur-2xl rounded-3xl" />
            <img
              src={astrologerImg}
              alt="Pandit Rishabh Dadhich"
              className="relative z-10 rounded-3xl shadow-elevated object-cover w-full max-h-[480px]"
            />
          </div>

          {/* RIGHT: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Verified & Trusted Astrologer
              </span>
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2 font-hindi">
              पंडित ऋषभ दाधीच
            </h2>
            <p className="text-muted-foreground mb-3">
              Pt. Rishabh Dadhich • Vedic Astrology & Kundli Expert
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-semibold text-lg">4.9</span>
              <span className="text-muted-foreground">(2,340+ reviews)</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              पंडित ऋषभ दाधीच पिछले 5+ वर्षों से वैदिक ज्योतिष के माध्यम से लोगों को
              जीवन, करियर, विवाह और स्वास्थ्य से जुड़े महत्वपूर्ण निर्णयों में
              मार्गदर्शन दे रहे हैं।
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              With deep knowledge of Vedic astrology, Kundli analysis, and
              planetary remedies, he provides accurate and practical solutions
              trusted by thousands of clients across India.
            </p>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                5+ Years Experience
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Hindi & English
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Vedic Astrology
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Kundli Matching
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Talk Now */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="hero" size="lg" className="w-full">
                  <Phone className="w-5 h-5" />
                  Talk Now - Consultation
                </Button>
              </a>

              {/* Chat with Astrologer */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="spiritual" size="lg" className="w-full">
                  <MessageCircle className="w-5 h-5" />
                  Chat with Astrologer
                </Button>
              </a>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstrologerSection;
