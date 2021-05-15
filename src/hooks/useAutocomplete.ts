import { useContext, createContext } from 'react';

export const AutocompleteContext = createContext<ContextReturnType>({
  activeGroup: '',
  activeGroupIndex: -1,
  highlightedIndex: -1,
  getPreviousEntry: () => '',
  getNextEntry: () => '',
  resetHighlightedEntry: () => '',
});

export const useAutocomplete = () => useContext(AutocompleteContext);
