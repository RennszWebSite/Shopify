import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "NEW ARRIVALS", href: "/#collections" },
    { name: "SHOP ALL", href: "/#lookbook" },
    { name: "COLLECTIONS", href: "/#collections" },
    { name: "LOOKBOOK", href: "/#lookbook" },
    { name: "ABOUT", href: "/#atelier" }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="marquee bg-black border-b border-white border-opacity-10">
        <div className="marquee-content py-2 flex items-center">
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className="marquee-item font-bebas tracking-wider text-sm">
              FREE WORLDWIDE SHIPPING ON ORDERS OVER $150
              <span className="mx-4">•</span>
              JOIN THE MOVEMENT
              <span className="mx-4">•</span>
              NEW DROP COMING SOON
              <span className="mx-4">•</span>
            </div>
          ))}
        </div>
      </div>
      
      <header 
        className={`fixed top-10 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-2" 
            : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main Navigation */}
          <div className="relative flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-50 flex items-center" 
              data-hover="true"
            >
              <h1 
                className="text-4xl md:text-5xl font-bebas tracking-wider glitch-effect" 
                data-text="FROZO"
              >
                FROZO
              </h1>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-8 font-bebas text-xl tracking-wider">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href} 
                      className="py-2 relative hover:text-opacity-70 transition-all duration-200" 
                      data-hover="true"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Cart & Menu Toggle */}
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="relative font-bebas text-lg flex items-center space-x-2 hover:text-opacity-70 transition-colors duration-200" 
                data-hover="true"
              >
                <span>CART</span>
                <span className="inline-flex items-center justify-center w-5 h-5 text-sm border border-white">0</span>
              </a>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden relative z-50 text-white hover:text-opacity-70 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                data-hover="true"
              >
                <span className="font-bebas text-lg">
                  {isMobileMenuOpen ? "CLOSE" : "MENU"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black distorted-bg"
            initial={{ clipPath: "circle(0% at top right)" }}
            animate={{ clipPath: "circle(150% at top right)" }}
            exit={{ clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto px-4 pt-28 pb-10 h-full flex flex-col">
              <ul className="space-y-6 font-bebas text-5xl tracking-wide text-left flex flex-col">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Link 
                      href={item.href} 
                      className="relative block py-2 group overflow-hidden" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <span className="inline-block text-sm mr-4 opacity-60">0{index + 1}</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="w-full h-px bg-white bg-opacity-20 mt-2"></div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                className="mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bebas mb-4 text-opacity-60">FOLLOW US</h3>
                    <div className="flex space-x-6">
                      <a href="#" className="text-2xl hover:text-opacity-70 transition-colors duration-200" data-hover="true">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="text-2xl hover:text-opacity-70 transition-colors duration-200" data-hover="true">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="text-2xl hover:text-opacity-70 transition-colors duration-200" data-hover="true">
                        <i className="fab fa-tiktok"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bebas mb-4 text-opacity-60">CONTACT</h3>
                    <a href="mailto:info@frozo.com" className="block hover:text-opacity-70 transition-colors duration-200" data-hover="true">
                      INFO@FROZO.COM
                    </a>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white border-opacity-10 text-xs text-opacity-60">
                  © {new Date().getFullYear()} FROZO. ALL RIGHTS RESERVED.
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>
    </>
  );
};

export default Header;
