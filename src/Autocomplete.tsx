import React, { useState, useEffect, useRef } from 'react'
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

  return (
    <>
      <AutocompleteInput value={inputValue} setInputValue={setInputValue} ref={inputRef} results={results} />
      {showDropdown && (
        <Dropdown>
          <AutocompleteList ariaResultsText={`${results.length} results found`} headerText="Recent Entries" ariaGroupHeader={`${ariaGroup}-header`}>
            {results.map((result, index) => (
              <AutocompleteEntry  key={result} id={`${ariaGroup}-option-${index}`}>{result}</AutocompleteEntry>
            ))}
          </AutocompleteList> 
        </Dropdown>
      )}
    </>
  )
}
