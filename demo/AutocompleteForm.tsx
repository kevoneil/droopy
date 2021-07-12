import React, { forwardRef, Dispatch, SetStateAction, FormEvent } from "react";

import {
  AutocompleteList,
  AutocompleteInput,
  AutocompleteEntry,
  AutocompleteDropdown,
  useAutocomplete,
  useShowDropdown,
} from "../src";

const DROPDOWN_ID = "droopy-dropdown";

interface Props {
  results: Record<string, string[]>;
  isInputFocused?: boolean;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  flattenedResults: string[];
}

export const AutocompleteForm = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      results,
      flattenedResults,
      isInputFocused,
      onInputFocus,
      onInputBlur,
    } = props;
    const {
      setHighlightedEntry,
      activeGroupEntry,
      inputValue,
      setInputValue,
      setLastTypedValue,
    } = useAutocomplete();

    const showDropdown = isInputFocused && flattenedResults.length > 0;

    return (
      <>
        <form action="." role="search" className="droopy-container">
          <AutocompleteInput
            placeholder="Search..."
            ref={ref}
            value={inputValue}
            onInputChange={(value: string) => {
              setInputValue(value);
              setLastTypedValue(value);
            }}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            autoCapitalize="off"
            autoCorrect="off"
            aria-autocomplete="list"
            aria-controls={DROPDOWN_ID}
            aria-expanded={showDropdown && flattenedResults.length > 0}
            aria-activedescendant={activeGroupEntry}
            className="droopy-input"
          />
          {showDropdown && (
            <AutocompleteDropdown id={DROPDOWN_ID} className="droopy-dropdown">
              {flattenedResults &&
                Object.entries(results).map((entry) => {
                  const [entryName, value] = entry;
                  const headerId = `group-${entryName}-header`;

                  return (
                    <React.Fragment key={`${entryName}-fragment`}>
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
                        key={`${entryName}-${value}-listBox`}
                        aria-labelledby={headerId}
                        className="dropdown-entry-list"
                      >
                        {(value as string[]).map((s, optionIndex) => (
                          <AutocompleteEntry
                            className="dropdown-entry"
                            id={`group-${entryName}-option-${optionIndex}`}
                            // eslint-disable-next-line react/no-array-index-key
                            key={`group-${entryName}-option-${optionIndex}`}
                            highlightedClassName="highlighted-entry"
                            onMouseEnter={() => {
                              setHighlightedEntry(s, entryName);
                            }}
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
