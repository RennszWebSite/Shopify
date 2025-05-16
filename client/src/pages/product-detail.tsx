import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Product3DViewer from "@/components/product/product-3d-viewer";
import DynamicPriceTag from "@/components/product/dynamic-price-tag";
import { useAnimationPreloader } from "@/hooks/use-animation-preloader";

const ProductDetail = () => {
  const { isLoading } = useAnimationPreloader();
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [selectedSize, setSelectedSize] = useState<string>("m");
  const [quantity, setQuantity] = useState<number>(1);
  
  // Sample product data
  const product = {
    id: "tech-bomber-01",
    name: "TECH BOMBER",
    description: "Premium tech fabric bomber jacket with futuristic design elements. Featuring water-repellent outer shell, reflective detailing, and custom hardware. Limited edition streetwear for the modern wardrobe.",
    price: 289,
    memberPrice: 260,
    discountPercentage: 0,
    colors: ["black", "white"],
    sizes: ["xs", "s", "m", "l", "xl"],
    features: [
      "Water-repellent tech fabric",
      "Reflective accents",
      "Interior media pocket",
      "Custom hardware",
      "Ribbed cuffs and hem"
    ],
    limitedEdition: true,
    modelPath: "/models/bomber.glb", // This would be the path to the 3D model
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80",
      "https://images.unsplash.com/photo-1582142407894-ec8a83a86886?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
    ]
  };
  
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  
  // Simulate loading state for AR view
  const [isARLoading, setIsARLoading] = useState<boolean>(false);
  
  const handleARView = () => {
    setIsARLoading(true);
    
    // Simulate AR loading
    setTimeout(() => {
      setIsARLoading(false);
      alert("AR Feature would launch here in production version");
    }, 1500);
  };
  
  // Handle quantity changes
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="frozo-logo-path" d="M20 20 H80 V40 H20 V80 H80" stroke="#F5F5F5" strokeWidth="2" />
          </svg>
          <div className="absolute bottom-0 left-0 w-full text-center font-cormorant tracking-widest">FROZO</div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <main className="pt-48 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images & 3D Viewer Section */}
            <div>
              <div className="relative overflow-hidden border border-white border-opacity-10 bg-black mb-4">
                {selectedImage && (
                  <img 
                    src={selectedImage} 
                    alt={product.name} 
                    className="w-full h-auto aspect-[4/5] object-cover object-center"
                  />
                )}
                
                {/* AR/3D view toggle */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    className="bg-black bg-opacity-50 backdrop-blur-sm text-white px-4 py-2 font-bebas tracking-wider"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleARView}
                    data-hover="true"
                  >
                    {isARLoading ? (
                      <span className="flex items-center">
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        LOADING AR
                      </span>
                    ) : (
                      <>AR VIEW</>
                    )}
                  </motion.button>
                </div>
              </div>
              
              {/* Image thumbnails */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`border ${selectedImage === image ? 'border-white' : 'border-white border-opacity-20'} overflow-hidden`}
                    onClick={() => setSelectedImage(image)}
                    data-hover="true"
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover object-center"
                    />
                  </button>
                ))}
              </div>
              
              {/* 3D Product Viewer */}
              <div className="mt-8 border border-white border-opacity-10">
                <h3 className="p-4 bg-black font-bebas tracking-wider text-lg">3D PRODUCT VIEW</h3>
                <Product3DViewer modelPath={product.modelPath} height={350} />
              </div>
            </div>
            
            {/* Product Details & Purchase Section */}
            <div>
              <div className="mb-2">
                <span className="inline-block border border-white border-opacity-30 px-3 py-1 font-bebas text-sm tracking-wider text-white text-opacity-70">
                  OUTERWEAR
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-anton uppercase mb-4 tracking-tight">
                {product.name}
              </h1>
              
              <div className="mb-8">
                <DynamicPriceTag 
                  basePrice={product.price}
                  memberPrice={product.memberPrice}
                  discountPercentage={product.discountPercentage}
                  limitedEdition={product.limitedEdition}
                />
              </div>
              
              <p className="font-archivo text-white text-opacity-70 mb-8">
                {product.description}
              </p>
              
              {/* Color selection */}
              <div className="mb-8">
                <h3 className="font-bebas tracking-wider text-lg mb-3">COLOR</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-12 h-12 border ${selectedColor === color ? 'border-white' : 'border-white border-opacity-30'}`}
                      style={{ backgroundColor: color === 'white' ? 'white' : 'black' }}
                      onClick={() => setSelectedColor(color)}
                      data-hover="true"
                    >
                      {selectedColor === color && (
                        <span className={`flex items-center justify-center h-full ${color === 'white' ? 'text-black' : 'text-white'}`}>
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size selection */}
              <div className="mb-8">
                <h3 className="font-bebas tracking-wider text-lg mb-3">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`w-12 h-12 border font-bebas text-lg ${selectedSize === size ? 'bg-white text-black' : 'border-white border-opacity-30'}`}
                      onClick={() => setSelectedSize(size)}
                      data-hover="true"
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
                <a href="#" className="inline-block mt-2 text-sm text-white text-opacity-60 hover:text-opacity-100 underline font-archivo" data-hover="true">
                  Size Guide
                </a>
              </div>
              
              {/* Quantity selection */}
              <div className="mb-8">
                <h3 className="font-bebas tracking-wider text-lg mb-3">QUANTITY</h3>
                <div className="flex border border-white border-opacity-30 w-32">
                  <button 
                    className="w-10 h-10 flex items-center justify-center border-r border-white border-opacity-30"
                    onClick={decrementQuantity}
                    data-hover="true"
                  >
                    -
                  </button>
                  <div className="flex-1 h-10 flex items-center justify-center font-bebas">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 flex items-center justify-center border-l border-white border-opacity-30"
                    onClick={incrementQuantity}
                    data-hover="true"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <div className="mb-8">
                <motion.button
                  className="w-full bg-white text-black font-bebas tracking-wider text-xl py-4 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-hover="true"
                >
                  <span className="relative z-10">ADD TO CART</span>
                  <span className="absolute inset-0 w-0 bg-cyan-500 opacity-30 group-hover:w-full transition-all duration-500 -skew-x-12"></span>
                </motion.button>
              </div>
              
              {/* Product features */}
              <div className="border-t border-white border-opacity-10 pt-8">
                <h3 className="font-bebas tracking-wider text-lg mb-4">FEATURES</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 mt-0.5 border border-white border-opacity-30 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="font-archivo text-white text-opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;