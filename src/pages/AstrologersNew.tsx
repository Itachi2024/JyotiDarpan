import { useState } from 'react';
import { Star, Phone, MessageCircle, CheckCircle, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import astrologerImg from '@/assets/vinu.jpg';

interface Astrologer {
  id: string;
  name: string;
  english_name: string | null;
  specialties: string[] | null;
  experience_years: number | null;
  rating: number | null;
  total_reviews: number | null;
  languages: string[] | null;
  is_verified: boolean | null;
  description: string | null;
  whatsapp_number: string | null;
  email_address: string | null;
}

const WHATSAPP_NUMBER = "+919799104619";
const MESSAGE = encodeURIComponent("नमस्ते पंडित जी, मुझे ज्योतिष परामर्श चाहिए।");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

const AstrologersNew = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // Simplified astrologer data
  const astrologer: Astrologer = {
    id: '1',
    name: 'पंडित ऋषभ दाधीच',
    english_name: 'Pt. Rishabh Dadhich',
    specialties: ['Vedic Astrology', 'Kundli Analysis', 'Career Guidance', 'Relationship Advice'],
    experience_years: 5,
    rating: 4.9,
    total_reviews: 2340,
    languages: ['Hindi', 'English'],
    is_verified: true,
    description: 'Expert Vedic astrologer with 5+ years of experience. Specialized in career guidance, relationship advice, and life predictions using traditional Vedic methods.',
    whatsapp_number: '+919799104619',
    email_address: 'rishabhdadhich21@gmail.com'
  };

  const specialties = ['all', 'Vedic Astrology', 'Kundli Analysis', 'Career Guidance', 'Relationship Advice'];

  const trustFeatures = [
    {
      icon: CheckCircle,
      title: "सत्यापित ज्योतिषी",
      description: "प्रमाणित और अनुभवी पेशेवर"
    },
    {
      icon: Users,
      title: "2000+ खुश ग्राहक",
      description: "भारत भर में हजारों लोगों का भरोसा"
    },
    {
      icon: Award,
      title: "5+ साल का अनुभव",
      description: "वैदिक ज्योतिष का गहरा ज्ञान"
    },
    {
      icon: Clock,
      title: "रोज उपलब्ध",
      description: "आपके प्रश्नों की सहायता के लिए तैयार"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary font-hindi">विशेषज्ञ ज्योतिषी</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 font-hindi">
            हमारे <span className="text-primary">सत्यापित ज्योतिषी</span> से बात करें
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            अपने जीवन के सभी प्रश्नों के लिए हमारे अनुभवी वैदिक ज्योतिषी से व्यक्तिगत मार्गदर्शन प्राप्त करें
          </p>
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSpecialty === specialty
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary'
              }`}
            >
                            {specialty === 'all' ? 'सभी सेवाएं' : specialty}
            </button>
          ))}
        </div>

        {/* Main Astrologer Card */}
        <div className="max-w-4xl mx-auto">
          <div className="card-spiritual p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Astrologer Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-saffron opacity-20 blur-2xl rounded-3xl" />
                <img
                  src={astrologerImg}
                  alt={astrologer.english_name || astrologer.name}
                  className="relative z-10 rounded-3xl shadow-elevated object-cover w-full max-h-[400px]"
                />
              </div>

              {/* Astrologer Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-hindi">अभी उपलब्ध</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 font-hindi">
                  {astrologer.name}
                </h2>
                <p className="text-muted-foreground mb-3">
                  {astrologer.english_name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-semibold text-lg">{astrologer.rating}</span>
                  <span className="text-muted-foreground">({astrologer.total_reviews}+ reviews)</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {astrologer.specialties?.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground font-hindi">भाषाएं:</span>
                  <div className="flex gap-2">
                    {astrologer.languages?.map((lang, index) => (
                      <span key={index} className="px-2 py-1 rounded bg-muted text-sm">
                        {lang === 'Hindi' ? 'हिंदी' : lang === 'English' ? 'अंग्रेजी' : lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {astrologer.description}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero" size="lg" className="w-full whitespace-nowrap">
                      <Phone className="w-5 h-5" />
                      <span className="font-hindi">अभी कॉल करें</span>
                    </Button>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="spiritual" size="lg" className="w-full whitespace-nowrap">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-hindi">व्हाट्सऐप पर चैट</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 font-hindi">हमारे ज्योतिषी को क्यों चुनें?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 font-hindi">हमारी सेवाएं</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-spiritual p-6">
              <h3 className="font-semibold mb-2 font-hindi">व्यक्तिगत परामर्श</h3>
              <p className="text-sm text-muted-foreground">आपके जीवन के प्रश्नों के लिए एक-से-एक मार्गदर्शन</p>
            </div>
            <div className="card-spiritual p-6">
              <h3 className="font-semibold mb-2 font-hindi">कुंडली विश्लेषण</h3>
              <p className="text-sm text-muted-foreground">संपूर्ण जन्म कुंडली पठन और विश्लेषण</p>
            </div>
            <div className="card-spiritual p-6">
              <h3 className="font-semibold mb-2 font-hindi">करियर मार्गदर्शन</h3>
              <p className="text-sm text-muted-foreground">करियर के लिए पेशेवर ज्योतिष सलाह</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="card-spiritual p-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 font-hindi">मार्गदर्शन लेने के लिए तैयार हैं?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              व्यक्तिगत परामर्श और जीवन मार्गदर्शन के लिए अभी हमारे विशेषज्ञ ज्योतिषी से जुड़ें
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link to="/contact" className="flex-1">
                <Button variant="hero" size="lg" className="w-full font-hindi">
                  अभी संपर्क करें
                </Button>
              </Link>
              <Link to="/payment" className="flex-1">
                <Button variant="spiritual" size="lg" className="w-full font-hindi">
                  सुरक्षित भुगतान
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

export default AstrologersNew;