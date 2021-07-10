import { useContext, createContext } from "react";
import useHighlightedEntry from "./useHighlightedEntry";

type AutocompleteInputProps = {
  inputValue: string;
  setInputValue: (param: string) => void;
  lastTypedValue: string;
  setLastTypedValue: (param: string) => void;
};

type ContextReturnType = ReturnType<typeof useHighlightedEntry> &
  AutocompleteInputProps;

export const AutocompleteContext = createContext<ContextReturnType>({
  activeGroup: "",
  activeGroupIndex: -1,
  activeGroupEntry: "",
  highlightedIndex: -1,
  inputValue: "",
  setInputValue: () => "",
  lastTypedValue: "",
  setLastTypedValue: () => "",
  getPreviousEntry: () => "",
  setHighlightedEntry: () => "",
  getNextEntry: () => "",
  resetHighlightedEntry: () => "",
});

export const useAutocomplete = () => useContext(AutocompleteContext);
