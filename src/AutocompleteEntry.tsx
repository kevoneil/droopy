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
  children,
  id,
}: Props) => {
  const { activeGroup, activeGroupIndex } = useAutocomplete();
  const highlightedId = `group-${activeGroup}-option-${activeGroupIndex}`;
  const isHighlighted = id === highlightedId;

  return (
    <li
      id={id}
      role="option"
      {...(isHighlighted && highlightedCSS ? highlightedCSS : {})}
      className={isHighlighted ? highlightedClassName : ""}
    >
      {children}
    </li>
  );
};
