import React, { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLUListElement> {
  styles?: {};
  className?: string;
  children: JSX.Element | JSX.Element[];
  ariaResults: string;
}

export const AutocompleteList = (props: Props) => {
  const {children, ...options } = props
  
  return (
    <ul role="listbox" {...options}>
      {children}
      <div aria-live="assertive">
        {options?.ariaResults}
      </div>
    </ul>
  );
}