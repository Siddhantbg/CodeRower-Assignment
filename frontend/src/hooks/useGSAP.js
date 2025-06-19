import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Page entrance animation
export const usePageAnimation = () => {
  const pageRef = useRef();

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  return pageRef;
};

// Stagger animation for multiple elements
export const useStaggerAnimation = (selector, delay = 0) => {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll(selector),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: delay,
          ease: "power2.out"
        }
      );
    }
  }, [selector, delay]);

  return containerRef;
};

// Button hover animations
export const useButtonHover = () => {
  const buttonRef = useRef();

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { 
        scale: 1.05, 
        duration: 0.2, 
        ease: "power1.out" 
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { 
        scale: 1, 
        duration: 0.2, 
        ease: "power1.out" 
      });
    }
  };

  return { buttonRef, handleMouseEnter, handleMouseLeave };
};

// Input focus animations
export const useInputFocus = () => {
  const handleFocus = (e) => {
    gsap.to(e.target, { 
      scale: 1.02, 
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handleBlur = (e) => {
    gsap.to(e.target, { 
      scale: 1, 
      duration: 0.2,
      ease: "power1.out"
    });
  };

  return { handleFocus, handleBlur };
};

// Results reveal animation
export const useResultsAnimation = () => {
  const resultsRef = useRef();

  const animateResults = () => {
    if (resultsRef.current) {
      gsap.fromTo(resultsRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }
      );

      // Animate individual result rows
      setTimeout(() => {
        gsap.fromTo(resultsRef.current.querySelectorAll('.result-row'),
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.4, 
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }, 300);
    }
  };

  return { resultsRef, animateResults };
};