import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  styles?: {};
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteDropdown = (props: Props) => {
  const { children, ...options } = props;

  return (
    <div data-testid="autocomplete-dropdown" {...options}>
      {children}
    </div>
  );
};
