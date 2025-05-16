import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AugmentedRealityViewerProps {
  productId: string;
  productName: string;
  onClose: () => void;
  className?: string;
}

const AugmentedRealityViewer = ({
  productId,
  productName,
  onClose,
  className = '',
}: AugmentedRealityViewerProps) => {
  const [stage, setStage] = useState<'initial' | 'scanning' | 'positioning' | 'viewing'>('initial');
  const [progress, setProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [deviceSupported, setDeviceSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if device supports AR
  useEffect(() => {
    // This is a simplified check, in a real app you would use WebXR Device API
    const checkDeviceSupport = () => {
      // Check if the browser supports WebXR
      const isWebXRSupported = 'xr' in navigator;
      
      if (!isWebXRSupported) {
        setDeviceSupported(false);
        setError('Your device does not support augmented reality. Try using a more recent mobile device.');
        return;
      }
      
      setDeviceSupported(true);
      
      // Simulate camera permission request
      setTimeout(() => {
        const simulatedPermission = Math.random() > 0.2; // 80% chance to get permission
        setHasPermission(simulatedPermission);
        
        if (!simulatedPermission) {
          setError('Camera permission denied. Please allow camera access to use AR features.');
        } else {
          // Start scanning stage
          setStage('scanning');
          simulateScanProgress();
        }
      }, 1000);
    };
    
    checkDeviceSupport();
  }, []);
  
  // Simulate AR scanning progress
  const simulateScanProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStage('positioning');
      }
    }, 200);
    
    return () => clearInterval(interval);
  };
  
  // Handle AR placement confirmation
  const handleConfirmPlacement = () => {
    setStage('viewing');
  };
  
  // Render different stages of AR experience
  const renderStageContent = () => {
    switch (stage) {
      case 'initial':
        return (
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bebas text-xl mb-2">INITIALIZING AR</h3>
            <p className="text-white text-opacity-70 text-sm mb-4">
              Please wait while we set up your augmented reality experience
            </p>
          </div>
        );
        
      case 'scanning':
        return (
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto border-2 border-white border-opacity-30 rounded-full mb-4">
              <div className="absolute inset-4 border-2 border-dashed border-white border-opacity-50 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-cyan-500 bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="font-bebas text-2xl">{progress}%</span>
                </div>
              </div>
            </div>
            <h3 className="font-bebas text-xl mb-2">SCANNING ENVIRONMENT</h3>
            <p className="text-white text-opacity-70 text-sm mb-4">
              Move your device slowly to scan the area
            </p>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2 mb-4">
              <div 
                className="bg-cyan-400 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        );
        
      case 'positioning':
        return (
          <div className="text-center">
            <div className="relative w-full h-64 border border-white border-opacity-20 mb-6 overflow-hidden">
              {/* Simulated camera feed */}
              <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
              
              {/* AR placement indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-2 border-cyan-400 border-opacity-50 rounded-md animate-pulse"></div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-cyan-400"></div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 text-left">
                <p className="font-bebas tracking-wider text-sm">TAP TO PLACE PRODUCT</p>
                <p className="text-white text-opacity-60 text-xs">Find a flat surface</p>
              </div>
            </div>
            
            <button 
              className="bg-white text-black font-bebas tracking-wider px-6 py-3 mb-4"
              onClick={handleConfirmPlacement}
              data-hover="true"
            >
              PLACE HERE
            </button>
          </div>
        );
        
      case 'viewing':
        return (
          <div className="text-center">
            <div className="relative w-full h-96 border border-white border-opacity-20 mb-6 overflow-hidden">
              {/* Simulated camera feed with placed product */}
              <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
              
              {/* Simulated product in AR */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80" 
                    alt={productName}
                    className="h-72 w-auto object-contain mix-blend-screen"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' }}
                  />
                </div>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button 
                  className="bg-black bg-opacity-60 text-white font-bebas px-4 py-2 text-sm flex items-center"
                  data-hover="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  RESET
                </button>
                <button 
                  className="bg-black bg-opacity-60 text-white font-bebas px-4 py-2 text-sm flex items-center"
                  data-hover="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                  CAPTURE
                </button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="font-bebas text-xl mb-2">{productName}</h3>
              <p className="text-white text-opacity-70 text-sm">
                Your product is now displayed in AR. Move around to view from different angles.
              </p>
            </div>
          </div>
        );
    }
  };

  if (error) {
    return (
      <div className={`bg-black p-6 ${className}`}>
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="font-bebas text-xl mb-2">AR NOT AVAILABLE</h3>
          <p className="text-white text-opacity-70 text-sm mb-6">{error}</p>
          <button 
            className="bg-white text-black font-bebas tracking-wider px-6 py-2"
            onClick={onClose}
            data-hover="true"
          >
            RETURN TO PRODUCT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bebas text-2xl tracking-wider">
          AR PREVIEW
        </h2>
        <button 
          className="text-white text-opacity-70 hover:text-opacity-100"
          onClick={onClose}
          data-hover="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="relative">
        {renderStageContent()}
      </div>
      
      <div className="mt-6 text-xs text-white text-opacity-40 text-center">
        <p>AR technology provided by FROZO Labs</p>
      </div>
    </div>
  );
};

export default AugmentedRealityViewer;