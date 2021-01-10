import React from 'react'

interface Props { 
  children: JSX.Element | JSX.Element[]
}

export const Dropdown = ({ children }: Props) => { 
  return <div>{children}</div>
}