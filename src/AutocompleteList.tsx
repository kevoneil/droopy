import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLUListElement> {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteList = (props: Props) => {
  const { children, ...options } = props;

  return (
    <ul role="listbox" {...options}>
      {children}
    </ul>
  );
};
