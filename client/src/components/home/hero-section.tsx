import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const heroContent = [
    {
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      heading: "DREAM IN BLACK",
      subheading: "SS23 Collection",
      description: "FROZO'S LATEST COLLECTION IS HERE"
    },
    {
      image: "https://images.unsplash.com/photo-1583744946564-b52d01a7b430?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      heading: "UNLOCK THE VISION",
      subheading: "New Arrivals",
      description: "LIMITED EDITION DROPS"
    },
    {
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      heading: "REDEFINE YOURSELF",
      subheading: "Premium Collection",
      description: "EXCLUSIVE STREETWEAR FOR THE BOLD"
    }
  ];

  useEffect(() => {
    // Auto rotate
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroContent.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [heroContent.length]);

  // Glitch text animation effect
  useEffect(() => {
    const textElements = document.querySelectorAll('.glitch-text');
    
    const applyGlitch = () => {
      textElements.forEach((el) => {
        const originalText = el.textContent || '';
        let distortedText = '';
        
        // Randomly distort characters
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.1) {
            const charCode = originalText.charCodeAt(i) + Math.floor(Math.random() * 10) - 5;
            distortedText += String.fromCharCode(charCode);
          } else {
            distortedText += originalText[i];
          }
        }
        
        el.textContent = distortedText;
        
        // Reset back to original text
        setTimeout(() => {
          el.textContent = originalText;
        }, 100);
      });
    };
    
    // Apply glitch effect at random intervals
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        applyGlitch();
      }
    }, 2000);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, [activeIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={heroRef}>
      {/* Background video noise layer */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10 distorted-bg"></div>
      
      {/* Hero content */}
      {heroContent.map((content, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === activeIndex ? 1 : 0,
            transition: { duration: 0.8 }
          }}
        >
          {/* Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={content.image} 
              alt={content.heading} 
              className="w-full h-full object-cover object-center filter brightness-50"
            />
          </div>
          
          {/* Content container */}
          <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 pt-24">
            <div className="max-w-6xl">
              {/* Glitch effect subheading */}
              <motion.div 
                className="overflow-hidden mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="inline-block font-anton text-xl md:text-2xl tracking-wide text-white text-opacity-70">
                  {content.subheading}
                </span>
              </motion.div>
              
              {/* Large headline with distorted text effect */}
              <motion.h1 
                className="text-7xl md:text-[10rem] leading-none font-anton uppercase mb-6 glitch-text text-outline tracking-tighter"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                data-text={content.heading}
              >
                {content.heading}
              </motion.h1>
              
              {/* Description */}
              <motion.div 
                className="mb-10 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="inline-block text-lg md:text-xl font-bebas tracking-widest">
                  {content.description}
                </span>
              </motion.div>
              
              {/* CTA buttons */}
              <motion.div 
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link 
                  href="#showcase" 
                  className="frozo-button border-2 hover:text-black z-10"
                  data-hover="true"
                >
                  SHOP NOW
                </Link>
                
                <Link 
                  href="#prelaunch" 
                  className="frozo-button border border-white border-opacity-30 hover:border-opacity-100 hover:text-black z-10"
                  data-hover="true"
                >
                  SIGN UP FOR 10% OFF
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Slide navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-4">
        {heroContent.map((_, index) => (
          <button 
            key={index}
            className={`w-10 h-2 transition-all duration-300 hover:bg-white ${
              index === activeIndex ? 'bg-white' : 'bg-white bg-opacity-30'
            }`}
            onClick={() => setActiveIndex(index)}
            data-hover="true"
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-30">
        <a 
          href="#showcase" 
          className="font-bebas text-sm tracking-widest flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-200"
          data-hover="true"
        >
          <span className="mb-2">SCROLL</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
      
      {/* Fixed social links */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 hidden md:block">
        <div className="flex flex-col space-y-6">
          <a 
            href="#" 
            className="text-lg text-white text-opacity-60 hover:text-opacity-100 transition-colors duration-200" 
            data-hover="true"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href="#" 
            className="text-lg text-white text-opacity-60 hover:text-opacity-100 transition-colors duration-200" 
            data-hover="true"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a 
            href="#" 
            className="text-lg text-white text-opacity-60 hover:text-opacity-100 transition-colors duration-200" 
            data-hover="true"
          >
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
