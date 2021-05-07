import { useState } from "react";

export const useHighlightedEntry = (results: string[]) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const getPreviousEntry = () => {
    if (highlightedIndex <= 0) {
      setHighlightedIndex(results.length - 1);
      return results[results.length - 1];
    }

    setHighlightedIndex(highlightedIndex - 1);
    return results[highlightedIndex - 1];
  };

  const getNextEntry = () => {
    if (highlightedIndex + 1 >= results.length) {
      setHighlightedIndex(0);
      return results[0];
    }

    setHighlightedIndex(highlightedIndex + 1);
    return results[highlightedIndex + 1];
  };

  return { getPreviousEntry, getNextEntry };
};
