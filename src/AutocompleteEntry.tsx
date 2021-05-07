import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLLIElement> {
  children: string;
}

export const AutocompleteEntry = ({ children, id }: Props) => {
  return (
    <li role="option" id={id}>
      {children}
    </li>
  );
};
