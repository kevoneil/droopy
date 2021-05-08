import React, { useState, useRef, useMemo } from "react";
import { AutocompleteInput } from "./AutocompleteInput";
import { AutocompleteList } from "./AutocompleteList";
import { AutocompleteEntry } from "./AutocompleteEntry";
import { Dropdown } from "./Dropdown";
import { useShowDropdown } from "./hooks/useShowDropdown";
import { AutocompleteContextProvider } from "./AutocompleteContextProvider";

const results = {
  recentSearches: ["beer", "hummus", "candy"],
  trendingSearches: ["kale", "beer"],
};

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const showDropdown = useShowDropdown(inputRef);

  function getResults() {
    const inputValue = inputRef.current?.value;

    if (!inputValue?.length) return {};

    return Object.entries(results).reduce((acc, entry) => {
      const [entryName, valueArray] = entry;

      if (!valueArray.includes(inputValue)) {
        return { ...acc };
      }

      const newArray = valueArray.filter((s: string) => s.match(inputValue));
      return { ...acc, [entryName]: newArray };
    }, {});
  }

  const filteredResults = useMemo(() => getResults(), [inputValue]);
  const flattenedResults = Object.values(filteredResults).flat();
  const resultsString = `${flattenedResults?.length || 0} results found`;

  return (
    <AutocompleteContextProvider results={filteredResults}>
      <AutocompleteInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputValue}
      />
      {showDropdown && inputValue.length > 0 && (
        <Dropdown>
          {flattenedResults &&
            Object.entries(filteredResults).map((entry, index) => {
              const [entryName, value] = entry;
              const headerId = `group-${entryName}-header`;
              return (
                <>
                  <h3 id={headerId}>
                    {entryName === "recentSearches"
                      ? "Recent Searches"
                      : "Popular Searches"}
                  </h3>
                  <AutocompleteList aria-labelledby={headerId}>
                    {value.map((s, optionIndex) => (
                      <AutocompleteEntry
                        id={`group-${entryName}-option-${optionIndex}`}
                      >
                        {s}
                      </AutocompleteEntry>
                    ))}
                  </AutocompleteList>
                </>
              );
            })}
        </Dropdown>
      )}
      <div aria-live="assertive" className="hidden-text">
        {resultsString}
      </div>
    </AutocompleteContextProvider>
  );
};
