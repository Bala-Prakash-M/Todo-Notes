import { useEffect, useState } from "react";

type ScreenSize = {
  isMobile: boolean;
  isPad: boolean;
  isDesktop: boolean;
};

const useScreenSize = (): ScreenSize => {
  const getScreenSize = (): ScreenSize => {
    const width = window.innerWidth;

    return {
      isMobile: width < 640,
      isPad: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
    };
  };

  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isPad: false,
        isDesktop: true,
      };
    }

    return getScreenSize();
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;