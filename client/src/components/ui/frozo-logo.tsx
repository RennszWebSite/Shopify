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

  // Define Y2K-style vibrant colors
  const gradientStops = [
    '#ff00ff', // magenta
    '#00ffff', // cyan
    '#ffff00', // yellow
    '#ff00ff', // magenta again (for looping)
  ];

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={controls}
        className="relative"
        style={{ 
          transform: isGlitching ? `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)` : 'none'
        }}
      >
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* Y2K logo text with proper cyberpunk/techno style */}
          <div
            className="text-transparent bg-clip-text"
            style={{
              fontFamily: "'Press Start 2P', 'VT323', monospace",
              backgroundImage: `linear-gradient(90deg, ${gradientStops.join(', ')})`,
              backgroundSize: '300% 100%',
              animation: 'gradient-shift 4s linear infinite',
              textShadow: `
                0 0 10px rgba(255,255,255,0.7),
                0 0 20px rgba(0,255,255,0.5),
                0 0 30px rgba(255,0,255,0.5)
              `,
              fontSize: width / 5,
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.5))'
            }}
          >
            FROZO
          </div>
        </div>
        
        {/* Glitch overlay */}
        {isGlitching && (
          <>
            <div 
              className="absolute inset-0 z-20 mix-blend-screen" 
              style={{ 
                left: `${Math.random() * 8 - 4}px`,
                top: `${Math.random() * 4 - 2}px`,
                opacity: 0.7,
                backgroundColor: '#ff00ff'
              }}
            />
            <div 
              className="absolute inset-0 z-20 mix-blend-screen" 
              style={{ 
                left: `${Math.random() * 8 - 4}px`,
                top: `${Math.random() * 4 - 2}px`,
                opacity: 0.7,
                backgroundColor: '#00ffff'
              }}
            />
          </>
        )}
      </motion.div>
      
      {/* Add style for gradient animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}} />
    </div>
  );
};

export default Y2KLogo;
