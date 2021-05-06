import React, { useState, useRef, useEffect, useMemo } from 'react'
import { AutocompleteInput } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'
import { Dropdown } from './Dropdown'
import { useShowDropdown } from './hooks/useShowDropdown'

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('');
  const showDropdown = useShowDropdown(inputRef)
  const results = ['beer', 'hummus', 'candy']
  const ariaGroup = 'group-0'

  const filteredResults = useMemo(() => results.filter(result => {
    if (result.match(inputRef.current?.value)) {
      return result
    }
  }), [inputValue])

  return (
    <>
      <AutocompleteInput ref={inputRef} value={inputValue} setInputValue={setInputValue} results={results} />
      {showDropdown && (
        <Dropdown>
          <AutocompleteList ariaResultsText={`${results.length} results found`} headerText="Recent Entries" ariaGroupHeader={`${ariaGroup}-header`}>
            {filteredResults.map((result, index) => (
              <AutocompleteEntry  key={result} id={`${ariaGroup}-option-${index}`}>{result}</AutocompleteEntry>
            ))}
          </AutocompleteList> 
        </Dropdown>
      )}
    </>
  )
}
