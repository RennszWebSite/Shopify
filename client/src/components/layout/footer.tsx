import { motion } from "framer-motion";
import { Link } from "wouter";

const Footer = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  return (
    <footer className="py-16 border-t border-white border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div {...fadeInUp} transition={{ duration: 0.8, delay: 0.1 }}>
            <h3 className="font-cormorant text-2xl mb-6">FROZO</h3>
            <p className="font-montserrat text-sm text-frozo-gray-light mb-6">
              Premium streetwear for the modern connoisseur, blending timeless elegance with contemporary design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-frozo-gray-light hover:text-white transition-colors" data-hover="true">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-frozo-gray-light hover:text-white transition-colors" data-hover="true">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-frozo-gray-light hover:text-white transition-colors" data-hover="true">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-frozo-gray-light hover:text-white transition-colors" data-hover="true">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <h4 className="font-montserrat uppercase text-sm tracking-wider mb-6">Collections</h4>
            <ul className="font-montserrat text-sm text-frozo-gray-light space-y-3">
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Monochrome Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Shadow Play</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Architectural Silhouettes</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Limited Editions</a></li>
            </ul>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ duration: 0.8, delay: 0.3 }}>
            <h4 className="font-montserrat uppercase text-sm tracking-wider mb-6">Information</h4>
            <ul className="font-montserrat text-sm text-frozo-gray-light space-y-3">
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">About FROZO</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">The Atelier</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Contact Us</a></li>
            </ul>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ duration: 0.8, delay: 0.4 }}>
            <h4 className="font-montserrat uppercase text-sm tracking-wider mb-6">Customer Service</h4>
            <ul className="font-montserrat text-sm text-frozo-gray-light space-y-3">
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-hover="true">Terms & Conditions</a></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-montserrat text-xs text-frozo-gray-light">&copy; {new Date().getFullYear()} FROZO. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="39" height="23" rx="3.5" fill="black" stroke="white" strokeOpacity="0.1"/>
              <path d="M10 17H14V7H10V17Z" fill="white" fillOpacity="0.8"/>
              <path d="M26 17H30V7H26V17Z" fill="white" fillOpacity="0.8"/>
              <path d="M18 17H22V7H18V17Z" fill="white" fillOpacity="0.8"/>
            </svg>
            <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="39" height="23" rx="3.5" fill="black" stroke="white" strokeOpacity="0.1"/>
              <circle cx="20" cy="12" r="7" fill="white" fillOpacity="0.8"/>
              <circle cx="16" cy="12" r="7" fill="black" fillOpacity="0.7"/>
            </svg>
            <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="39" height="23" rx="3.5" fill="black" stroke="white" strokeOpacity="0.1"/>
              <path d="M10 12L16 7H24L30 12L24 17H16L10 12Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
