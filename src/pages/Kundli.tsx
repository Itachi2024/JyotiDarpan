import { useState } from 'react';
import { Calendar, Clock, MapPin, User, FileText, Download, Share2, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { showPhase2Message } from '@/utils/phaseNotifications';

const planets = [
  { name: 'Sun', hindi: 'सूर्य', sign: 'Leo', degree: '15°23\'', house: 5 },
  { name: 'Moon', hindi: 'चंद्र', sign: 'Cancer', degree: '22°45\'', house: 4 },
  { name: 'Mars', hindi: 'मंगल', sign: 'Aries', degree: '8°12\'', house: 1 },
  { name: 'Mercury', hindi: 'बुध', sign: 'Virgo', degree: '3°56\'', house: 6 },
  { name: 'Jupiter', hindi: 'गुरु', sign: 'Sagittarius', degree: '18°34\'', house: 9 },
  { name: 'Venus', hindi: 'शुक्र', sign: 'Libra', degree: '27°11\'', house: 7 },
  { name: 'Saturn', hindi: 'शनि', sign: 'Capricorn', degree: '11°48\'', house: 10 },
  { name: 'Rahu', hindi: 'राहु', sign: 'Gemini', degree: '5°22\'', house: 3 },
  { name: 'Ketu', hindi: 'केतु', sign: 'Sagittarius', degree: '5°22\'', house: 9 },
];

const Kundli = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    dob: '',
    time: '',
    place: '',
  });
  const [showKundli, setShowKundli] = useState(false);
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [kundliData, setKundliData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to generate Kundli');
      return;
    }

    setIsLoading(true);

    try {
      // For now, we'll create a simple kundli entry without complex calculations
      const { data, error } = await supabase
        .from('kundlis')
        .insert({
          user_id: user?.id || null,
          name: formData.name,
          date_of_birth: formData.dob,
          time_of_birth: formData.time,
          place_of_birth: formData.place,
          chart_data: {
            // Simple placeholder data - in production you'd integrate with astrology API
            message: 'Kundli generated successfully. Please contact our astrologer for detailed analysis.',
            generated_at: new Date().toISOString(),
            basic_info: {
              name: formData.name,
              dob: formData.dob,
              time: formData.time,
              place: formData.place
            }
          }
        } as any)
        .select()
        .single();

      if (error) throw error;

      setKundliData(data);
      setShowKundli(true);
      toast.success('Kundli generated successfully!');
    } catch (error: any) {
      console.error('Error generating Kundli:', error);
      toast.error('Failed to generate Kundli. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Kundli</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-shimmer">निःशुल्क</span> कुंडली
          </h1>
          <p className="text-muted-foreground">Free Birth Chart / Janam Kundli Generator</p>
        </div>

        {!showKundli ? (
          /* Birth Details Form */
          <div className="max-w-2xl mx-auto">
            <div className="card-spiritual p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                जन्म विवरण दर्ज करें / Enter Birth Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">नाम / Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Gender */}
                <div>
                  <Label>लिंग / Gender *</Label>
                  <div className="flex gap-4 mt-2">
                    {['male', 'female', 'other'].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="capitalize">{g === 'male' ? 'पुरुष / Male' : g === 'female' ? 'महिला / Female' : 'अन्य / Other'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    जन्म तिथि / Date of Birth *
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Time of Birth */}
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    जन्म समय / Time of Birth *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Place of Birth */}
                <div>
                  <Label htmlFor="place" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    जन्म स्थान / Place of Birth *
                  </Label>
                  <Input
                    id="place"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    placeholder="e.g., New Delhi, India"
                    required
                    className="mt-1"
                  />
                </div>

                <Button type="submit" variant="saffron" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isLoading ? 'Generating...' : 'कुंडली बनाएं / Generate Kundli'}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          /* Kundli Display */
          <div className="space-y-6">
            {/* User Info & Actions */}
            <div className="card-spiritual p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">{formData.name}'s Kundli</h2>
                <p className="text-muted-foreground">
                  {new Date(formData.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at {formData.time}
                </p>
                <p className="text-muted-foreground">{formData.place}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="spiritual" size="sm">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="spiritual" size="sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Chart Style Toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setChartStyle('north')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  chartStyle === 'north'
                    ? 'bg-gradient-saffron text-white shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                North Indian
              </button>
              <button
                onClick={() => setChartStyle('south')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  chartStyle === 'south'
                    ? 'bg-gradient-saffron text-white shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                South Indian
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Kundli Chart */}
              <div className="card-spiritual p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  {chartStyle === 'north' ? 'उत्तर भारतीय कुंडली' : 'दक्षिण भारतीय कुंडली'}
                </h3>
                
                {chartStyle === 'north' ? (
                  /* North Indian Style Chart */
                  <div className="aspect-square max-w-md mx-auto relative border-2 border-primary/30 bg-card">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {/* Outer square */}
                      <rect x="0" y="0" width="300" height="300" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                      
                      {/* Diagonal lines */}
                      <line x1="0" y1="0" x2="300" y2="300" stroke="hsl(var(--primary))" strokeWidth="1" />
                      <line x1="300" y1="0" x2="0" y2="300" stroke="hsl(var(--primary))" strokeWidth="1" />
                      
                      {/* Inner diamond */}
                      <polygon points="150,0 300,150 150,300 0,150" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                      
                      {/* House numbers */}
                      <text x="150" y="30" textAnchor="middle" className="text-xs fill-primary">1</text>
                      <text x="250" y="80" textAnchor="middle" className="text-xs fill-primary">12</text>
                      <text x="280" y="150" textAnchor="middle" className="text-xs fill-primary">11</text>
                      <text x="250" y="220" textAnchor="middle" className="text-xs fill-primary">10</text>
                      <text x="150" y="280" textAnchor="middle" className="text-xs fill-primary">7</text>
                      <text x="50" y="220" textAnchor="middle" className="text-xs fill-primary">8</text>
                      <text x="20" y="150" textAnchor="middle" className="text-xs fill-primary">9</text>
                      <text x="50" y="80" textAnchor="middle" className="text-xs fill-primary">2</text>
                      <text x="100" y="60" textAnchor="middle" className="text-xs fill-primary">3</text>
                      <text x="200" y="60" textAnchor="middle" className="text-xs fill-primary">4</text>
                      <text x="100" y="250" textAnchor="middle" className="text-xs fill-primary">5</text>
                      <text x="200" y="250" textAnchor="middle" className="text-xs fill-primary">6</text>
                      
                      {/* Planet placements */}
                      <text x="150" y="50" textAnchor="middle" className="text-sm fill-foreground font-bold">Ma</text>
                      <text x="150" y="100" textAnchor="middle" className="text-xs fill-muted-foreground">Asc</text>
                      <text x="80" y="150" textAnchor="middle" className="text-sm fill-foreground font-bold">Ju, Ke</text>
                      <text x="220" y="150" textAnchor="middle" className="text-sm fill-foreground font-bold">Sa</text>
                      <text x="150" y="180" textAnchor="middle" className="text-sm fill-foreground font-bold">Su, Mo</text>
                    </svg>
                  </div>
                ) : (
                  /* South Indian Style Chart */
                  <div className="aspect-square max-w-md mx-auto grid grid-cols-4 gap-0 border-2 border-primary/30">
                    {[
                      { house: 12, planets: [] },
                      { house: 1, planets: ['Ma'] },
                      { house: 2, planets: [] },
                      { house: 3, planets: ['Ra'] },
                      { house: 11, planets: [] },
                      { house: null, planets: [] },
                      { house: null, planets: [] },
                      { house: 4, planets: ['Mo'] },
                      { house: 10, planets: ['Sa'] },
                      { house: null, planets: [] },
                      { house: null, planets: [] },
                      { house: 5, planets: ['Su'] },
                      { house: 9, planets: ['Ju', 'Ke'] },
                      { house: 8, planets: [] },
                      { house: 7, planets: ['Ve'] },
                      { house: 6, planets: ['Me'] },
                    ].map((cell, index) => (
                      <div
                        key={index}
                        className={`aspect-square border border-primary/20 flex flex-col items-center justify-center p-1 ${
                          cell.house === null ? 'bg-muted/30' : 'bg-card'
                        }`}
                      >
                        {cell.house !== null && (
                          <>
                            <span className="text-xs text-muted-foreground">{cell.house}</span>
                            <span className="text-sm font-bold text-foreground">{cell.planets.join(', ')}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Planet Positions Table */}
              <div className="card-spiritual p-6">
                <h3 className="text-lg font-semibold mb-4">ग्रह स्थिति / Planet Positions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2">Planet</th>
                        <th className="text-left py-2 px-2">Sign</th>
                        <th className="text-left py-2 px-2">Degree</th>
                        <th className="text-left py-2 px-2">House</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planets.map((planet) => (
                        <tr key={planet.name} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-2 px-2">
                            <span className="font-medium">{planet.hindi}</span>
                            <span className="text-muted-foreground ml-1">({planet.name})</span>
                          </td>
                          <td className="py-2 px-2">{planet.sign}</td>
                          <td className="py-2 px-2">{planet.degree}</td>
                          <td className="py-2 px-2">{planet.house}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Basic Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card-spiritual p-4 text-center">
                <p className="text-sm text-muted-foreground">लग्न / Ascendant</p>
                <p className="text-xl font-bold text-primary">Aries / मेष</p>
              </div>
              <div className="card-spiritual p-4 text-center">
                <p className="text-sm text-muted-foreground">राशि / Moon Sign</p>
                <p className="text-xl font-bold text-primary">Cancer / कर्क</p>
              </div>
              <div className="card-spiritual p-4 text-center">
                <p className="text-sm text-muted-foreground">नक्षत्र / Nakshatra</p>
                <p className="text-xl font-bold text-primary">Pushya / पुष्य</p>
              </div>
            </div>

            {/* Get Detailed Analysis CTA */}
            <div className="card-spiritual p-6 bg-gradient-saffron text-white text-center">
              <h3 className="text-xl font-bold mb-2">विस्तृत कुंडली विश्लेषण</h3>
              <p className="text-white/80 mb-4">Get complete life predictions, Dasha analysis, and personalized remedies</p>
              <Button variant="gold" size="lg">
                Talk to Astrologer for Detailed Analysis
              </Button>
            </div>

            {/* New Kundli Button */}
            <div className="text-center">
              <Button variant="spiritual" onClick={() => setShowKundli(false)}>
                Generate New Kundli
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
  
export default Kundli;
