
import * as React from "react";

// Standard breakpoint for mobile devices (tailwind md breakpoint)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkIfMobile = () => {
      // Check if it's a mobile device or a narrow window
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isNarrowWindow = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileDevice || isNarrowWindow);
    };

    // Initial check
    checkIfMobile();

    // Listen for window resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      checkIfMobile();
    };

    mql.addEventListener("change", onChange);
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Default to desktop if undefined (during SSR)
  return isMobile === undefined ? false : isMobile;
}
