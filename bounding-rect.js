import { useEffect, useState } from "react";

const useContentRect = ref => {
  const [contentRect, setContentRect] = useState(
    ref.current ? ref.current.getBoundingClientRect() : {}
  );

  useEffect(
    () => {
      if (!ref.current) return;
      const observer = new window.ResizeObserver(entries =>
        setContentRect(entries[0].contentRect)
      );
      observer.observe(ref.current);
      return () => observer.disconnect(ref.current);
    },
    [ref]
  );
  return contentRect;
};

export default useContentRect;
