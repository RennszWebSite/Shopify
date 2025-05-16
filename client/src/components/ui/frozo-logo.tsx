import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface FrozoLogoProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

const FrozoLogo = ({
  width = 100,
  height = 100,
  color = "#F5F5F5",
  className = "",
  animated = true,
}: FrozoLogoProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (animated) {
      controls.start({
        pathLength: 1,
        transition: {
          duration: 3,
          ease: "easeInOut",
        },
      });
    }
  }, [animated, controls]);

  return (
    <div className={`relative w-${width} h-${height} ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 20 H80 V40 H20 V80 H80"
          stroke={color}
          strokeWidth="2"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={controls}
          className={animated ? "frozo-logo-path" : ""}
        />
      </svg>
      <motion.div
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={
          animated
            ? {
                opacity: 1,
                transition: {
                  delay: 2.5,
                  duration: 1,
                },
              }
            : {}
        }
        className="absolute bottom-0 left-0 w-full text-center font-cormorant tracking-widest"
      >
        FROZO
      </motion.div>
    </div>
  );
};

export default FrozoLogo;
