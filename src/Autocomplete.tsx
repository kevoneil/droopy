import React, { useState, useRef, useMemo } from "react";
import { AutocompleteInput } from "./AutocompleteInput";
import { AutocompleteList } from "./AutocompleteList";
import { AutocompleteEntry } from "./AutocompleteEntry";
import { Dropdown } from "./Dropdown";
import { useShowDropdown } from "./hooks/useShowDropdown";
import { AutocompleteContextProvider } from "./AutocompleteContextProvider";

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const showDropdown = useShowDropdown(inputRef);
  const results = ["beer", "hummus", "candy"];
  const ariaGroup = "group-0";

  function getResults() {
    const inputValue = inputRef.current?.value;

    if (!inputValue?.length) return [];

    return results.filter((result) => {
      if (result.match(inputValue)) {
        return result;
      }
    });
  }

  const filteredResults = useMemo(() => getResults(), [inputValue]);
  const resultsString = `${filteredResults?.length || 0} results found`;

  return (
    <AutocompleteContextProvider results={filteredResults}>
      <AutocompleteInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputValue}
        results={filteredResults}
      />
      {showDropdown && (
        <Dropdown>
          <AutocompleteList
            headerText="Recent Entries"
            ariaGroupHeader={`${ariaGroup}-header`}
          >
            {filteredResults.map((result, index) => (
              <AutocompleteEntry
                key={result}
                id={`${ariaGroup}-option-${index}`}
              >
                {result}
              </AutocompleteEntry>
            ))}
          </AutocompleteList>
        </Dropdown>
      )}
      <div aria-live="assertive" className="hidden-text">
        {resultsString}
      </div>
    </AutocompleteContextProvider>
  );
};
