import { useCallback, useEffect, useState } from 'react';

const emptyOrientation = { absolute: false, alpha: null, beta: null, gamma: null };

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState(emptyOrientation);
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState('prompt');

  useEffect(() => {
    const isSupported = 'DeviceOrientationEvent' in window;
    setSupported(isSupported);
    if (!isSupported) setPermission('unsupported');
    else if (typeof DeviceOrientationEvent.requestPermission !== 'function') setPermission('granted');
  }, []);

  useEffect(() => {
    if (permission !== 'granted') return;
    const handle = (event) => {
      setOrientation({ absolute: event.absolute, alpha: event.alpha, beta: event.beta, gamma: event.gamma });
    };
    window.addEventListener('deviceorientation', handle, true);
    return () => window.removeEventListener('deviceorientation', handle, true);
  }, [permission]);

  const requestPermission = useCallback(async () => {
    if (!supported) return setPermission('unsupported');
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') return setPermission('granted');
    try {
      setPermission(await DeviceOrientationEvent.requestPermission());
    } catch {
      setPermission('denied');
    }
  }, [supported]);

  return { ...orientation, permission, requestPermission, supported };
}

export default useDeviceOrientation;
