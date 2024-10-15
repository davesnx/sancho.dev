import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import constants from "../theme/constants";

export type Effect = (_effect: EffectCallback, _deps?: DependencyList) => void;
export type MediaQueryObject = { [key: string]: string | number | boolean };

const QUERY_COMBINATOR = " and ";

function camelToHyphen(camelString: string) {
  return camelString
    .replace(/[A-Z]/g, (string) => `-${string.toLowerCase()}`)
    .toLowerCase();
}

function queryObjectToString(query: string | MediaQueryObject) {
  if (typeof query === "string") {
    return query;
  }

  return Object.entries(query)
    .map(([feature, value]) => {
      let convertedFeature = camelToHyphen(feature);
      let convertedValue = value;

      if (typeof convertedValue === "boolean") {
        return convertedValue ? convertedFeature : `not ${convertedFeature}`;
      }

      if (
        typeof convertedValue === "number" &&
        /[height|width]$/.test(convertedFeature)
      ) {
        convertedValue = `${convertedValue}px`;
      }

      return `(${convertedFeature}: ${convertedValue})`;
    })
    .join(QUERY_COMBINATOR);
}

const noop = () => {};

export const mockMediaQueryList: MediaQueryList = {
  media: "",
  matches: false,
  onchange: noop,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

const createUseMedia =
  (effect: Effect) =>
  (rawQuery: string | MediaQueryObject, defaultState = false) => {
    let [state, setState] = useState(defaultState);
    let query = queryObjectToString(rawQuery);

    effect(() => {
      let mounted = true;
      let mediaQueryList: MediaQueryList =
        typeof window === "undefined"
          ? mockMediaQueryList
          : window.matchMedia(query);

      let onChange = () => {
        if (!mounted) {
          return;
        }

        setState(Boolean(mediaQueryList.matches));
      };

      mediaQueryList.addListener(onChange);
      setState(mediaQueryList.matches);

      return () => {
        mounted = false;
        mediaQueryList.removeListener(onChange);
      };
    }, [query]);

    return state;
  };

export const useMedia = createUseMedia(useEffect);
export const useMediaLayout = createUseMedia(useLayoutEffect);

export default useMedia;

export const useIsMobile = () => {
  let isWide = useMedia({ minWidth: constants.mobile.width + "px" });
  let isSmall = !isWide;
  return isSmall;
};
