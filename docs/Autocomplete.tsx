import React, { useState, useRef, useMemo } from "react";

import {
  AutocompleteList,
  AutocompleteInput,
  AutocompleteEntry,
  AutocompleteDropdown,
  useShowDropdown,
  AutocompleteContextProvider,
} from "../src";

const results = {
  recentSearches: ["beer", "hummus", "candy", "chocolate", "cookies"],
  trendingSearches: ["kale", "beer", "cake"],
};

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const showDropdown = useShowDropdown(inputRef);

  const flattenedResults = Object.values(results).flat();
  const resultsString = `${flattenedResults?.length || 0} results found`;

  return (
    <AutocompleteContextProvider results={results}>
      <form role="search" className="droopy-container">
        <AutocompleteInput
          ref={inputRef}
          value={inputValue}
          onInputChange={setInputValue}
          className="droopy-input"
        />
        {showDropdown && inputValue.length > 0 && flattenedResults?.length > 0 && (
          <AutocompleteDropdown className="droopy-dropdown">
            {flattenedResults &&
              Object.entries(results).map((entry, listIndex) => {
                const [entryName, value] = entry;
                const headerId = `group-${entryName}-header`;

                return (
                  <React.Fragment key={`${entryName}-${listIndex}-fragment`}>
                    <h3 id={headerId} className="dropdown-entry-header">
                      {entryName === "recentSearches"
                        ? "Recent Searches"
                        : "Popular Searches"}
                    </h3>
                    <AutocompleteList
                      key={`${entryName}-${listIndex}`}
                      aria-labelledby={headerId}
                      className="dropdown-entry-list"
                    >
                      {(value as string[]).map((s, optionIndex) => (
                        <AutocompleteEntry
                          className="dropdown-entry"
                          key={`${entry}-${optionIndex}`}
                          highlightedClassName="highlighted-entry"
                          id={`group-${entryName}-option-${optionIndex}`}
                        >
                          {s}
                        </AutocompleteEntry>
                      ))}
                    </AutocompleteList>
                  </React.Fragment>
                );
              })}
          </AutocompleteDropdown>
        )}
        <div aria-live="assertive" className="hidden-text">
          {resultsString}
        </div>
      </form>
    </AutocompleteContextProvider>
  );
};
