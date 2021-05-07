import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLUListElement> {
  styles?: {};
  className?: string;
  children: JSX.Element | JSX.Element[];
  ariaGroupHeader?: string;
  headerText?: string;
}

export const AutocompleteList = (props: Props) => {
  const {
    children,
    headerText,
    ariaResultsText,
    ariaGroupHeader,
    ...options
  } = props;

  return (
    <>
      {headerText && ariaGroupHeader && (
        <h3 aria-labelledby={ariaGroupHeader}>{headerText}</h3>
      )}
      <ul role="listbox" {...options} aria-labelledby="label">
        {children}
      </ul>
    </>
  );
};
