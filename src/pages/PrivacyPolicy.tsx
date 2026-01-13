import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Privacy</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="card-spiritual p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number</li>
                <li><strong>Birth Details:</strong> Date, time, and place of birth for astrology calculations</li>
                <li><strong>Communication:</strong> Messages, consultation history, and feedback</li>
                <li><strong>Payment Information:</strong> Transaction details (processed securely)</li>
                <li><strong>Usage Data:</strong> How you interact with our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Providing accurate astrology consultations and predictions</li>
                <li>Generating personalized horoscopes and kundli reports</li>
                <li>Processing payments and managing your account</li>
                <li>Communicating with you about services and updates</li>
                <li>Improving our services and user experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information. We may share information only in these cases:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>With Astrologers:</strong> Birth details necessary for consultation</li>
                <li><strong>Service Providers:</strong> Trusted partners who help operate our services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
                <li><strong>Business Transfer:</strong> In case of merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information for as long as necessary to provide services and comply with legal obligations. 
                You can request deletion of your account and associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party services. We are not responsible for their privacy 
                practices. Please review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under 18. We do not knowingly collect personal 
                information from children. If you believe we have collected such information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy periodically. We will notify users of significant changes 
                and post the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about this Privacy Policy or your personal information:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">📧 Email: rishabhdadhich21@gmail.com</p>
                <p className="text-muted-foreground">📞 Phone: +91 97991 04619</p>
                <p className="text-muted-foreground">💬 WhatsApp: +91 97991 04619</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;