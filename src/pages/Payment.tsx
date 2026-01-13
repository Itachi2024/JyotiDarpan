import { useState } from 'react';
import { QrCode, Shield, CheckCircle, Star, Users, Award, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UPIQRCode from '@/components/UPIQRCode';
import GenericUPIQR from '@/components/GenericUPIQR';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [showQR, setShowQR] = useState(false);

  const predefinedAmounts = [100, 250, 1000, 2000, 5000];

  const trustFeatures = [
    {
      icon: Shield,
      title: "100% Secure Payments",
      description: "Your payments are protected with bank-level security"
    },
    {
      icon: CheckCircle,
      title: "Verified Astrologers",
      description: "All our astrologers are verified and experienced professionals"
    },
    {
      icon: Star,
      title: "5+ Years Experience",
      description: "Trusted by thousands of satisfied customers since 2019"
    },
    {
      icon: Users,
      title: "50,000+ Happy Clients",
      description: "Join our growing community of satisfied users"
    },
    {
      icon: Award,
      title: "Authentic Vedic Guidance",
      description: "Traditional Vedic astrology with modern convenience"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your queries"
    }
  ];

  const birthChartBenefits = [
    "Understand your personality traits and natural tendencies",
    "Discover your life purpose and spiritual path",
    "Get insights into career opportunities and challenges",
    "Learn about relationship compatibility and marriage timing",
    "Identify favorable periods for important decisions",
    "Understand health patterns and preventive measures",
    "Get personalized remedies for planetary doshas",
    "Plan important events with auspicious timing"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Secure Payment Gateway
          </h1>
          <p className="text-muted-foreground text-lg">
            Scan the QR code below for instant payment, or select a specific amount for a custom QR
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Payment Section */}
          <Card className="card-spiritual">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-6 h-6 text-primary" />
                UPI Payment Gateway
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Conditional QR Display */}
              {!showQR ? (
                <>
                  {/* Generic UPI QR Code - Initial Display */}
                  <GenericUPIQR 
                    upiId="9799104619@ptsbi"
                    merchantName="AstroRishabh"
                  />
                  
                  {/* WhatsApp Community Link */}
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 mb-2">
                      📱 Join our WhatsApp Community for updates & tips
                    </p>
                    <a 
                      href="https://chat.whatsapp.com/Crta3YFj4MfFlv1HxLMIsq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium text-sm underline"
                    >
                      Follow this link to join my WhatsApp community
                    </a>
                  </div>
                  
                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or select specific amount</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Custom Amount UPI QR Code */}
                  <UPIQRCode
                    amount={selectedAmount}
                    upiId="9799104619@ptsbi"
                    merchantName="AstroRishabh"
                    onCancel={() => setShowQR(false)}
                  />
                  
                  {/* WhatsApp Community Link */}
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 mb-2">
                      📱 Join our WhatsApp Community for updates & tips
                    </p>
                    <a 
                      href="https://chat.whatsapp.com/Crta3YFj4MfFlv1HxLMIsq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium text-sm underline"
                    >
                      Follow this link to join my WhatsApp community
                    </a>
                  </div>
                </>
              )}

              {/* Amount Selection - Always Visible */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Amount (₹)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAmount === amount
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    placeholder="Enter custom amount"
                    className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    min="50"
                    max="50000"
                  />
                  <Button 
                    onClick={() => setShowQR(true)}
                    variant="saffron"
                    disabled={selectedAmount < 50}
                  >
                    {showQR ? 'Update QR' : 'Generate QR'}
                  </Button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-medium">Accepted Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">UPI</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">PhonePe</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Google Pay</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Paytm</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">BHIM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust & Information Section */}
          <div className="space-y-6">
            {/* Trust Features */}
            <Card className="card-spiritual">
              <CardHeader>
                <CardTitle>Why Trust AstroRishabh?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {trustFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Birth Chart Benefits */}
            <Card className="card-spiritual">
              <CardHeader>
                <CardTitle>How Birth Chart Analysis Helps You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {birthChartBenefits.map((benefit, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <h4 className="font-medium mb-2">🌟 Special Offer</h4>
                  <p className="text-sm text-muted-foreground">
                    Get your complete birth chart analysis with detailed insights. 
                    Includes planetary positions, doshas, and personalized remedies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            <span>SSL Encrypted • 100% Secure • No Hidden Charges</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;