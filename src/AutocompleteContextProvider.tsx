import React, { createContext } from "react";
import { useAutocomplete } from "./hooks";

const AutocompleteContext = createContext({});

interface Props {
  results: string[];
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteContextProvider = ({ results, children }: Props) => {
  const autocompleteProps = useAutocomplete(results);

  return (
    <AutocompleteContext.Provider value={autocompleteProps}>
      {children}
    </AutocompleteContext.Provider>
  );
};
