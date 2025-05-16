import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HeroSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "URBAN ESSENTIALS",
      subtitle: "COLLECTION 2023"
    },
    {
      image: "https://images.unsplash.com/photo-1526398977052-654221a252b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "STREET ICONS",
      subtitle: "LIMITED EDITION"
    },
    {
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
      title: "MONOCHROME",
      subtitle: "PREMIUM SERIES"
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

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

  const slideVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
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
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut",
      }
    },
    hover: {
      backgroundColor: "#ffffff",
      color: "#000000",
      x: 5,
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
      {/* Hero background images with slider */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
          style={{ 
            backgroundImage: `url('${slide.image}')`,
            zIndex: index === currentSlide ? 1 : 0
          }}
          initial="hidden"
          animate={index === currentSlide ? "visible" : "hidden"}
          variants={slideVariants}
          ref={index === 0 ? heroRef : undefined}
        />
      ))}
      
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      <div className="absolute inset-0 z-20">
        <div className="container mx-auto h-full flex flex-col justify-center px-4 lg:px-20">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-6xl md:text-8xl font-montserrat font-black uppercase leading-none mb-4 text-stroke"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              key={`title-${currentSlide}`}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-montserrat uppercase tracking-widest mb-10"
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
              key={`subtitle-${currentSlide}`}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <div className="flex space-x-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                whileHover="hover"
              >
                <Link 
                  href="#collections" 
                  className="bg-white text-black inline-block px-10 py-3 font-montserrat uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 flex items-center"
                  data-hover="true"
                >
                  <span>Shop Now</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                whileHover="hover"
                className="hidden md:block"
              >
                <Link 
                  href="#prelaunch" 
                  className="border border-white inline-block px-10 py-3 font-montserrat uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
                  data-hover="true"
                >
                  Get 10% Off
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide indicator dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'} transition-all duration-300`}
            onClick={() => setCurrentSlide(index)}
            data-hover="true"
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:block">
        <div className="text-sm font-montserrat uppercase tracking-widest rotate-90 transform origin-bottom-right flex items-center">
          <span>Scroll</span>
          <i className="fas fa-long-arrow-alt-down ml-2 scroll-indicator"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
