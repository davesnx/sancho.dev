import * as React from "react";

import copy from "copy-to-clipboard";

/**
 * React hook to copy content to clipboard
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */
export function useClipboard(
  text: string,
  timeout = 1500
): { value: string; onCopy: () => void; hasCopied: boolean } {
  let [hasCopied, setHasCopied] = React.useState(false);

  let onCopy = React.useCallback(() => {
    let didCopy = copy(text);
    setHasCopied(didCopy);
  }, [text]);

  React.useEffect(() => {
    if (hasCopied) {
      let id = setTimeout(() => {
        setHasCopied(false);
      }, timeout);

      return () => clearTimeout(id);
    }

    return () => {};
  }, [timeout, hasCopied]);

  return { value: text, onCopy, hasCopied };
}
