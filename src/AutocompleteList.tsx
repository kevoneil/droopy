import React, { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLUListElement> {
  styles?: {};
  className?: string;
  children: JSX.Element | JSX.Element[];
  ariaResults: string;
  ariaGroupHeader?: string;
  headerText?: string
}

export const AutocompleteList = (props: Props) => {
  const {children, headerText, ariaGroupHeader, ...options } = props
  
  return (
    <>
      {headerText && ariaGroupHeader && (
        <h3 aria-aria-labelledby={ariaGroupHeader}>{headerText}</h3>
      )}
      <ul role="listbox" {...options} aria-labelledby="label">
        {children}
        <div aria-live="polite" role="log" className="hidden-text">
          {options?.ariaResults}
        </div>
      </ul>
    </>
  );
}