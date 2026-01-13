import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Important Notice</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="card-spiritual p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Nature of Astrology Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                AstroRishabh provides astrology consultations, predictions, and related services based on Vedic 
                astrology principles. These services are intended for guidance, entertainment, and spiritual purposes only. 
                Astrology is an ancient practice that interprets celestial influences on human affairs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. No Guarantee of Accuracy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While our astrologers are experienced and knowledgeable, we cannot guarantee the accuracy of:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Predictions about future events</li>
                <li>Timing of predicted occurrences</li>
                <li>Specific outcomes or results</li>
                <li>Success of recommended remedies</li>
                <li>Compatibility assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Not a Substitute for Professional Advice</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our astrology services should NOT be used as a substitute for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Medical Advice:</strong> Consult qualified healthcare professionals for health issues</li>
                <li><strong>Legal Advice:</strong> Seek licensed attorneys for legal matters</li>
                <li><strong>Financial Advice:</strong> Consult certified financial advisors for investment decisions</li>
                <li><strong>Mental Health Support:</strong> Contact licensed therapists for psychological concerns</li>
                <li><strong>Emergency Services:</strong> Call appropriate emergency services in crisis situations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Personal Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users are solely responsible for their decisions and actions. AstroRishabh and its astrologers 
                provide guidance based on astrological interpretations, but the final decision-making responsibility 
                rests with the individual. We encourage users to use their own judgment and consider multiple 
                perspectives before making important life decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                AstroRishabh, its astrologers, and affiliates shall not be held liable for any direct, indirect, 
                incidental, consequential, or punitive damages arising from the use of our services, including but 
                not limited to financial losses, relationship issues, career decisions, or any other life outcomes 
                influenced by our consultations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Remedial Solutions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Astrological remedies suggested by our astrologers are traditional practices that may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Gemstone recommendations</li>
                <li>Mantra chanting</li>
                <li>Ritual practices</li>
                <li>Lifestyle modifications</li>
                <li>Charitable activities</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The effectiveness of these remedies is not scientifically proven and results may vary. 
                Users should exercise discretion and consult appropriate professionals when needed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Age Restrictions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are intended for individuals aged 18 and above. Minors should seek parental 
                guidance before using our services. We do not provide consultations that may negatively 
                impact a minor's well-being or decision-making.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cultural and Religious Sensitivity</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are based on Vedic astrology traditions. We respect all cultures and religions 
                but cannot guarantee compatibility with all belief systems. Users from different cultural 
                backgrounds should consider this when seeking our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Technology and Data Accuracy</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we use advanced software for astrological calculations, technical errors may occasionally 
                occur. Users are encouraged to verify birth details and report any discrepancies. We are not 
                responsible for errors resulting from incorrect birth information provided by users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Ethical Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our astrologers follow ethical guidelines and will not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Predict death or serious illness</li>
                <li>Encourage harmful or illegal activities</li>
                <li>Guarantee specific outcomes</li>
                <li>Exploit vulnerable individuals</li>
                <li>Provide medical diagnoses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this disclaimer at any time. Users are advised to review 
                this page periodically for updates. Continued use of our services after changes constitutes 
                acceptance of the modified disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about this disclaimer or our services:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">📧 Email: rishabhdadhich21@gmail.com</p>
                <p className="text-muted-foreground">📞 Phone: +91 97991 04619</p>
                <p className="text-muted-foreground">💬 WhatsApp: +91 97991 04619</p>
              </div>
            </section>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Reminder</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    By using AstroRishabh services, you acknowledge that you have read, understood, and agree 
                    to this disclaimer. Astrology is a tool for guidance and self-reflection, not a definitive 
                    predictor of future events. Always use your own judgment and seek appropriate professional 
                    advice when making important life decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;