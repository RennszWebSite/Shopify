import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";

const products = [
  {
    id: 1,
    name: "TECH BOMBER",
    price: 289,
    colors: ["Black", "White"],
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1582142407894-ec8a83a86886?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "OUTERWEAR",
    isNew: true
  },
  {
    id: 2,
    name: "LOOSE FIT HOODIE",
    price: 189,
    colors: ["Black"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "SWEATSHIRTS",
    isNew: true
  },
  {
    id: 3,
    name: "TACTICAL CARGO",
    price: 169,
    colors: ["Black", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "BOTTOMS",
    isNew: false
  },
  {
    id: 4,
    name: "DISORDER TEE",
    price: 89,
    colors: ["White", "Black"],
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "TOPS",
    isNew: true
  }
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  
  const handleImageToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.images.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % product.images.length);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    controls.start({
      scale: [1, 1.03, 1],
      transition: { duration: 0.3 }
    });
  };

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={controls}
    >
      <Link href="#" className="block">
        <div 
          className="relative overflow-hidden border border-white border-opacity-10 bg-black"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleImageToggle}
        >
          {/* Status tags */}
          <div className="absolute top-0 left-0 z-10 flex flex-col">
            {product.isNew && (
              <div className="bg-white text-black px-4 py-1 font-bebas tracking-wider text-sm">
                NEW
              </div>
            )}
            {index === 0 && (
              <div className="bg-black border border-white border-opacity-30 text-white px-4 py-1 font-bebas tracking-wider text-sm mt-1">
                SOLD OUT
              </div>
            )}
          </div>
          
          {/* Add to wishlist */}
          <button 
            className="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center text-white text-opacity-60 hover:text-opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            data-hover="true"
          >
            <i className="far fa-heart"></i>
          </button>
          
          {/* Product image with glitch effect on hover */}
          <div className="w-full aspect-[4/5] overflow-hidden">
            <motion.div
              className="w-full h-full"
              animate={{
                filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
                scale: isHovered ? 1.03 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay with product info on hover */}
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
                  <div className="font-bebas tracking-wider text-lg">TAP TO VIEW</div>
                  
                  {product.images.length > 1 && (
                    <div className="flex space-x-1 mt-1">
                      {product.images.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`inline-block w-8 h-0.5 ${idx === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Quick add button - visible on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 text-center font-bebas tracking-wider text-sm"
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.3 }}
            onClick={handleAddToCart}
            data-hover="true"
          >
            QUICK ADD
          </motion.div>
        </div>
        
        {/* Product details */}
        <div className="mt-3 pb-3">
          <div className="flex justify-between items-center font-bebas tracking-wide">
            <h3 className="text-lg">{product.name}</h3>
            <span className="text-lg">${product.price}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-white text-opacity-50 font-archivo uppercase">{product.category}</span>
            <div className="flex space-x-1">
              {product.colors.map((color, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 border border-white border-opacity-30 ${color.toLowerCase() === 'black' ? 'bg-black' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProductShowcase = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden distorted-bg" id="showcase">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white bg-opacity-[0.01] rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white bg-opacity-[0.01] rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <div className="inline-block border border-white border-opacity-30 px-3 py-1 mb-4 font-bebas text-sm tracking-wider text-white text-opacity-70">
                SHOP
              </div>
              <h2 className="text-6xl md:text-8xl font-anton uppercase mb-2 tracking-tight">
                NEW DROPS
              </h2>
              <div className="h-0.5 w-20 bg-white mb-6"></div>
            </div>
            
            <p className="max-w-md text-base text-white text-opacity-60 font-archivo mb-4 md:mb-0">
              Explore our latest collection featuring premium streetwear essentials with unparalleled attention to detail.
            </p>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 font-bebas tracking-wider text-lg whitespace-nowrap">
            <button className="relative px-1 py-2 text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white" data-hover="true">
              ALL PRODUCTS
            </button>
            <button className="relative px-1 py-2 text-white text-opacity-50 hover:text-opacity-100 transition-colors" data-hover="true">
              OUTERWEAR
            </button>
            <button className="relative px-1 py-2 text-white text-opacity-50 hover:text-opacity-100 transition-colors" data-hover="true">
              SWEATSHIRTS
            </button>
            <button className="relative px-1 py-2 text-white text-opacity-50 hover:text-opacity-100 transition-colors" data-hover="true">
              BOTTOMS
            </button>
            <button className="relative px-1 py-2 text-white text-opacity-50 hover:text-opacity-100 transition-colors" data-hover="true">
              TOPS
            </button>
            <button className="relative px-1 py-2 text-white text-opacity-50 hover:text-opacity-100 transition-colors" data-hover="true">
              ACCESSORIES
            </button>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* View all button */}
        <div className="mt-16 text-center">
          <Link 
            href="#" 
            className="frozo-button border-2 inline-block relative overflow-hidden text-xl"
            data-hover="true"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
