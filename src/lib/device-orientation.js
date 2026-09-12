import { useEffect, useState } from 'react';

function useDeviceOrientation() {
  const [deviceOrientation, setDeviceOrientation] = useState({
    absolute: false,
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    const handle = (event) => {
      setDeviceOrientation({
        absolute: event.absolute,
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener('deviceorientation', handle, true);

    return () => {
      window.removeEventListener('deviceorientation', handle, true);
    };
  }, []);

  return deviceOrientation;
}

export default useDeviceOrientation;
