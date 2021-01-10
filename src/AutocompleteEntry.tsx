import React from 'react';

interface Props {
  children: string;
}

export const AutocompleteEntry = ({ children }: Props) => {
  return <li role="option">{children}</li>;
}