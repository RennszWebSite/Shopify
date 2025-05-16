import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import GlassCard from "../ui/glass-card";
import { useThree } from "@/lib/3d-utils";

// Sample rotation images
const rotationImages = [
  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
  "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
  "https://images.unsplash.com/photo-1582142407894-ec8a83a86886?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
];

const ProductShowcase = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const productCardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { initThree, rotateModel } = useThree();

  useEffect(() => {
    // Initialize 3D model if needed
    const container = document.getElementById("product-3d-container");
    if (container) {
      initThree(container);
    }
  }, [initThree]);

  const handleRotateLeft = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentRotation((prev) => (prev - 1 + rotationImages.length) % rotationImages.length);
    rotateModel("left");
    
    controls.start({
      opacity: [1, 0, 1],
      transition: { duration: 0.6 }
    }).then(() => setIsAnimating(false));
  };

  const handleRotateRight = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentRotation((prev) => (prev + 1) % rotationImages.length);
    rotateModel("right");
    
    controls.start({
      opacity: [1, 0, 1],
      transition: { duration: 0.6 }
    }).then(() => setIsAnimating(false));
  };

  const handleAddToCart = () => {
    if (!productCardRef.current) return;
    
    controls.start({
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.8,
        times: [0, 0.3, 1],
        ease: ["easeOut", "easeInOut", "easeOut"]
      }
    });
  };

  return (
    <section className="py-20 md:py-40 relative overflow-hidden" id="showcase">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-playfair mb-6">Signature Glass Case</h2>
            <p className="font-cormorant text-lg text-frozo-gray-light mb-8 max-w-md">
              Our iconic glass display presentation, featuring premium 3D interactions and animations for an unparalleled luxury shopping experience.
            </p>
            <a 
              href="#" 
              className="font-montserrat uppercase tracking-wider text-sm bg-white text-black px-10 py-4 inline-block hover:bg-opacity-90 transition-all" 
              data-hover="true"
            >
              Explore Technology
            </a>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              ref={productCardRef}
              animate={controls}
            >
              <GlassCard className="p-6 relative overflow-hidden" animate={false}>
                <div className="relative h-96 overflow-hidden rounded" id="product-3d-container">
                  <motion.img 
                    src={rotationImages[currentRotation]} 
                    alt="Premium Streetwear Jacket" 
                    className="w-full h-full object-cover object-center" 
                    animate={controls}
                  />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-4">
                      <button 
                        className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
                        onClick={handleRotateLeft}
                        disabled={isAnimating}
                        data-hover="true"
                      >
                        <i className="fas fa-arrow-left"></i>
                      </button>
                      <button 
                        className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
                        onClick={handleRotateRight}
                        disabled={isAnimating}
                        data-hover="true"
                      >
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </motion.div>
                </div>
                <div className="pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-playfair text-xl">FROZO Signature Jacket</h3>
                    <span className="font-montserrat">$699</span>
                  </div>
                  <p className="font-cormorant text-frozo-gray-medium mb-6">
                    Handcrafted premium materials with custom detailing
                  </p>
                  <button 
                    className="w-full bg-transparent border border-white py-3 font-montserrat uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-500" 
                    data-hover="true"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
