const { useState, useEffect } = require("react");

const useWindowMousePosition = () => {
  const [WindowMousePosition, setWindowMousePosition] = useState({
    x: null,
    y: null
  });

  const handleMouseMove = e => {
    setWindowMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return WindowMousePosition;
};

module.exports = useWindowMousePosition;
