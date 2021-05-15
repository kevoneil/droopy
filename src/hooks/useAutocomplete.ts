import { useContext, createContext } from 'react';
import useHighlightedEntry from './useHighlighedEntry';

type ContextReturnType = ReturnType<typeof useHighlightedEntry>;

export const AutocompleteContext = createContext<ContextReturnType>({
  activeGroup: '',
  activeGroupIndex: -1,
  highlightedIndex: -1,
  getPreviousEntry: () => '',
  getNextEntry: () => '',
  resetHighlightedEntry: () => '',
});

export const useAutocomplete = () => useContext(AutocompleteContext);
