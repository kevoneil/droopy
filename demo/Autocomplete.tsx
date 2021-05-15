import React, { useState, useRef } from "react";

import { AutocompleteContextProvider } from "../src";
import { AutocompleteForm } from "./AutocompleteForm";

const results = {
  recentSearches: ["beer", "hummus", "candy", "chocolate", "cookies"],
  trendingSearches: ["kale", "beer", "cake"],
};

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const finalResults = inputValue.length > 0 ? results : {};
  const flattenedResults = Object.values(finalResults).flat() as string[];
  const resultsString = flattenedResults
    ? `${flattenedResults?.length} results found`
    : "0 results found";

  return (
    <AutocompleteContextProvider results={finalResults}>
      <AutocompleteForm
        ref={inputRef}
        results={results}
        flattenedResults={flattenedResults}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div aria-live="assertive" className="hidden-text">
        {resultsString}
      </div>
    </AutocompleteContextProvider>
  );
};
