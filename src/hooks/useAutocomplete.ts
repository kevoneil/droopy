import { useContext, createContext } from "react";
import useHighlightedEntry from "./useHighlightedEntry";

type ContextReturnType = ReturnType<typeof useHighlightedEntry>;

export const AutocompleteContext = createContext<ContextReturnType>({
  activeGroup: "",
  activeGroupIndex: -1,
  activeGroupEntry: "",
  highlightedIndex: -1,
  getPreviousEntry: () => "",
  setHighlightedEntry: () => "",
  getNextEntry: () => "",
  resetHighlightedEntry: () => "",
});

export const useAutocomplete = () => useContext(AutocompleteContext);
