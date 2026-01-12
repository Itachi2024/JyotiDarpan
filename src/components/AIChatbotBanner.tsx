import { Bot, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIChatbotBanner = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-secondary via-maroon to-secondary">
          {/* Background Pattern */}
          <div className="absolute inset-0 mandala-pattern opacity-10" />
          
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative px-6 py-10 lg:px-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-white">AI Powered</span>
                </div>

                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                  🤖 AI ज्योतिष सहायक
                </h2>
                <p className="text-lg text-white/90 mb-2">AI Astrology Assistant</p>
                <p className="text-white/70 mb-6 max-w-md mx-auto lg:mx-0">
                  Get instant answers about your Rashifal, Kundli, Muhurat and more in Hindi & English. Available 24/7.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="gold" size="lg" className="shadow-gold">
                    <Bot className="w-5 h-5" />
                    Start AI Chat
                  </Button>
                  <Button variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                  {['Instant Rashifal', 'Muhurat Finder', 'Kundli Queries', 'Remedies'].map((feature) => (
                    <span key={feature} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chat Preview */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent z-10 rounded-2xl" />
                <div className="bg-card rounded-2xl p-4 shadow-elevated max-w-sm mx-auto">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-border mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-saffron flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">AI ज्योतिष बॉट</p>
                      <p className="text-xs text-green-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Online
                      </p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%]">
                        <p className="text-sm">मेरा आज का राशिफल बताइए</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                        <p className="text-sm text-foreground">
                          आपकी राशि क्या है? कृपया अपनी राशि चुनें या जन्मतिथि बताएं।
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm">
                        <p className="text-sm">मेष राशि</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                        <p className="text-sm text-foreground">
                          🐏 <strong>मेष राशिफल:</strong> आज का दिन शुभ है। करियर में नई संभावनाएं...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className="flex-1 px-4 py-2 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatbotBanner;
