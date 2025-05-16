import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HeroSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const parallaxBg = heroRef.current.querySelector('.parallax-bg') as HTMLElement;
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        delay: 0.3,
        ease: "easeOut",
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        delay: 0.6,
        ease: "easeOut",
      }
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "#000",
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    }
  };

  return (
    <section 
      className="h-screen relative overflow-hidden" 
      id="hero"
      ref={ref}
    >
      {/* Hero background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter parallax-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" }}
        ref={heroRef}
      ></div>
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-9xl font-playfair font-bold leading-none mb-6 animate-pulse-slow"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <span className="block">REDEFINE</span>
          <span className="block">LUXURY</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl font-cormorant tracking-widest mb-12"
          initial="hidden"
          animate={controls}
          variants={subtitleVariants}
        >
          FALL COLLECTION 2023
        </motion.p>
        
        <motion.div
          initial="hidden"
          animate={controls}
          variants={buttonVariants}
          whileHover="hover"
        >
          <Link 
            href="#collections" 
            className="glass-card inline-block px-10 py-3 font-montserrat uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500"
            data-hover="true"
          >
            Discover
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <i className="fas fa-chevron-down animate-bounce"></i>
      </div>
    </section>
  );
};

export default HeroSection;
