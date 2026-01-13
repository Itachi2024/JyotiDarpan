import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RefreshCw } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Refunds</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          {/* Content */}
          <div className="card-spiritual p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. General Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                At AstroRishabh, we strive to provide high-quality astrology services. We understand that sometimes 
                you may need to request a refund. This policy outlines the conditions under which refunds are available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Consultation Services</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.1 Before Consultation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Full refund available if you cancel at least 2 hours before your scheduled consultation time.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.2 During Consultation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If technical issues prevent the consultation from proceeding, we will offer a full refund or 
                    reschedule at no additional cost.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">2.3 After Consultation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Refunds are generally not available after a consultation has been completed. However, we will 
                    consider refunds in exceptional circumstances.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Digital Products</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">3.1 Kundli Reports</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Refunds available within 24 hours of purchase if the report contains significant errors 
                    due to our system malfunction.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">3.2 Horoscope Subscriptions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Partial refunds available for unused portions of subscription services if cancelled 
                    within the first 7 days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Non-Refundable Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following services are generally non-refundable:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Completed consultation sessions</li>
                <li>Downloaded digital reports and content</li>
                <li>Services used for more than 7 days</li>
                <li>Customized remedial solutions</li>
                <li>Emergency or urgent consultations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Refund Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.1 How to Request</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Contact us within the applicable refund period via email, phone, or WhatsApp with your 
                    order details and reason for refund.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.2 Processing Time</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Approved refunds will be processed within 5-7 business days to your original payment method.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">5.3 Refund Amount</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Refunds will be issued for the amount paid, minus any applicable processing fees 
                    (typically 2-3% for payment gateway charges).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Exceptional Circumstances</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may consider refunds outside our standard policy in cases of:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Technical failures on our end</li>
                <li>Astrologer unavailability without prior notice</li>
                <li>Significant service quality issues</li>
                <li>Medical emergencies or family crises</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you're not satisfied with our refund decision, you can escalate the matter to our senior 
                management team. We are committed to fair and reasonable resolution of all disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this refund policy at any time. Changes will be effective 
                immediately upon posting on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact for Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund or discuss any concerns:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">📧 Email: rishabhdadhich21@gmail.com</p>
                <p className="text-muted-foreground">📞 Phone: +91 97991 04619</p>
                <p className="text-muted-foreground">💬 WhatsApp: +91 97991 04619</p>
                <p className="text-muted-foreground">⏰ Support Hours: 9 AM - 9 PM (IST)</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;