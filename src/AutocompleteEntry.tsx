import React, { HTMLProps } from "react";
import { useAutocomplete } from "./hooks";

interface Props extends HTMLProps<HTMLLIElement> {
  isHighlighted: string | {};
  children: string;
}

export const AutocompleteEntry = ({ isHighlighted, children, id }: Props) => {
  const { activeGroup, activeGroupIndex } = useAutocomplete();
  const highlightedId = `group-${activeGroup}-option-${activeGroupIndex}`;

  return (
    <li
      {...(typeof isHighlighted === "object" ? isHighlighted : {})}
      className={
        id === highlightedId && typeof isHighlighted === "string"
          ? isHighlighted
          : ""
      }
      role="option"
      id={id}
    >
      {children}
    </li>
  );
};
