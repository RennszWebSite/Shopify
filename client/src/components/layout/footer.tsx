import { motion } from "framer-motion";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="pt-20 pb-8 border-t border-white border-opacity-10">
      <div className="container mx-auto px-6">
        {/* Footer top with newsletter */}
        <div className="flex flex-col md:flex-row gap-16 pb-16">
          {/* Logo and about */}
          <div className="md:w-1/3">
            <h3 className="font-anton text-5xl mb-6">FROZO</h3>
            <div className="h-0.5 w-12 bg-white mb-6"></div>
            <p className="font-archivo text-white text-opacity-60 mb-6">
              Pushing boundaries through innovation and design. Creating streetwear for the bold and fearless.
            </p>
            
            <div className="flex space-x-5 mt-8">
              <a 
                href="#" 
                className="w-10 h-10 border border-white border-opacity-30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300" 
                data-hover="true"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white border-opacity-30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300" 
                data-hover="true"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white border-opacity-30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300" 
                data-hover="true"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bebas text-xl tracking-wider mb-6">SHOP</h4>
              <div className="h-0.5 w-8 bg-white opacity-30 mb-4"></div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Outerwear
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Tops
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Bottoms
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bebas text-xl tracking-wider mb-6">HELP</h4>
              <div className="h-0.5 w-8 bg-white opacity-30 mb-4"></div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bebas text-xl tracking-wider mb-6">ABOUT</h4>
              <div className="h-0.5 w-8 bg-white opacity-30 mb-4"></div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="font-archivo text-white text-opacity-60 hover:text-opacity-100 transition-colors" data-hover="true">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="pt-6 border-t border-white border-opacity-5 flex flex-col md:flex-row justify-between items-center">
          <div className="font-archivo text-white text-opacity-40 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FROZO. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="#" 
              className="text-white text-opacity-40 hover:text-opacity-100 transition-colors text-sm font-archivo" 
              data-hover="true"
            >
              Privacy
            </Link>
            <span className="text-white text-opacity-40">|</span>
            <Link 
              href="#" 
              className="text-white text-opacity-40 hover:text-opacity-100 transition-colors text-sm font-archivo" 
              data-hover="true"
            >
              Terms
            </Link>
            <div className="ml-4 flex gap-2">
              <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-6 w-auto opacity-50" />
              <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="Mastercard" className="h-6 w-auto opacity-50" />
              <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="PayPal" className="h-6 w-auto opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
