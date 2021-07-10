import React, { forwardRef, HTMLProps } from "react";

import { useAutocomplete } from "./hooks";

interface Props extends HTMLProps<HTMLInputElement> {
  value: string;
  onInputChange: (param: string) => void;
}

export const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onInputChange, ...options } = props;
    const {
      activeGroup,
      activeGroupIndex,
      highlightedIndex,
      getNextEntry,
      getPreviousEntry,
      resetHighlightedEntry,
      setInputValue,
      setLastTypedValue,
    } = useAutocomplete();

    return (
      <input
        name="search"
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            const entry = getPreviousEntry();

            setInputValue(entry);
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            const entry = getNextEntry();

            setInputValue(entry);
          }

          if (event.key === "Escape") {
            setInputValue("");
            setLastTypedValue("");
            resetHighlightedEntry();
          }
        }}
        onChange={(event) => {
          onInputChange(event.currentTarget.value);
        }}
        aria-haspopup="listbox"
        aria-activedescendant={
          highlightedIndex >= 0
            ? `group-${activeGroup}-option-${activeGroupIndex}`
            : ""
        }
        {...options}
      />
    );
  }
);
