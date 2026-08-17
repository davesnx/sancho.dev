import { useEffect, useState } from 'react';

const useWindowMousePosition = () => {
  const [WindowMousePosition, setWindowMousePosition] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const handlePointerMove = (event) => {
      setWindowMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
    };
  }, []);

  return WindowMousePosition;
};

export default useWindowMousePosition;
