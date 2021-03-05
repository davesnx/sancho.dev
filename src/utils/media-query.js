import React from "react";
import useMedia from "use-media";
import { window } from "browser-monads";

import constants from "../constants";

export const isUAMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile/i.test(
    window.navigator.userAgent
  );

export const useIsMobile = () => {
  const isWide = useMedia({ minWidth: constants.width });
  const [isMobile, setIsMobile] = React.useState(!isWide);

  React.useEffect(() => {
    setIsMobile(isUAMobile());
  }, []);

  return isMobile || !isWide;
};
