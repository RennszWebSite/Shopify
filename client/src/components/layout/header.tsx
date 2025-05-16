import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import FrozoLogo from "../ui/frozo-logo";

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
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-black bg-opacity-95 backdrop-blur-md py-2 shadow-lg" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="relative z-50 flex items-center group" 
          data-hover="true"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold tracking-widest">FROZO</span>
            </motion.div>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 font-montserrat text-sm tracking-wider">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className="py-2 relative group" 
                  data-hover="true"
                >
                  <span className="text-white text-opacity-90 group-hover:text-opacity-100 transition-colors duration-300">
                    {item.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-5 md:space-x-6">
          <a 
            href="#" 
            className="hidden md:block relative text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300" 
            data-hover="true"
          >
            <i className="fas fa-search text-sm"></i>
          </a>
          <a 
            href="#" 
            className="hidden md:block relative text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300" 
            data-hover="true"
          >
            <i className="fas fa-user text-sm"></i>
          </a>
          <a 
            href="#" 
            className="relative text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300" 
            data-hover="true"
          >
            <i className="fas fa-shopping-bag text-sm"></i>
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-white text-black text-xs flex items-center justify-center rounded-full">0</span>
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-50 text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            data-hover="true"
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span 
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                }`}
              ></span>
              <span 
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span 
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container mx-auto px-4 pt-20 pb-10 h-full flex flex-col">
              <ul className="space-y-6 font-montserrat text-lg tracking-wider text-center flex-grow flex flex-col justify-center">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Link 
                      href={item.href} 
                      className="block py-2 text-white text-opacity-90 hover:text-opacity-100 transition-colors duration-300" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-auto flex justify-center space-x-6 text-white text-opacity-60">
                <a href="#" className="hover:text-opacity-100 transition-colors duration-300" data-hover="true">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="hover:text-opacity-100 transition-colors duration-300" data-hover="true">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="hover:text-opacity-100 transition-colors duration-300" data-hover="true">
                  <i className="fab fa-tiktok text-xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
