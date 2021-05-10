import React, { useState, useRef, useMemo } from "react";

import {
  AutocompleteList,
  AutocompleteInput,
  AutocompleteEntry,
  AutocompleteDropdown,
  useShowDropdown,
  AutocompleteContextProvider,
  useAutocomplete,
} from "../src";

const results = {
  recentSearches: ["beer", "hummus", "candy", "chocolate", "cookies"],
  trendingSearches: ["kale", "beer", "cake"],
};

const DROPDOWN_ID = "droopy-dropdown";

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const showDropdown = useShowDropdown(inputRef);

  const finalResults = inputValue.length > 0 ? results : {};
  const flattenedResults = Object.values(finalResults).flat();
  const resultsString =
    flattenedResults && showDropdown
      ? `${flattenedResults?.length} results found`
      : "0 results found";

  return (
    <AutocompleteContextProvider results={finalResults}>
      <div className="droopy-container">
        <AutocompleteInput
          placeholder="Search..."
          ref={inputRef}
          value={inputValue}
          onInputChange={setInputValue}
          autoCapitalize="off"
          autoCorrect="off"
          aria-controls={DROPDOWN_ID}
          aria-expanded={showDropdown && flattenedResults.length > 0}
          className="droopy-input"
        />
        {showDropdown && inputValue.length > 0 && flattenedResults?.length > 0 && (
          <AutocompleteDropdown id={DROPDOWN_ID} className="droopy-dropdown">
            {flattenedResults &&
              Object.entries(results).map((entry, listIndex) => {
                const [entryName, value] = entry;
                const headerId = `group-${entryName}-header`;

                return (
                  <React.Fragment key={`${entryName}-${listIndex}-fragment`}>
                    <h3
                      id={headerId}
                      className="dropdown-entry-header"
                      aria-hidden
                    >
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
      </div>
    </AutocompleteContextProvider>
  );
};
