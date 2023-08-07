import { useEffect, useState } from "react";

const useViewport = () => {
  const getCurrentDimensions = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getCurrentDimensions());
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimensions());
    };
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return screenSize;
};

export default useViewport;
