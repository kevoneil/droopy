import React, { useState, useRef, useEffect } from "react";

import { AutocompleteContextProvider } from "../src";
import { AutocompleteForm } from "./AutocompleteForm";
import { fuzzySearch } from "./fuzzysearch";

const results = {
  recentSearches: ["beer", "hummus", "candy", "chocolate", "cookies"],
  trendingSearches: ["kale", "beer", "cake"],
};

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [lastTypedValue, setLastTypedValue] = useState("");
  const [isInputFocused, setIsFocused] = useState(false);

  const flattenedResults = Object.values(results).flat() as string[];
  const resultsString = flattenedResults
    ? `${flattenedResults?.length} results found`
    : "0 results found";
  const fuzzySearchResults =
    fuzzySearch(lastTypedValue, flattenedResults) || [];
  const showInitialResults = isInputFocused && lastTypedValue.length === 0;
  const autocompleteResults = {
    autocompleteResults: fuzzySearchResults,
  };

  return (
    <AutocompleteContextProvider
      results={showInitialResults ? results : autocompleteResults}
      inputValue={inputValue}
      setInputValue={setInputValue}
      lastTypedValue={inputValue}
      setLastTypedValue={setLastTypedValue}
    >
      <AutocompleteForm
        ref={inputRef}
        results={showInitialResults ? results : autocompleteResults}
        isInputFocused={isInputFocused}
        onInputFocus={() => {
          setIsFocused(true);
        }}
        onInputBlur={() => {
          setIsFocused(false);
        }}
        flattenedResults={
          showInitialResults ? flattenedResults : fuzzySearchResults
        }
      />
      <div aria-live="assertive" className="hidden-text">
        {resultsString}
      </div>
    </AutocompleteContextProvider>
  );
};
