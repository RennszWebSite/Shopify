import { gsap } from "gsap";

// Initialize GSAP plugins if available
if (typeof window !== "undefined") {
  if ((window as any).ScrollTrigger) {
    gsap.registerPlugin((window as any).ScrollTrigger);
  }
  
  if ((window as any).ScrollToPlugin) {
    gsap.registerPlugin((window as any).ScrollToPlugin);
  }
}

interface AnimateElementOptions {
  target: string | Element;
  fromVars?: gsap.TweenVars;
  toVars: gsap.TweenVars;
  scrollTrigger?: boolean;
  delay?: number;
}

export const animateElement = ({
  target,
  fromVars = {},
  toVars,
  scrollTrigger = false,
  delay = 0
}: AnimateElementOptions) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) {
    console.warn(`Animation target not found: ${target}`);
    return null;
  }
  
  const animation = gsap.timeline({ delay });
  
  if (Object.keys(fromVars).length > 0) {
    animation.set(element, fromVars);
  }
  
  if (scrollTrigger && (window as any).ScrollTrigger) {
    toVars.scrollTrigger = {
      trigger: element,
      start: 'top bottom-=100',
      end: 'bottom center',
      toggleActions: 'play none none none'
    };
  }
  
  animation.to(element, toVars);
  
  return animation;
};

interface SmoothScrollOptions {
  target: string;
  duration?: number;
  offset?: number;
}

export const smoothScroll = ({ target, duration = 1, offset = 0 }: SmoothScrollOptions) => {
  const element = document.querySelector(target);
  
  if (!element) {
    console.warn(`Scroll target not found: ${target}`);
    return;
  }
  
  if ((window as any).ScrollToPlugin) {
    gsap.to(window, {
      duration,
      scrollTo: {
        y: element,
        offsetY: offset
      },
      ease: 'power3.inOut'
    });
  } else {
    // Fallback if ScrollToPlugin is not available
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition + offset,
      behavior: 'smooth'
    });
  }
};

export const animateGlassCaseReveal = (element: Element) => {
  if (!element) return;
  
  const timeline = gsap.timeline();
  
  timeline
    .to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(element, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  
  return timeline;
};

export const initScrollAnimations = () => {
  if (!(window as any).ScrollTrigger) return;
  
  // Animate product glass cases
  gsap.utils.toArray('.product-glass-case').forEach((element: Element) => {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Animate sections
  gsap.utils.toArray('section').forEach((section: Element) => {
    const heading = section.querySelector('h2');
    const content = section.querySelectorAll('p, .glass-card, .grid');
    
    if (heading) {
      gsap.from(heading, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          end: 'center center',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (content.length) {
      gsap.from(content, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          end: 'center center',
          toggleActions: 'play none none none'
        }
      });
    }
  });
};
