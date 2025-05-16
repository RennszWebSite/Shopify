import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on larger devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.getAttribute('data-hover') === 'true') {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    
    document.querySelectorAll('[data-hover="true"]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      
      document.querySelectorAll('[data-hover="true"]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor fixed w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "#000" : "#fff"
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 30
        }}
      />
      <motion.div
        className="custom-cursor fixed w-24 h-24 rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isHovering ? 0.5 : 1,
          borderColor: isHovering ? "#000" : "#fff"
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 100,
          damping: 30
        }}
      />
    </>
  );
};

export default CustomCursor;
