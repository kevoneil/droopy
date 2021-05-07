import React, { forwardRef, HTMLProps } from "react";

import { useAutocomplete } from "./hooks";

interface Props {
  value: string;
  results: string[];
  onChange: (param: string) => void;
}

export const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { results, onChange, ...options } = props;
    const {
      highlightedIndex,
      getNextEntry,
      getPreviousEntry,
      resetHighlightedEntry,
    } = useAutocomplete();

    return (
      <input
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            const entry = getPreviousEntry();

            onChange(entry);
          }
          if (event.key === "ArrowDown") {
            const entry = getNextEntry();

            onChange(entry);
          }

          if (event.key === "Escape") {
            onChange("");
            resetHighlightedEntry();
          }
        }}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        aria-activedescendant={
          highlightedIndex >= 0 ? `group-0-option-${highlightedIndex}` : ""
        }
        {...options}
      />
    );
  }
);
