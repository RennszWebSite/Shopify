import { useEffect, useRef, useState } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  easing?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const {
    speed = 0.1,
    direction = "up",
    easing = 0.1
  } = options;
  
  const ref = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  const frameId = useRef<number>(0);
  const previousScrollY = useRef<number>(0);

  const calculateParallax = () => {
    if (!ref.current || !isInView) return;

    const scrollY = window.scrollY;
    const scrollDelta = scrollY - previousScrollY.current;
    previousScrollY.current = scrollY;
    
    let { x, y } = position;

    // Update position based on direction
    switch (direction) {
      case "up":
        y -= scrollDelta * speed;
        break;
      case "down":
        y += scrollDelta * speed;
        break;
      case "left":
        x -= scrollDelta * speed;
        break;
      case "right":
        x += scrollDelta * speed;
        break;
    }

    // Apply easing
    const targetX = x;
    const targetY = y;
    x += (targetX - x) * easing;
    y += (targetY - y) * easing;

    setPosition({ x, y });
    
    // Apply transform
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    frameId.current = requestAnimationFrame(calculateParallax);
  };
  
  const checkIfInView = () => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const isVisible = 
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;
      
    setIsInView(isVisible);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      checkIfInView();
      if (isInView && !frameId.current) {
        frameId.current = requestAnimationFrame(calculateParallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkIfInView);
    
    // Initial check
    checkIfInView();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkIfInView);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [isInView]);

  return { ref, isInView };
};
