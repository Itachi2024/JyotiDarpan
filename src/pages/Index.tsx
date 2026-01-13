import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import RashiSection from '@/components/RashiSection';
import ServicesSection from '@/components/ServicesSection';
import AstrologerSection from '@/components/AstrologerSection';
import FestivalSection from '@/components/FestivalSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <RashiSection />
        <ServicesSection />
        <AstrologerSection />
        <FestivalSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
