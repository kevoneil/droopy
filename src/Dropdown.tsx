import React from 'react';

interface Props { 
  className?: string;
  styles?: {};
  children: JSX.Element | JSX.Element[];
}

export const Dropdown = (props: Props) => { 
  const { children, ...options} = props;

  return <div {...options}>{children}</div>
}