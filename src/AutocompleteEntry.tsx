import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLLIElement> {
  children: string;
}

export const AutocompleteEntry = ({ children }: Props) => {
  return <li role="option">{children}</li>;
}