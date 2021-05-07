import React, { createContext } from "react";
import { useHighlightedEntry } from "./hooks";

type ContextReturnType = ReturnType<typeof useHighlightedEntry>;

export const AutocompleteContext = createContext<ContextReturnType>({
  highlightedIndex: -1,
  getPreviousEntry: () => "",
  getNextEntry: () => "",
  resetHighlightedEntry: () => "",
});

interface Props {
  results: Record<string, string[]>;
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteContextProvider = ({ results, children }: Props) => {
  const autocompleteProps = useHighlightedEntry(results);

  return (
    <AutocompleteContext.Provider
      value={{
        ...autocompleteProps,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};
