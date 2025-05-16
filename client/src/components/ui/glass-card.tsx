import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dataHover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const GlassCard = ({
  children,
  className,
  dataHover = true,
  animate = true,
  onClick,
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn("glass-card relative overflow-hidden", className)}
      data-hover={dataHover ? "true" : undefined}
      onClick={onClick}
      whileHover={
        animate
          ? {
              scale: 1.02,
              y: -10,
              transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
            }
          : undefined
      }
      initial={animate ? { y: 50, opacity: 0 } : undefined}
      whileInView={
        animate
          ? {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            }
          : undefined
      }
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Decorative glass effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white bg-opacity-5 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white bg-opacity-5 rounded-full blur-xl"></div>
      
      {/* Reflective surface effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent opacity-5"></div>
      
      {children}
    </motion.div>
  );
};

export default GlassCard;
