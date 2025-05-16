import { useState, useEffect } from "react";

export const useAnimationPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the window to load
    const handleLoad = () => {
      // Add a timeout to show the preloader for at least 1.5 seconds
      // This ensures the logo animation has time to play
      setTimeout(() => {
        // Fade out the preloader
        setIsLoading(false);
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return { isLoading };
};
