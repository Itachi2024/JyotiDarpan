import { useState } from 'react';
import { Heart, Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const gunaDetails = [
  { name: 'वर्ण', english: 'Varna', max: 1, description: 'Spiritual compatibility' },
  { name: 'वश्य', english: 'Vashya', max: 2, description: 'Mutual attraction' },
  { name: 'तारा', english: 'Tara', max: 3, description: 'Birth star compatibility' },
  { name: 'योनि', english: 'Yoni', max: 4, description: 'Sexual compatibility' },
  { name: 'ग्रह मैत्री', english: 'Graha Maitri', max: 5, description: 'Planetary friendship' },
  { name: 'गण', english: 'Gana', max: 6, description: 'Temperament matching' },
  { name: 'भकूट', english: 'Bhakoot', max: 7, description: 'Emotional compatibility' },
  { name: 'नाड़ी', english: 'Nadi', max: 8, description: 'Health & genes' },
];

const MatchMaking = () => {
  const [step, setStep] = useState(1);
  const [boyDetails, setBoyDetails] = useState({ name: '', dob: '', time: '', place: '' });
  const [girlDetails, setGirlDetails] = useState({ name: '', dob: '', time: '', place: '' });
  const [showResult, setShowResult] = useState(false);

  // Sample match result
  const matchResult = {
    totalScore: 28,
    gunaScores: [1, 2, 3, 3, 4, 5, 6, 4],
    manglikBoy: false,
    manglikGirl: false,
    recommendation: 'excellent',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setShowResult(true);
    }
  };

  const getScoreColor = (score: number, max: number) => {
    const ratio = score / max;
    if (ratio >= 0.75) return 'text-green-500';
    if (ratio >= 0.5) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRecommendationBadge = () => {
    if (matchResult.totalScore >= 28) {
      return { color: 'bg-green-500', text: 'Excellent Match', icon: CheckCircle };
    } else if (matchResult.totalScore >= 18) {
      return { color: 'bg-amber-500', text: 'Good Match', icon: AlertCircle };
    } else {
      return { color: 'bg-red-500', text: 'Needs Remedies', icon: XCircle };
    }
  };

  const recommendation = getRecommendationBadge();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 mb-4">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-500">Kundli Milan</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">कुंडली</span> मिलान
          </h1>
          <p className="text-muted-foreground">36 Guna Match Making / Ashtakoota Milan</p>
        </div>

        {!showResult ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>1</div>
                <span className="hidden sm:inline">वर का विवरण / Boy's Details</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>2</div>
                <span className="hidden sm:inline">कन्या का विवरण / Girl's Details</span>
              </div>
            </div>

            <div className="card-spiritual p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {step === 1 ? 'वर का विवरण / Boy\'s Details' : 'कन्या का विवरण / Girl\'s Details'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">नाम / Name *</Label>
                    <Input
                      id="name"
                      value={step === 1 ? boyDetails.name : girlDetails.name}
                      onChange={(e) => step === 1 
                        ? setBoyDetails({ ...boyDetails, name: e.target.value })
                        : setGirlDetails({ ...girlDetails, name: e.target.value })
                      }
                      placeholder="Enter name"
                      required
                      className="mt-1"
                    />
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
                      value={step === 1 ? boyDetails.dob : girlDetails.dob}
                      onChange={(e) => step === 1 
                        ? setBoyDetails({ ...boyDetails, dob: e.target.value })
                        : setGirlDetails({ ...girlDetails, dob: e.target.value })
                      }
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
                      value={step === 1 ? boyDetails.time : girlDetails.time}
                      onChange={(e) => step === 1 
                        ? setBoyDetails({ ...boyDetails, time: e.target.value })
                        : setGirlDetails({ ...girlDetails, time: e.target.value })
                      }
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
                      value={step === 1 ? boyDetails.place : girlDetails.place}
                      onChange={(e) => step === 1 
                        ? setBoyDetails({ ...boyDetails, place: e.target.value })
                        : setGirlDetails({ ...girlDetails, place: e.target.value })
                      }
                      placeholder="e.g., New Delhi, India"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  {step === 2 && (
                    <Button type="button" variant="spiritual" onClick={() => setStep(1)}>
                      ← Back
                    </Button>
                  )}
                  <Button type="submit" variant="saffron" size="lg" className={step === 1 ? 'w-full' : 'ml-auto'}>
                    {step === 1 ? 'Next: Girl\'s Details →' : 'Check Match / मिलान देखें'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Match Result */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Score Summary */}
            <div className="card-spiritual p-6 lg:p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-primary">{matchResult.totalScore}</span>
                      <span className="text-2xl text-muted-foreground">/36</span>
                    </div>
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full ${recommendation.color} text-white text-sm font-medium flex items-center gap-1`}>
                    <recommendation.icon className="w-4 h-4" />
                    {recommendation.text}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {boyDetails.name} & {girlDetails.name}
              </h2>
              <p className="text-muted-foreground">गुण मिलान परिणाम / Guna Match Result</p>
            </div>

            {/* Detailed Guna Scores */}
            <div className="card-spiritual p-6">
              <h3 className="text-lg font-semibold mb-4">अष्टकूट विवरण / Ashtakoota Details</h3>
              <div className="space-y-4">
                {gunaDetails.map((guna, index) => (
                  <div key={guna.english} className="flex items-center gap-4">
                    <div className="w-32 sm:w-40">
                      <p className="font-medium font-hindi">{guna.name}</p>
                      <p className="text-xs text-muted-foreground">{guna.english}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${matchResult.gunaScores[index] / guna.max >= 0.75 ? 'bg-green-500' : matchResult.gunaScores[index] / guna.max >= 0.5 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${(matchResult.gunaScores[index] / guna.max) * 100}%` }}
                          />
                        </div>
                        <span className={`font-bold ${getScoreColor(matchResult.gunaScores[index], guna.max)}`}>
                          {matchResult.gunaScores[index]}/{guna.max}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{guna.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manglik Status */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card-spiritual p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${matchResult.manglikBoy ? 'bg-red-100' : 'bg-green-100'}`}>
                  {matchResult.manglikBoy ? <XCircle className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6 text-green-500" />}
                </div>
                <div>
                  <p className="font-medium">{boyDetails.name}</p>
                  <p className={matchResult.manglikBoy ? 'text-red-500' : 'text-green-500'}>
                    {matchResult.manglikBoy ? 'Manglik / मांगलिक' : 'Non-Manglik / अमांगलिक'}
                  </p>
                </div>
              </div>
              <div className="card-spiritual p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${matchResult.manglikGirl ? 'bg-red-100' : 'bg-green-100'}`}>
                  {matchResult.manglikGirl ? <XCircle className="w-6 h-6 text-red-500" /> : <CheckCircle className="w-6 h-6 text-green-500" />}
                </div>
                <div>
                  <p className="font-medium">{girlDetails.name}</p>
                  <p className={matchResult.manglikGirl ? 'text-red-500' : 'text-green-500'}>
                    {matchResult.manglikGirl ? 'Manglik / मांगलिक' : 'Non-Manglik / अमांगलिक'}
                  </p>
                </div>
              </div>
            </div>

            {/* Consult CTA */}
            <div className="card-spiritual p-6 bg-gradient-saffron text-white text-center">
              <h3 className="text-xl font-bold mb-2">विस्तृत विश्लेषण और उपाय</h3>
              <p className="text-white/80 mb-4">Get detailed compatibility analysis, Dasha matching, and personalized remedies</p>
              <Button variant="gold" size="lg">
                Consult Marriage Expert
              </Button>
            </div>

            {/* New Match Button */}
            <div className="text-center">
              <Button variant="spiritual" onClick={() => { setShowResult(false); setStep(1); setBoyDetails({ name: '', dob: '', time: '', place: '' }); setGirlDetails({ name: '', dob: '', time: '', place: '' }); }}>
                Check Another Match
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MatchMaking;
