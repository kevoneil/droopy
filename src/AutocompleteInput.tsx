import React, { forwardRef, HTMLProps } from "react";

import { useAutocomplete } from "./hooks";

interface Props extends React.HTMLProps<HTMLInputElement> {
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
    } = useAutocomplete();

    return (
      <input
        name="search"
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            const entry = getPreviousEntry();

            onInputChange(entry);
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            const entry = getNextEntry();

            onInputChange(entry);
          }

          if (event.key === "Escape") {
            onInputChange("");
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
