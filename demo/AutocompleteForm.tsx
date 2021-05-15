import React, { forwardRef, Dispatch, SetStateAction } from "react";

import {
  AutocompleteList,
  AutocompleteInput,
  AutocompleteEntry,
  AutocompleteDropdown,
  useAutocomplete,
  useShowDropdown,
} from "../src";

const results = {
  recentSearches: ["beer", "hummus", "candy", "chocolate", "cookies"],
  trendingSearches: ["kale", "beer", "cake"],
};

const DROPDOWN_ID = "droopy-dropdown";

interface Props {
  results: Record<string, string[]>;
  flattenedResults: string[];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export const AutocompleteForm = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { results, flattenedResults, inputValue, setInputValue } = props;
    const { setHighlightedEntry } = useAutocomplete();
    const showDropdown = useShowDropdown(ref);

    return (
      <>
        <form action="." role="search" className="droopy-container">
          <AutocompleteInput
            placeholder="Search..."
            ref={ref}
            value={inputValue}
            onInputChange={setInputValue}
            autoCapitalize="off"
            autoCorrect="off"
            aria-controls={DROPDOWN_ID}
            aria-expanded={showDropdown && flattenedResults.length > 0}
            className="droopy-input"
          />
          {showDropdown &&
            inputValue.length > 0 &&
            flattenedResults?.length > 0 && (
              <AutocompleteDropdown
                id={DROPDOWN_ID}
                className="droopy-dropdown"
              >
                {flattenedResults &&
                  Object.entries(results).map((entry, listIndex) => {
                    const [entryName, value] = entry;
                    const headerId = `group-${entryName}-header`;

                    return (
                      <React.Fragment
                        key={`${entryName}-${listIndex}-fragment`}
                      >
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
                          key={`${entryName}-listBox`}
                          aria-labelledby={headerId}
                          className="dropdown-entry-list"
                        >
                          {(value as string[]).map((s, optionIndex) => (
                            <AutocompleteEntry
                              className="dropdown-entry"
                              key={`${entry}-listItem`}
                              highlightedClassName="highlighted-entry"
                              onMouseEnter={() => {
                                setHighlightedEntry(s, entryName);
                              }}
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
        </form>
      </>
    );
  }
);
