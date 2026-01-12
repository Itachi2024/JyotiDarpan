import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hello! I would like to know more about your astrology services.');
    const whatsappUrl = `https://wa.me/+919799104619?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent('Inquiry about Astrology Services');
    const body = encodeURIComponent('Hello,\n\nI would like to know more about your astrology services.\n\nThank you.');
    const emailUrl = `mailto:shreedarshanjyoti@gmail.com?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">संपर्क</span> करें
          </h1>
          <p className="text-muted-foreground">Contact Us • We're here to help with all your astrology needs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our astrology services? Need guidance from our expert astrologers? 
                We're here to help you on your spiritual journey.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Get instant responses to your queries
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleWhatsAppContact}
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm mb-1">shreedarshanjyoti@gmail.com</p>
                  <p className="text-muted-foreground text-sm mb-3">
                    Send us detailed queries via email
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEmailContact}
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground text-sm mb-1">+91 97991 04619</p>
                  <p className="text-muted-foreground text-sm">
                    Available 24/7 for urgent consultations
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card-spiritual p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-primary">
                  🌟 Emergency consultations available 24/7 via WhatsApp
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-spiritual p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      required
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="saffron" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. 
                    We'll only use your information to respond to your inquiry.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quick Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant answers via WhatsApp
            </p>
            <Button variant="outline" size="sm" onClick={handleWhatsAppContact}>
              Start Chat
            </Button>
          </div>

          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Talk Now</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Speak directly with our astrologers
            </p>
           <Button
  variant="outline"
  size="sm"
  onClick={() => {
    toast.info("Calling now...");
    window.location.href = "tel:+919799104619";
  }}
>
  Call Now
</Button>

          </div>

          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed queries and support
            </p>
            <Button variant="outline" size="sm" onClick={handleEmailContact}>
              Send Email
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;