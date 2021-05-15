import React from "react";
import { useHighlightedEntry, AutocompleteContext } from "./hooks";

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
