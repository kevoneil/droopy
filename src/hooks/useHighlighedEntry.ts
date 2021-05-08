import { useState } from "react";

export const useHighlightedEntry = (results: Record<string, string[]>) => {
  // for internal tracking
  const newResults = Object.entries(results).map((entry) => {
    const [entryName, values] = entry;

    return values.map((value) => `${value}-${entryName}`);
  });

  const [activeGroup, setActiveGroup] = useState("");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const flattenedResults = Object.values(newResults);

  const getNewEntry = (newIndex: number) => {
    const result = flattenedResults?.[newIndex]?.pop().split("-");
    setHighlightedIndex(newIndex);
    setActiveGroup(result?.[1]);
    return result?.[0] || "";
  };

  const getPreviousEntry = () => {
    if (highlightedIndex <= 0) {
      return getNewEntry(flattenedResults?.length - 1);
    }

    return getNewEntry(highlightedIndex - 1);
  };

  const getNextEntry = () => {
    if (highlightedIndex + 1 >= flattenedResults?.length) {
      return getNewEntry(0);
    }

    return getNewEntry(highlightedIndex + 1);
  };

  const resetHighlightedEntry = () => {
    setHighlightedIndex(-1);
    setActiveGroup("");
    return "";
  };

  return {
    activeGroup,
    activeGroupIndex,
    highlightedIndex,
    getPreviousEntry,
    resetHighlightedEntry,
    getNextEntry,
  };
};
