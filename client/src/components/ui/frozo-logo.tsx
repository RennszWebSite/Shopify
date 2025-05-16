import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface FrozoLogoProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

const Y2KLogo = ({
  width = 100,
  height = 100,
  color = "#FFFFFF",
  className = "",
  animated = true,
}: FrozoLogoProps) => {
  const controls = useAnimation();
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (animated) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      });

      // Random glitching effect
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.7;
        if (shouldGlitch) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 150);
        }
      }, 2000);

      return () => clearInterval(glitchInterval);
    }
  }, [animated, controls]);

  // Define Y2K-style colors for the metallic gradient and chrome effect
  const gradientStops = [
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffff00', // yellow
    '#ff00ff', // magenta again (for looping)
  ];

  // Chrome-like gradient for Y2K metallic effect 
  const chromeGradient = [
    'rgba(255,255,255,0.9)',
    'rgba(200,200,200,0.8)',
    'rgba(255,255,255,0.9)',
    'rgba(150,150,150,0.8)',
    'rgba(255,255,255,0.9)',
  ];

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={controls}
        className="relative"
        style={{ 
          transform: isGlitching ? `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)` : 'none'
        }}
      >
        {/* Chrome/metallic effect background */}
        <div 
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${chromeGradient.join(', ')})`,
            filter: 'brightness(1.2) contrast(1.2)',
            transform: 'skewX(-5deg)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.5)'
          }}
        ></div>
        
        {/* Border effect */}
        <div 
          className="absolute inset-0 rounded-md overflow-hidden" 
          style={{
            background: `linear-gradient(45deg, ${gradientStops.join(', ')})`,
            opacity: 0.7,
            mixBlendMode: 'color-dodge',
            filter: 'blur(2px)'
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* Actual text with rainbow gradient */}
          <div
            className="font-bebas tracking-wider text-5xl p-2 text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(90deg, ${gradientStops.join(', ')})`,
              backgroundSize: '300% 100%',
              animation: 'gradient-shift 4s linear infinite',
              textShadow: `
                0 0 5px rgba(255,255,255,0.5),
                0 0 10px rgba(0,255,255,0.3),
                0 0 15px rgba(255,0,255,0.3)
              `,
              transform: 'rotate(-2deg) skew(-5deg)',
              fontSize: width / 3,
              fontWeight: 'bold',
              letterSpacing: '0.02em'
            }}
          >
            FROZO
          </div>
        </div>
        
        {/* Glitch overlay */}
        {isGlitching && (
          <div className="absolute inset-0 z-20 overflow-hidden rounded-md mix-blend-color-dodge opacity-70">
            <div className="absolute inset-0 bg-cyan-500 opacity-40 mix-blend-screen" 
                style={{ left: `${Math.random() * 10 - 5}px` }}></div>
            <div className="absolute inset-0 bg-fuchsia-500 opacity-40 mix-blend-screen" 
                style={{ left: `${Math.random() * 10 - 5}px` }}></div>
          </div>
        )}
      </motion.div>
      
      {/* Add style for gradient animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}} />
    </div>
  );
};

export default Y2KLogo;
