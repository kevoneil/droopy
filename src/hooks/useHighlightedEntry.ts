import { useState } from "react";
import key from "weak-key";

const useHighlightedEntry = (results: Record<string, string[]>) => {
  // for internal tracking
  const newResults = Object.entries(results).map((entry) => {
    const [entryName, values] = entry;

    return values.map((value) => {
      const uniqueKey = key({ text: `${value}-${entryName}` });
      return `${value}-${entryName}-${uniqueKey}`;
    });
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

    newResults.filter((array) => {
      if (array.indexOf(result.join("-")) > -1) {
        setActiveGroupIndex(array.indexOf(result.join("-")));
      }

      return "";
    });
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

  const setHighlightedEntry = (term: string, groupName: string) => {
    const entry = flattenedResults.findIndex(
      (string) => string === `${term}-${groupName}`
    );
    setHighlightedIndex(entry);
    setActiveGroup(groupName);
    setActiveGroupIndex(results?.[groupName].indexOf(term));
  };

  const activeGroupEntry = `group-${activeGroup}-option-${setActiveGroupIndex}`;

  return {
    activeGroup,
    activeGroupIndex,
    activeGroupEntry,
    highlightedIndex,
    setHighlightedEntry,
    getPreviousEntry,
    resetHighlightedEntry,
    getNextEntry,
  };
};

export default useHighlightedEntry;
