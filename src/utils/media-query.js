import useMedia from "use-media";

import constants from "../constants";

export const useIsMobile = () => {
  const isWide = useMedia({ minWidth: constants.mobile.width });
  const isSmall = !isWide;
  return isSmall;
};
