import React, { forwardRef, HTMLProps } from "react";

import { useAutocomplete } from "./hooks";

interface Props extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange: (param: string) => void;
}

export const AutocompleteInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { onChange, ...options } = props;
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
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            const entry = getPreviousEntry();

            onChange(entry);
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
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
          highlightedIndex >= 0
            ? `group-${activeGroup}-option-${activeGroupIndex}`
            : ""
        }
        {...options}
      />
    );
  }
);
