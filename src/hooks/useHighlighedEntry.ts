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

  const getPreviousEntry = () => {
    if (highlightedIndex <= 0) {
      const result = flattenedResults?.[flattenedResults?.length - 1]
        ?.pop()
        .split("-");
      setHighlightedIndex(flattenedResults?.length - 1);
      setActiveGroup(result?.[1]);
      return result?.[0];
    }

    const result = flattenedResults?.[highlightedIndex - 1]?.pop()?.split("-");
    setActiveGroup(result?.[1] || "");
    setHighlightedIndex(highlightedIndex - 1);
    return result[0];
  };

  const getNextEntry = () => {
    if (highlightedIndex + 1 >= flattenedResults?.length) {
      setHighlightedIndex(0);
      const result = flattenedResults?.[0].pop().split("-");
      const activeGroup = result?.[1] || "";
      setActiveGroup(activeGroup);
      setActiveGroupIndex(results?.[activeGroup]?.indexOf(result?.[0]));
      return result?.[0];
    }

    const result = flattenedResults?.[highlightedIndex + 1].pop().split("-");
    setActiveGroup(result?.[1] || "");
    setActiveGroupIndex(results?.[activeGroup]?.indexOf(result?.[0]));
    setHighlightedIndex(highlightedIndex + 1);
    return result?.[0];
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
