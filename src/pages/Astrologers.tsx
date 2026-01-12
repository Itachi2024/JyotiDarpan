import { useState, useEffect } from 'react';
import { Star, Phone, MessageCircle, Video, CheckCircle, Clock, Filter, Search, ChevronDown, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Astrologer {
  id: string;
  name: string;
  english_name: string | null;
  avatar_url: string | null;
  photo_url: string | null;
  specialties: string[] | null;
  experience_years: number | null;
  rating: number | null;
  total_reviews: number | null;
  price_per_minute: number;
  languages: string[] | null;
  is_verified: boolean | null;
  total_consultations: number | null;
  description: string | null;
  is_admin: boolean | null;
  whatsapp_number: string | null;
  email_address: string | null;
  availability_status: string | null;
}

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const { user } = useAuth();

  const specialties = ['All', 'Vedic Astrology', 'Kundli', 'Numerology', 'Vastu', 'Tarot', 'Palmistry', 'Career', 'Love', 'Marriage'];

  useEffect(() => {
    fetchAstrologers();
    if (user) {
      checkCurrentUserAdmin();
    }
  }, [user]);

  const fetchAstrologers = async () => {
    try {
      console.log('Fetching astrologers from database...');
      
      // First try to fetch from database
      const { data, error } = await supabase
        .from('astrologers')
        .select('*')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        console.log('Using fallback astrologers data');
        setAstrologers(getFallbackAstrologers());
      } else if (data && data.length > 0) {
        console.log('Successfully loaded astrologers from database:', data.length);
        setAstrologers(data);
      } else {
        console.log('No astrologers found in database, using fallback data');
        setAstrologers(getFallbackAstrologers());
      }
    } catch (error) {
      console.error('Error fetching astrologers:', error);
      console.log('Using fallback astrologers data due to error');
      setAstrologers(getFallbackAstrologers());
      toast.info('Loading demo astrologer profiles');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackAstrologers = (): Astrologer[] => [
    {
      id: '1',
      name: 'पंडित राजेश शर्मा',
      english_name: 'Pt. Rajesh Sharma',
      avatar_url: null,
      photo_url: null,
      specialties: ['Vedic Astrology', 'Kundli', 'Career'],
      experience_years: 15,
      rating: 4.9,
      total_reviews: 2340,
      price_per_minute: 25,
      languages: ['Hindi', 'English'],
      is_verified: true,
      total_consultations: 15000,
      description: 'Expert in Vedic astrology with 15+ years of experience. Specialized in career guidance and relationship issues.',
      is_admin: true,
      whatsapp_number: '+91-9876543210',
      email_address: 'rajesh.sharma@jyotishguru.com',
      availability_status: 'online'
    },
    {
      id: '2',
      name: 'आचार्य विनोद मिश्रा',
      english_name: 'Acharya Vinod Mishra',
      avatar_url: null,
      photo_url: null,
      specialties: ['Numerology', 'Vastu', 'Remedies'],
      experience_years: 20,
      rating: 4.8,
      total_reviews: 3120,
      price_per_minute: 35,
      languages: ['Hindi', 'Sanskrit'],
      is_verified: true,
      total_consultations: 22000,
      description: 'Renowned numerologist and Vastu expert. Known for providing effective remedies.',
      is_admin: true,
      whatsapp_number: '+91-9876543211',
      email_address: 'vinod.mishra@jyotishguru.com',
      availability_status: 'online'
    }
  ];

  const checkCurrentUserAdmin = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('astrologers')
        .select('is_admin')
        .eq('user_id', user.id)
        .single();
      
      if (data && !error) {
        setIsCurrentUserAdmin(data.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const updateAvailability = async (astrologerId: string, newStatus: string) => {
    if (!isCurrentUserAdmin) {
      toast.error('Admin access required');
      return;
    }

    try {
      const { error } = await supabase
        .from('astrologers')
        .update({ availability_status: newStatus })
        .eq('id', astrologerId);

      if (error) throw error;
      
      toast.success('Availability updated successfully');
      fetchAstrologers();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const handleWhatsAppContact = (whatsappNumber: string, astrologerName: string) => {
    if (!whatsappNumber) {
      toast.error('WhatsApp number not available');
      return;
    }
    
    const message = encodeURIComponent(`Hello ${astrologerName}, I would like to consult with you regarding astrology services.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = (email: string, astrologerName: string) => {
    if (!email) {
      toast.error('Email address not available');
      return;
    }
    
    const subject = encodeURIComponent('Astrology Consultation Request');
    const body = encodeURIComponent(`Dear ${astrologerName},\n\nI would like to schedule a consultation with you. Please let me know your availability.\n\nThank you.`);
    const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };

  const filteredAstrologers = astrologers.filter((astrologer) => {
    const matchesSearch = astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (astrologer.english_name && astrologer.english_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (astrologer.specialties && astrologer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesSpecialty = selectedSpecialty === 'All' || 
      (astrologer.specialties && astrologer.specialties.includes(selectedSpecialty));
    return matchesSearch && matchesSpecialty;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-amber-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Expert Astrologers</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">अनुभवी</span> ज्योतिषी
          </h1>
          <p className="text-muted-foreground">Connect with our expert astrologers • Available via WhatsApp & Email</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search astrologers by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Specialty Filters */}
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-muted/50">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Debug Info</h3>
            <p className="text-sm text-yellow-700">
              Astrologers loaded: {astrologers.length} | 
              Loading: {loading ? 'Yes' : 'No'} | 
              Filtered: {filteredAstrologers.length}
            </p>
            {astrologers.length > 0 && (
              <p className="text-xs text-yellow-600 mt-1">
                Sample: {astrologers[0]?.name} - {astrologers[0]?.availability_status}
              </p>
            )}
          </div>
        )}

        {/* Online Banner */}
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-700 font-medium">
              {filteredAstrologers.filter(a => a.availability_status === 'online').length} astrologers online now
            </span>
          </div>
          <Button variant="saffron" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Phone className="w-4 h-4" />
            Quick Connect
          </Button>
        </div>

        {/* Astrologer Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAstrologers.map((astrologer) => (
            <div key={astrologer.id} className="card-spiritual p-6 hover:shadow-elevated transition-all">
              {/* Header with Avatar & Status */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-saffron flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                    {astrologer.photo_url ? (
                      <img src={astrologer.photo_url} alt={astrologer.name} className="w-full h-full object-cover" />
                    ) : (
                      astrologer.name.charAt(0)
                    )}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${getStatusColor(astrologer.availability_status)}`}>
                    {astrologer.availability_status === 'online' ? (
                      <span className="w-3 h-3 rounded-full bg-white" />
                    ) : (
                      <Clock className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <h3 className="font-semibold text-foreground font-hindi">{astrologer.name}</h3>
                    {astrologer.is_verified && <CheckCircle className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{astrologer.english_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{astrologer.rating}</span>
                    <span className="text-xs text-muted-foreground">({astrologer.total_reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(astrologer.availability_status)}`}>
                      {getStatusText(astrologer.availability_status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-3">
                {astrologer.specialties?.map((spec) => (
                  <span key={spec} className="px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>{astrologer.experience_years}+ years</span>
                <span>•</span>
                <span>{astrologer.total_consultations?.toLocaleString()}+ consultations</span>
              </div>

              {/* Languages */}
              <p className="text-sm text-muted-foreground mb-4">
                Languages: {astrologer.languages?.join(', ')}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {astrologer.description}
              </p>

              {/* Price & Contact Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-2xl font-bold text-primary">₹{astrologer.price_per_minute}</span>
                  <span className="text-sm text-muted-foreground">/min</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="spiritual" 
                    size="sm"
                    onClick={() => handleWhatsAppContact(astrologer.whatsapp_number || '', astrologer.name)}
                    disabled={!astrologer.whatsapp_number}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="saffron" 
                    size="sm"
                    onClick={() => handleEmailContact(astrologer.email_address || '', astrologer.name)}
                    disabled={!astrologer.email_address}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>

              {/* Admin Controls */}
              {isCurrentUserAdmin && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Admin Controls:</p>
                  <div className="flex gap-2">
                    {['online', 'busy', 'offline'].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={astrologer.availability_status === status ? "default" : "outline"}
                        onClick={() => updateAvailability(astrologer.id, status)}
                        className="text-xs"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAstrologers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No astrologers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 p-6 lg:p-10 rounded-2xl bg-gradient-saffron text-white text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Need Immediate Guidance? 🌟</h2>
          <p className="text-white/80 mb-6">Our expert astrologers are available via WhatsApp and Email for personalized consultations</p>
          <Button variant="gold" size="xl" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Contact Our Astrologers
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Astrologers;
