import React, { forwardRef, HTMLProps } from 'react';

import { useHighlightedEntry } from './hooks/useHighlighedEntry'

interface Props {
  value: string
  results: string[]
  setInputValue: (entry: string) => void
}

export const AutocompleteInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { results, setInputValue, ...options } = props;
  const { getPreviousEntry, getNextEntry } = useHighlightedEntry(results)

  return (
    <input 
      ref={ref}
      onKeyDown={(event) => {
        if (event.key === 'ArrowUp') {
          const entry = getPreviousEntry()
          setInputValue(entry)
        }
        if (event.key === 'ArrowDown') {
          const entry = getNextEntry()
          setInputValue(entry)
        }
      }}
      onChange={(event) => { 
        setInputValue(event.currentTarget.value);
      }}
      {...options}
    />
  )
})