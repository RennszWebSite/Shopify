import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/glass-card';

interface CustomOption {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    price?: number;
    image?: string;
  }[];
}

interface ProductCustomizerProps {
  productId: string;
  productName: string;
  basePrice: number;
  className?: string;
  onCustomizationComplete?: (selections: Record<string, string>, totalPrice: number) => void;
}

const ProductCustomizer = ({
  productId,
  productName,
  basePrice,
  className = "",
  onCustomizationComplete
}: ProductCustomizerProps) => {
  // Sample customization options
  const customizationOptions: CustomOption[] = [
    {
      id: 'material',
      name: 'FABRIC',
      options: [
        { id: 'standard', name: 'STANDARD COTTON' },
        { id: 'premium', name: 'PREMIUM TECH', price: 30 },
        { id: 'waterproof', name: 'WATER REPELLENT', price: 50 }
      ]
    },
    {
      id: 'fit',
      name: 'FIT',
      options: [
        { id: 'standard', name: 'STANDARD' },
        { id: 'slim', name: 'SLIM FIT' },
        { id: 'oversized', name: 'OVERSIZED' }
      ]
    },
    {
      id: 'details',
      name: 'DETAILS',
      options: [
        { id: 'none', name: 'STANDARD' },
        { id: 'reflective', name: 'REFLECTIVE ACCENTS', price: 15 },
        { id: 'zipper', name: 'PREMIUM ZIPPER', price: 25 }
      ]
    },
    {
      id: 'personalization',
      name: 'PERSONALIZATION',
      options: [
        { id: 'none', name: 'NONE' },
        { id: 'initials', name: 'CUSTOM INITIALS', price: 10 },
        { id: 'patch', name: 'CUSTOM PATCH', price: 20 }
      ]
    }
  ];
  
  // Current selections and price calculation
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [personalText, setPersonalText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Animated background elements
  const elementsRef = useRef<HTMLDivElement>(null);
  
  // Calculate total price based on selections
  useEffect(() => {
    let price = basePrice;
    
    // Add price for each selected option
    Object.entries(selections).forEach(([categoryId, optionId]) => {
      const category = customizationOptions.find(c => c.id === categoryId);
      if (category) {
        const option = category.options.find(o => o.id === optionId);
        if (option && option.price) {
          price += option.price;
        }
      }
    });
    
    setTotalPrice(price);
  }, [selections, basePrice]);
  
  // Animate background elements
  useEffect(() => {
    if (!elementsRef.current) return;
    
    const element = elementsRef.current;
    
    const updateElementPositions = (e: MouseEvent) => {
      if (!element) return;
      
      const elements = element.querySelectorAll('.floating-element');
      elements.forEach((el, i) => {
        const speed = 0.01 + (i % 3) * 0.005;
        const x = (e.clientX - window.innerWidth / 2) * speed;
        const y = (e.clientY - window.innerHeight / 2) * speed;
        
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    document.addEventListener('mousemove', updateElementPositions);
    
    return () => {
      document.removeEventListener('mousemove', updateElementPositions);
    };
  }, []);
  
  // Handle option selection
  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: optionId
    }));
  };
  
  // Handle navigation between customization steps
  const handleNextStep = () => {
    if (currentStep < customizationOptions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Complete customization
      setShowConfirmation(true);
      if (onCustomizationComplete) {
        onCustomizationComplete(selections, totalPrice);
      }
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  // Get current category
  const currentCategory = customizationOptions[currentStep];
  
  // Check if option is selected
  const isOptionSelected = (categoryId: string, optionId: string) => {
    return selections[categoryId] === optionId;
  };
  
  // Get name of selected option
  const getSelectedOptionName = (categoryId: string) => {
    const selectedOptionId = selections[categoryId];
    if (!selectedOptionId) return "Not selected";
    
    const category = customizationOptions.find(c => c.id === categoryId);
    if (!category) return "Not selected";
    
    const option = category.options.find(o => o.id === selectedOptionId);
    return option ? option.name : "Not selected";
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Floating background elements */}
      <div ref={elementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500 opacity-10 blur-3xl floating-element"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-fuchsia-500 opacity-10 blur-3xl floating-element"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-white opacity-10 blur-2xl floating-element"></div>
      </div>
      
      <GlassCard className="relative p-6 border border-white border-opacity-20 backdrop-blur-md" animate>
        <div className="text-center mb-6">
          <h2 className="font-anton text-3xl mb-2 tracking-tight">PREMIUM CUSTOMIZER</h2>
          <p className="text-white text-opacity-60 font-archivo text-sm">
            Personalize your {productName} with premium options
          </p>
        </div>
        
        {!showConfirmation ? (
          <>
            {/* Progress indicator */}
            <div className="flex justify-center mb-8">
              {customizationOptions.map((category, index) => (
                <div 
                  key={category.id}
                  className="flex items-center"
                >
                  <div 
                    className={`w-3 h-3 rounded-full flex items-center justify-center ${
                      index < currentStep 
                        ? 'bg-white' 
                        : index === currentStep 
                          ? 'border-2 border-white' 
                          : 'border border-white border-opacity-30'
                    }`}
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    style={{ cursor: index < currentStep ? 'pointer' : 'default' }}
                  >
                    {index < currentStep && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {index < customizationOptions.length - 1 && (
                    <div 
                      className={`w-8 h-0.5 ${
                        index < currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Current step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={isAnimating ? 'opacity-0' : 'opacity-100'}
              >
                <div className="mb-6">
                  <h3 className="font-bebas tracking-wider text-xl mb-4">
                    {currentCategory.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentCategory.options.map(option => (
                      <motion.div
                        key={option.id}
                        className={`border ${
                          isOptionSelected(currentCategory.id, option.id)
                            ? 'border-white'
                            : 'border-white border-opacity-20'
                        } p-4 cursor-pointer relative overflow-hidden group`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(currentCategory.id, option.id)}
                        data-hover="true"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bebas tracking-wider">{option.name}</h4>
                            {option.price && (
                              <p className="text-sm text-white text-opacity-60 font-archivo">
                                +${option.price}
                              </p>
                            )}
                          </div>
                          
                          {isOptionSelected(currentCategory.id, option.id) && (
                            <div className="bg-white text-black w-5 h-5 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover animation overlay */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Show text input for personalization if selected */}
                  {currentCategory.id === 'personalization' && selections[currentCategory.id] && selections[currentCategory.id] !== 'none' && (
                    <div className="mt-4">
                      <label className="block font-archivo text-sm mb-2 text-white text-opacity-80">
                        {selections[currentCategory.id] === 'initials' 
                          ? 'Enter your initials (max 3 characters)'
                          : 'Describe your custom patch (max 50 characters)'}
                      </label>
                      <input 
                        type="text"
                        value={personalText}
                        onChange={(e) => setPersonalText(e.target.value)}
                        maxLength={selections[currentCategory.id] === 'initials' ? 3 : 50}
                        className="w-full bg-transparent border border-white border-opacity-30 p-3 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Price display */}
            <div className="mb-6 border-t border-b border-white border-opacity-10 py-4">
              <div className="flex justify-between items-center">
                <div className="font-archivo text-sm text-white text-opacity-70">Current Total:</div>
                <div className="font-bebas tracking-wider text-2xl">${totalPrice}</div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                className={`px-6 py-2 border border-white border-opacity-30 font-bebas tracking-wider ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:bg-opacity-10'
                } transition-colors`}
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                data-hover="true"
              >
                BACK
              </button>
              
              <button
                className="px-6 py-2 bg-white text-black font-bebas tracking-wider hover:bg-opacity-90 transition-colors"
                onClick={handleNextStep}
                data-hover="true"
              >
                {currentStep === customizationOptions.length - 1 ? 'COMPLETE' : 'NEXT'}
              </button>
            </div>
          </>
        ) : (
          // Confirmation message
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="font-bebas tracking-wider text-2xl mb-2">CUSTOMIZATION COMPLETE</h3>
              <p className="text-white text-opacity-70 font-archivo text-sm mb-6">
                Your personalized {productName} has been updated with your selections.
              </p>
              
              <div className="mb-8 max-w-sm mx-auto">
                <div className="border border-white border-opacity-10 p-4 mb-4">
                  <h4 className="font-bebas tracking-wider mb-2">YOUR SELECTIONS</h4>
                  <ul className="space-y-2">
                    {customizationOptions.map(category => (
                      <li key={category.id} className="flex justify-between text-sm">
                        <span className="text-white text-opacity-70 font-archivo">{category.name}:</span>
                        <span className="font-bebas tracking-wider">{getSelectedOptionName(category.id)}</span>
                      </li>
                    ))}
                    {personalText && (
                      <li className="flex justify-between text-sm">
                        <span className="text-white text-opacity-70 font-archivo">Custom Text:</span>
                        <span className="font-bebas tracking-wider">{personalText}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center border-t border-white border-opacity-10 pt-4">
                  <span className="font-bebas tracking-wider text-lg">TOTAL PRICE:</span>
                  <span className="font-bebas tracking-wider text-2xl">${totalPrice}</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  className="px-6 py-2 border border-white border-opacity-30 font-bebas tracking-wider hover:bg-white hover:bg-opacity-10 transition-colors"
                  onClick={() => setShowConfirmation(false)}
                  data-hover="true"
                >
                  EDIT
                </button>
                
                <button
                  className="px-6 py-2 bg-white text-black font-bebas tracking-wider hover:bg-opacity-90 transition-colors"
                  data-hover="true"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
};

export default ProductCustomizer;