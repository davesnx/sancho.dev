import { window } from "browser-monads";

export const formatReadingTime = minutes => `${minutes} min read`;
export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile/i.test(
    window.navigator.userAgent
  );
