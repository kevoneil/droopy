import React from 'react'

interface Props {
  styles?: {};
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteList = (props: Props) => {
  const {children, ...options } = props
  
  return <ul role="listbox" {...options}>{children}</ul>;
}