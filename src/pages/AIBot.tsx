import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type Message = { role: 'user' | 'assistant'; content: string };

const AIBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'नमस्ते! 🙏 मैं आपका AI ज्योतिष सहायक हूं। आप मुझसे राशिफल, कुंडली, मुहूर्त या किसी भी ज्योतिष संबंधी प्रश्न पूछ सकते हैं।\n\nHello! I am your AI Astrology Assistant. Ask me about Rashifal, Kundli, Muhurat or any astrology-related questions.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('ai-astrology', {
        body: { messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) }
      });

      if (response.error) throw response.error;
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'क्षमा करें, कुछ त्रुटि हुई। कृपया पुनः प्रयास करें।\n\nSorry, an error occurred. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'मेरा आज का राशिफल बताइए',
    'What is Rahu Kaal today?',
    'विवाह के लिए शुभ मुहूर्त',
    'Career prediction for Aries'
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Astrology Bot</span>
          </div>
          <h1 className="text-2xl font-bold">🤖 AI ज्योतिष सहायक</h1>
        </div>

        {/* Chat Container */}
        <div className="flex-1 card-spiritual p-4 mb-4 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-saffron flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-sm' 
                    : 'bg-muted rounded-bl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-saffron flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="अपना प्रश्न पूछें / Ask your question..."
              className="flex-1 px-4 py-3 rounded-xl bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <Button variant="saffron" size="icon" className="w-12 h-12" onClick={sendMessage} disabled={isLoading}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIBot;
