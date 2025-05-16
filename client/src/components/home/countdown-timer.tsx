import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endDate: Date;
  title?: string;
  subtitle?: string;
  className?: string;
}

const CountdownTimer = ({
  endDate,
  title = "LIMITED EDITION DROP",
  subtitle = "SECURE YOURS BEFORE IT'S GONE",
  className = "",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isGlitching, setIsGlitching] = useState(false);

  // Calculate time remaining
  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });

      // Random glitch effect
      if (Math.random() > 0.97) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);

  // Time digit display component with animation
  const TimeDigit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-4">
      <div 
        className={`font-mono text-2xl sm:text-4xl md:text-5xl font-bold ${isGlitching ? 'text-cyan-300' : 'text-white'}`}
        style={{
          filter: isGlitching ? 'drop-shadow(0 0 10px #0ff)' : 'drop-shadow(0 0 5px rgba(255,255,255,0.5))',
          transform: isGlitching ? `translateY(${Math.random() * 2 - 1}px)` : 'none'
        }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs mt-1 font-bebas tracking-wider text-white text-opacity-60">{label}</div>
    </div>
  );

  const separatorStyle = `text-2xl sm:text-4xl md:text-5xl font-mono font-bold ${isGlitching ? 'text-cyan-300' : 'text-white text-opacity-60'}`;

  return (
    <div className={`${className} p-6 border border-white border-opacity-20 relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0"></div>
      
      {/* Animated gradient border */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden" 
        style={{
          background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
          backgroundSize: '300% 100%',
          animation: 'gradient-shift 4s linear infinite',
          opacity: 0.15,
          mixBlendMode: 'color-dodge'
        }}
      ></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-center mb-5">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-anton tracking-wide text-white relative inline-block">
            {title}
            {isGlitching && (
              <span 
                className="absolute inset-0 text-cyan-300 opacity-70" 
                style={{ 
                  left: `${Math.random() * 4 - 2}px`,
                  top: `${Math.random() * 2 - 1}px`
                }}
              >
                {title}
              </span>
            )}
          </h3>
          <p className="text-sm font-archivo text-white text-opacity-60 mt-2">{subtitle}</p>
        </div>
        
        <div className="flex items-center justify-center">
          <TimeDigit value={timeLeft.days} label="DAYS" />
          <span className={separatorStyle}>:</span>
          <TimeDigit value={timeLeft.hours} label="HOURS" />
          <span className={separatorStyle}>:</span>
          <TimeDigit value={timeLeft.minutes} label="MINUTES" />
          <span className={separatorStyle}>:</span>
          <TimeDigit value={timeLeft.seconds} label="SECONDS" />
        </div>
        
        <motion.div 
          className="text-center mt-6"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <button 
            className="bg-white text-black font-bebas tracking-wider text-lg px-6 py-3 relative overflow-hidden group"
            data-hover="true"
          >
            <span className="relative z-10">ACCESS EARLY DROP</span>
            <span className="absolute inset-0 w-0 bg-black group-hover:w-full transition-all duration-300 -skew-x-12"></span>
            <span className="absolute inset-0 w-0 bg-cyan-500 opacity-30 group-hover:w-full transition-all duration-500 delay-100 -skew-x-12"></span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;