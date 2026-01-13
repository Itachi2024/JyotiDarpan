import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Legal</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="card-spiritual p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using AstroRishabh services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Services Provided</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AstroRishabh provides astrology consultation services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Horoscope readings and predictions</li>
                <li>Kundli (birth chart) generation and analysis</li>
                <li>Match making and compatibility analysis</li>
                <li>Panchang and muhurat consultation</li>
                <li>Personal astrology consultations</li>
                <li>Remedial solutions and guidance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate birth details for precise calculations</li>
                <li>Use services for personal guidance only</li>
                <li>Respect our astrologers and maintain professional communication</li>
                <li>Not share or distribute our proprietary content</li>
                <li>Not use services for illegal or harmful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Consultation Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our astrology consultations are provided for guidance and entertainment purposes. Please note:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Consultations are based on Vedic astrology principles</li>
                <li>Results may vary and are not guaranteed</li>
                <li>Astrology should not replace professional medical, legal, or financial advice</li>
                <li>We encourage users to make informed decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We respect your privacy and protect your personal information. Your birth details and consultation 
                history are kept confidential and used only for providing astrology services. Please refer to our 
                Privacy Policy for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Payments are processed securely through UPI and other payment gateways</li>
                <li>Consultation fees are clearly mentioned before booking</li>
                <li>Refunds are subject to our Refund Policy</li>
                <li>We reserve the right to modify pricing with prior notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                AstroRishabh and its astrologers shall not be liable for any direct, indirect, incidental, 
                consequential, or punitive damages arising from the use of our services. Our services are 
                provided "as is" without any warranties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of significant 
                changes, and continued use of services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us:
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

export default TermsOfService;