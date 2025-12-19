import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Cart } from "./components/Cart";
import { ScrollToTop } from "./components/ScrollToTop";
import { BackToTop } from "./components/BackToTop";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { SubscriptionBanner } from "./components/SubscriptionBanner";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AffirmationBuilder from "./pages/AffirmationBuilder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import NotFound from "./pages/NotFound";
import AdminImageGen from "./pages/AdminImageGen";
import AdminAffirmationGen from "./pages/AdminAffirmationGen";
import AdminAffirmationDigital from "./pages/AdminAffirmationDigital";
import AdminImageReview from "./pages/AdminImageReview";
import AdminAffirmationMockups from "./pages/AdminAffirmationMockups";
import ImageRandomizer from "./pages/ImageRandomizer";
import OurStory from "./pages/OurStory";
import Sustainability from "./pages/Sustainability";
import Reviews from "./pages/Reviews";
import Wholesale from "./pages/Wholesale";
import CustomOrders from "./pages/CustomOrders";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<ArticleDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/affirmation-builder" element={<AffirmationBuilder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/custom-orders" element={<CustomOrders />} />
        <Route path="/admin/imagegen" element={<AdminImageGen />} />
        <Route path="/admin/affirmations" element={<AdminAffirmationGen />} />
        <Route path="/admin/affirmation-digital" element={<AdminAffirmationDigital />} />
        <Route path="/admin/image-review" element={<AdminImageReview />} />
        <Route path="/admin/affirmation-mockups" element={<AdminAffirmationMockups />} />
        <Route path="/admin/image-randomizer" element={<ImageRandomizer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <PromotionalBanner onBannerClick={() => setPopupOpen(true)} />
      <Header />
      <AnimatedRoutes />
      <Footer />
      <Cart />
      <BackToTop />
      <SubscriptionBanner 
        externalOpen={popupOpen} 
        onExternalOpenChange={setPopupOpen} 
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
