import { useHighlightedEntry } from "./useHighlighedEntry";

export const useAutocomplete = (results: string[]) => {
  const {
    getNextEntry,
    getPreviousEntry,
    highlightedIndex,
  } = useHighlightedEntry(results);

  return {
    getNextEntry,
    getPreviousEntry,
    highlightedIndex,
  };
};
