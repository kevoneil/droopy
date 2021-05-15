import { useState } from "react";

const useHighlightedEntry = (results: Record<string, string[]>) => {
  // for internal tracking
  const newResults = Object.entries(results).map((entry) => {
    const [entryName, values] = entry;

    return values.map((value) => `${value}-${entryName}`);
  });

  const [activeGroup, setActiveGroup] = useState("");
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const flattenedResults = Object.values(newResults).flat();

  const getNewEntry = (newIndex: number) => {
    const result = flattenedResults?.[newIndex]?.split("-");
    const activeGroupGetter = result?.[1] || "";
    setActiveGroup(activeGroupGetter);
    setHighlightedIndex(newIndex);
    setActiveGroupIndex(results?.[activeGroupGetter]?.indexOf(result[0]));
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
    setActiveGroupIndex(-1);
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

export default useHighlightedEntry;
