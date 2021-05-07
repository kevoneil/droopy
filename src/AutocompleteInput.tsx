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
    const { getPreviousEntry, getNextEntry } = useAutocomplete();

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
        }}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
        aria-activedescendant="group-0-option-0"
        {...options}
      />
    );
  }
);
