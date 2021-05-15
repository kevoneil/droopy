import React, { HTMLProps } from "react";
import { useAutocomplete } from "./hooks/useAutocomplete";

interface Props extends HTMLProps<HTMLLIElement> {
  highlightedCSS?: {};
  highlightedClassName?: string;
  children: string;
}

export const AutocompleteEntry = ({
  highlightedCSS = {},
  highlightedClassName = "",
  className,
  children,
  id,
  ...options
}: Props) => {
  const { activeGroup, activeGroupIndex } = useAutocomplete();
  const highlightedId = `group-${activeGroup}-option-${activeGroupIndex}`;
  const isHighlighted = id === highlightedId;

  return (
    <li
      id={id}
      role="option"
      aria-selected={isHighlighted}
      className={
        isHighlighted ? `${className} ${highlightedClassName}` : className
      }
      style={isHighlighted ? highlightedCSS : {}}
      {...options}
    >
      {children}
    </li>
  );
};
