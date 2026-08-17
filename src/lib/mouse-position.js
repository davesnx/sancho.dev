import { useEffect, useState } from 'react';

const useWindowMousePosition = () => {
  const [WindowMousePosition, setWindowMousePosition] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setWindowMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return WindowMousePosition;
};

export default useWindowMousePosition;
