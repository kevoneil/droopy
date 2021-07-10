import React from "react";
import { useHighlightedEntry, AutocompleteContext } from "./hooks";

interface Props {
  results: Record<string, string[]>;
  children: JSX.Element | JSX.Element[];
  inputValue: string;
  setInputValue: (value: string) => void;
  lastTypedValue: string;
  setLastTypedValue: (value: string) => void;
}

export const AutocompleteContextProvider = ({
  results,
  inputValue,
  setInputValue,
  lastTypedValue,
  setLastTypedValue,
  children,
}: Props) => {
  const autocompleteProps = useHighlightedEntry(results);

  return (
    <AutocompleteContext.Provider
      value={{
        ...autocompleteProps,
        inputValue,
        setInputValue,
        lastTypedValue,
        setLastTypedValue,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};
