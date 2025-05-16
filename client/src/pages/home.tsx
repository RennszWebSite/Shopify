import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import PrelaunchSignup from "@/components/home/prelaunch-signup";
import FeaturedCollections from "@/components/home/featured-collections";
import ProductShowcase from "@/components/home/product-showcase";
import LookbookSection from "@/components/home/lookbook-section";
import AtelierSection from "@/components/home/atelier-section";
import NewsletterSection from "@/components/home/newsletter-section";
import CountdownTimer from "@/components/home/countdown-timer";
import { useAnimationPreloader } from "@/hooks/use-animation-preloader";

const Home = () => {
  const { isLoading } = useAnimationPreloader();

  useEffect(() => {
    // Smooth scroll functionality
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        
        const targetId = link.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Set drop date to 7 days from now for the limited edition timer
  const dropDate = new Date();
  dropDate.setDate(dropDate.getDate() + 7);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="frozo-logo-path" d="M20 20 H80 V40 H20 V80 H80" stroke="#F5F5F5" strokeWidth="2" />
          </svg>
          <div className="absolute bottom-0 left-0 w-full text-center font-cormorant tracking-widest">FROZO</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        
        {/* Limited Edition Drop Countdown */}
        <div className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <CountdownTimer 
              endDate={dropDate} 
              title="MIDNIGHT COLLECTION DROP" 
              subtitle="LIMITED EDITION PIECES - EXCLUSIVE EARLY ACCESS"
            />
          </div>
        </div>
        
        <PrelaunchSignup />
        <FeaturedCollections />
        <ProductShowcase />
        <LookbookSection />
        <AtelierSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
