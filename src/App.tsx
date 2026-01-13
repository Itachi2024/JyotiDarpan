import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SupabaseStatus } from "@/components/SupabaseStatus";
import "@/utils/testApi"; // Import test utilities
import Index from "./pages/Index";
import Horoscope from "./pages/Horoscope";
import Kundli from "./pages/Kundli";
import MatchMaking from "./pages/MatchMaking";
import Panchang from "./pages/Panchang";
import Muhurta from "./pages/Muhurta";
import AstrologersNew from "./pages/AstrologersNew";
import Services from "./pages/Services";
import Payment from "./pages/Payment";
import Shop from "./pages/Shop";
import Remedies from "./pages/Remedies";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SupabaseStatus />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/kundli" element={<Kundli />} />
            <Route path="/match-making" element={<MatchMaking />} />
            <Route path="/panchang" element={<Panchang />} />
            <Route path="/muhurta" element={<Muhurta />} />
            <Route path="/astrologers" element={<AstrologersNew />} />
            <Route path="/services" element={<Services />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/remedies" element={<Remedies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
