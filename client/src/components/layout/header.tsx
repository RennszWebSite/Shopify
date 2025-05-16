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

  return (
    <header className={`fixed top-0 w-full z-40 glass-nav transition-all duration-500 ${
      isScrolled ? "py-2" : "py-4"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-24 text-center">
          <Link href="/" className="block font-cormorant font-light text-xl tracking-widest text-frozo-white hover:text-opacity-80 transition-all" data-hover="true">FROZO</Link>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-10 font-montserrat text-sm tracking-wider text-frozo-white text-opacity-80">
            <li>
              <Link href="/#collections" className="hover:text-opacity-100 transition-all" data-hover="true">COLLECTIONS</Link>
            </li>
            <li>
              <Link href="/#lookbook" className="hover:text-opacity-100 transition-all" data-hover="true">LOOKBOOK</Link>
            </li>
            <li>
              <Link href="/#atelier" className="hover:text-opacity-100 transition-all" data-hover="true">ATELIER</Link>
            </li>
            <li>
              <Link href="/#store" className="hover:text-opacity-100 transition-all" data-hover="true">STORE</Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="text-frozo-white text-opacity-80 hover:text-opacity-100 transition-all" data-hover="true">
            <i className="fas fa-search text-sm"></i>
          </a>
          <a href="#" className="text-frozo-white text-opacity-80 hover:text-opacity-100 transition-all" data-hover="true">
            <i className="fas fa-user text-sm"></i>
          </a>
          <a href="#" className="text-frozo-white text-opacity-80 hover:text-opacity-100 transition-all" data-hover="true">
            <i className="fas fa-shopping-bag text-sm"></i>
          </a>
          <button 
            className="md:hidden text-frozo-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden w-full glass-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="container mx-auto px-4 py-6 space-y-4 font-montserrat text-sm tracking-wider text-frozo-white text-opacity-80">
              <motion.li 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link href="/#collections" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
              </motion.li>
              <motion.li 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/#lookbook" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>LOOKBOOK</Link>
              </motion.li>
              <motion.li 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/#atelier" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>ATELIER</Link>
              </motion.li>
              <motion.li 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/#store" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>STORE</Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
