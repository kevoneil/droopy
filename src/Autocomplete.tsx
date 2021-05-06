import React, { useRef } from 'react'
import { AutocompleteInput } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'

export const Autocomplete = () => {
  const ref = useRef<HTMLInputElement>(null)
  const results = ['beer', 'hummus', 'candy']
  const ariaGroup = 'group-0'

  return (
    <AutocompleteInput ref={ref} results={results}>
      <AutocompleteList ariaResults={`${results.length} results found`} headerText="Recent Entries" ariaGroupHeader={`${ariaGroup}-header`}>
        {results.map((result, index) => (
          <AutocompleteEntry  key={result} id={`${ariaGroup}-option-${index}`}>{result}</AutocompleteEntry>
        ))}
      </AutocompleteList> 
    </AutocompleteInput>
  )
}
