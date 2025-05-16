import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicPriceTagProps {
  basePrice: number;
  currency?: string;
  discountPercentage?: number;
  memberPrice?: number;
  limitedEdition?: boolean;
  className?: string;
}

const DynamicPriceTag = ({
  basePrice,
  currency = '$',
  discountPercentage = 0,
  memberPrice,
  limitedEdition = false,
  className = '',
}: DynamicPriceTagProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Calculate prices
  const discountedPrice = discountPercentage > 0 
    ? basePrice * (1 - discountPercentage / 100) 
    : null;
  
  const displayPrice = discountedPrice ?? basePrice;
  const formattedBasePrice = `${currency}${basePrice.toFixed(2)}`;
  const formattedDisplayPrice = `${currency}${displayPrice.toFixed(2)}`;
  const formattedMemberPrice = memberPrice ? `${currency}${memberPrice.toFixed(2)}` : null;

  // Random glitch effect
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 150);
  };

  return (
    <div 
      className={`relative ${className}`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerGlitch}
    >
      <div className="relative">
        {/* Current price display */}
        <div 
          className={`font-bebas tracking-wider text-xl transition-all duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            filter: isGlitching ? 'blur(2px)' : 'none',
            transform: isGlitching 
              ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)` 
              : 'none'
          }}
        >
          <span className="mr-2">{formattedDisplayPrice}</span>
          
          {discountedPrice && (
            <span className="text-gray-400 line-through text-sm">{formattedBasePrice}</span>
          )}
        </div>
        
        {/* Expanded price details on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute top-0 left-0 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-black backdrop-blur-sm border border-white border-opacity-20 p-3 shadow-lg min-w-max">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white text-opacity-60 font-archivo">Base Price:</span>
                    <span className="font-bebas tracking-wider">{formattedBasePrice}</span>
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white text-opacity-60 font-archivo">Discount:</span>
                      <span className="font-bebas tracking-wider text-green-400">-{discountPercentage}%</span>
                    </div>
                  )}
                  
                  {formattedMemberPrice && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white text-opacity-60 font-archivo">Member Price:</span>
                      <span className="font-bebas tracking-wider text-cyan-400">{formattedMemberPrice}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-white border-opacity-10 pt-1 mt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white text-opacity-60 font-archivo">Final Price:</span>
                      <span className="font-bebas tracking-wider text-lg">{formattedDisplayPrice}</span>
                    </div>
                  </div>
                </div>
                
                {limitedEdition && (
                  <div className="mt-2 text-center">
                    <span className="inline-block bg-white text-black text-xs px-2 py-0.5 font-bebas tracking-wider">
                      LIMITED EDITION
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DynamicPriceTag;