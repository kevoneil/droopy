import React, { HTMLProps } from "react";
import { useAutocomplete } from "./hooks";

interface Props extends HTMLProps<HTMLLIElement> {
  children: string;
}

export const AutocompleteEntry = ({ children, id }: Props) => {
  const { activeGroup, activeGroupIndex } = useAutocomplete();
  const highlightedId = `group-${activeGroup}-option-${activeGroupIndex}`;
  const isHighlighted = id === highlightedId ? "highlighted-entry" : "";

  return (
    <li className={isHighlighted} role="option" id={id}>
      {children}
    </li>
  );
};
