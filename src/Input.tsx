import React, { forwardRef } from 'react'

interface Props extends React.HTMLProps<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input ref={ref} {...props} />
  )
})