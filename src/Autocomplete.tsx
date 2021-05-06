import React, { useState, useEffect, useRef } from 'react'
import { AutocompleteInput } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'
import { Dropdown } from './Dropdown'

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false)
  const results = ['beer', 'hummus', 'candy']
  const ariaGroup = 'group-0'

  useEffect(() => {
    if (inputRef?.current.value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false)
    }
  }, [inputRef.current?.value, setShowDropdown]);

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
