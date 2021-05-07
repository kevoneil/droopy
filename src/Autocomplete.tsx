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
  const ariaGroup = "group-0";

  function getResults() {
    const inputValue = inputRef.current?.value;

    if (!inputValue?.length) return {};

    return Object.entries(results).reduce((acc, entry) => {
      const [entryName, valueArray] = entry;

      if (!valueArray.includes(inputValue)) {
        return { ...acc };
      }

      const newArray = valueArray.filter((s: string) => s.match("beer"));
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
            Object.entries(filteredResults).map((entry) => {
              const [entryName] = entry;
              return (
                <AutocompleteList
                  headerText={
                    entryName === "recentSearches"
                      ? "Recent Searches"
                      : "Popular Searches"
                  }
                  ariaGroupHeader={`${ariaGroup}-header`}
                >
                  <div>test</div>
                </AutocompleteList>
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
