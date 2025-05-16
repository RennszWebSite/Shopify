import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useThree } from "@/lib/3d-utils";
import { Link } from "wouter";

const products = [
  {
    id: 1,
    name: "Urban Tech Jacket",
    price: 289,
    colors: ["Black", "White"],
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1582142407894-ec8a83a86886?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "Jackets",
    isNew: true
  },
  {
    id: 2,
    name: "Oversize Hoodie",
    price: 189,
    colors: ["Black"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "Hoodies",
    isNew: true
  },
  {
    id: 3,
    name: "Cargo Pants",
    price: 169,
    colors: ["Black", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "Pants",
    isNew: false
  },
  {
    id: 4,
    name: "Graphic Tee",
    price: 89,
    colors: ["White", "Black"],
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ],
    category: "T-Shirts",
    isNew: true
  }
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      (prev + 1) % product.images.length
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.4 }
    });
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="#" className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
          {/* New tag */}
          {product.isNew && (
            <div className="absolute top-3 left-3 z-10 bg-white text-black text-xs font-bold uppercase tracking-wider px-2 py-1">
              New
            </div>
          )}
          
          {/* Product image */}
          <motion.img 
            src={product.images[currentImageIndex]} 
            alt={product.name}
            className="w-full h-full object-cover object-center transform transition-transform duration-700"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Hover content */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    data-hover="true"
                  />
                ))}
              </div>
            )}
            
            {product.images.length > 1 && (
              <div className="absolute top-1/2 left-2 right-2 transform -translate-y-1/2 flex justify-between pointer-events-none">
                <button 
                  className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white pointer-events-auto"
                  onClick={handlePrev}
                  data-hover="true"
                >
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white pointer-events-auto"
                  onClick={handleNext}
                  data-hover="true"
                >
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            )}
            
            <button
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white text-black font-medium py-2 px-6 uppercase text-sm tracking-wider hover:bg-opacity-90 transition-all duration-300"
              onClick={handleAddToCart}
              data-hover="true"
            >
              Add to Cart
            </button>
          </div>
        </div>
        
        {/* Product details */}
        <div className="mt-4 pb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium">{product.name}</h3>
            <span className="font-medium">${product.price}</span>
          </div>
          <div className="mt-1 flex justify-between items-center">
            <p className="text-sm text-gray-400">{product.category}</p>
            <div className="flex space-x-1">
              {product.colors.map((color, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full border border-gray-300 ${color.toLowerCase() === 'black' ? 'bg-black' : 'bg-white'}`}
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
    <section className="py-20 md:py-32 relative" id="showcase">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-white text-black font-montserrat text-xs uppercase tracking-widest py-1 px-3 mb-6">
            New Arrivals
          </span>
          <h2 className="text-4xl font-montserrat font-bold uppercase mb-6">Shop The Latest</h2>
          <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-lg text-gray-300">
            Discover our latest collection featuring premium streetwear essentials with unparalleled attention to detail.
          </p>
        </div>
        
        {/* Filter/Sort options */}
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div className="flex space-x-6 font-montserrat text-sm uppercase tracking-wider mb-4 md:mb-0">
            <button className="text-white border-b-2 border-white py-1 transition-colors duration-300" data-hover="true">All</button>
            <button className="text-gray-400 hover:text-white py-1 transition-colors duration-300" data-hover="true">Jackets</button>
            <button className="text-gray-400 hover:text-white py-1 transition-colors duration-300" data-hover="true">Hoodies</button>
            <button className="text-gray-400 hover:text-white py-1 transition-colors duration-300" data-hover="true">Pants</button>
            <button className="text-gray-400 hover:text-white py-1 transition-colors duration-300" data-hover="true">T-Shirts</button>
          </div>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-montserrat uppercase tracking-wider" data-hover="true">
              <span>Sort by</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-800 shadow-lg z-10 hidden group-hover:block">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-900" data-hover="true">Newest</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-900" data-hover="true">Price: Low to High</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-900" data-hover="true">Price: High to Low</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <Link 
            href="#" 
            className="inline-block border border-white py-3 px-8 font-montserrat uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all duration-300"
            data-hover="true"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
