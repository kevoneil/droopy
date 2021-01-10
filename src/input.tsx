import React from 'react'

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export const Input = (props: Props) => {
  return <input {...props} />
}