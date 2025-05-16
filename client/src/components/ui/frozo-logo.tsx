import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Y2K logo styling elements
  const createGlowFilter = () => {
    return `drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #0ff) drop-shadow(0 0 6px #f0f)`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`} 
      style={{ width, height }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        className="relative flex items-center justify-center h-full"
        style={{ 
          transform: isGlitching ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : 'none'
        }}
      >
        {/* Chrome/metallic background shape */}
        <div 
          className="absolute"
          style={{
            width: width * 0.95,
            height: height * 0.6,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(120,120,120,0.8), rgba(255,255,255,0.9), rgba(150,150,150,0.8))',
            filter: 'brightness(1.1) contrast(1.2)',
            transform: 'skewX(-5deg) rotate(-2deg)',
            zIndex: 1,
            boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
          }}
        ></div>
        
        {/* Reflective upper highlight */}
        <div 
          className="absolute"
          style={{
            width: width * 0.75,
            height: height * 0.15,
            top: height * 0.1,
            borderRadius: '4px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
            transform: 'skewX(-10deg) rotate(-1deg)',
            zIndex: 3,
            opacity: 0.7
          }}
        ></div>

        {/* Main text */}
        <div
          className="relative z-5 px-2 py-1 text-center"
          style={{
            fontFamily: "'Audiowide', 'Orbitron', cursive, sans-serif",
            fontSize: width / 4.5,
            fontWeight: 'bold',
            color: '#000',
            textShadow: '1px 1px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.2)',
            letterSpacing: '0.05em',
            transform: isGlitching ? `skew(${Math.random() * 2 - 1}deg)` : 'skew(0deg)',
            WebkitBackgroundClip: 'text',
            zIndex: 2
          }}
        >
          FROZO
        </div>
        
        {/* Y2K decorative elements */}
        <div 
          className="absolute z-4"
          style={{
            bottom: height * 0.15,
            width: width * 0.8,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent)',
            opacity: 0.8
          }}
        ></div>
        
        <div 
          className="absolute z-4"
          style={{
            top: height * 0.15,
            width: width * 0.7,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #ffff00, transparent)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Bottom tag line */}
        <div
          className="absolute z-4"
          style={{
            bottom: height * 0.05,
            fontSize: width / 20,
            fontFamily: "'Orbitron', sans-serif",
            color: '#000',
            textShadow: '0px 0px 2px rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          STREETWEAR 2025
        </div>
        
        {/* Glitch overlay */}
        {isGlitching && (
          <>
            <div 
              className="absolute inset-0 z-10 mix-blend-screen pointer-events-none" 
              style={{ 
                left: `${Math.random() * 10 - 5}px`,
                background: 'linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
                opacity: 0.5
              }}
            />
            <div 
              className="absolute inset-0 z-10 mix-blend-screen pointer-events-none" 
              style={{ 
                left: `${Math.random() * 10 - 5}px`,
                background: 'linear-gradient(45deg, transparent, rgba(255, 0, 255, 0.3), transparent)',
                opacity: 0.5
              }}
            />
          </>
        )}
      </motion.div>
      
      {/* Add style for fonts and animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@500;700&display=swap');
        
        @keyframes shine {
          from { background-position: 0%; }
          to { background-position: 200%; }
        }
      `}} />
    </div>
  );
};

export default Y2KLogo;
