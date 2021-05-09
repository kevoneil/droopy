import React, { HTMLProps } from "react";
import { useAutocomplete } from "./hooks";

interface Props extends HTMLProps<HTMLLIElement> {
  highlightedCSS?: {};
  highlightedClassName?: string;
  children: string;
}

export const AutocompleteEntry = ({
  highlightedCSS,
  highlightedClassName,
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
      className={
        isHighlighted ? `${className} ${highlightedClassName}` : className
      }
      {...(isHighlighted && highlightedCSS ? highlightedCSS : {})}
      {...options}
    >
      {children}
    </li>
  );
};
