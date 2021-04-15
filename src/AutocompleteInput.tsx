import React, { useRef, useState, useEffect } from 'react';
import { Input } from './Input';
import { Dropdown } from './Dropdown';

import { useHighlightedEntry } from './hooks/useHighlighedEntry'

interface Props {
  results: string[]
  dropdownClassName?: string
  children: JSX.Element | JSX.Element[];
}

export const Autocomplete = (props: Props) => {
  const { results, children, ...options } = props;
  const { getPreviousEntry, getNextEntry } = useHighlightedEntry(results)

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inputValue?.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false)
    }
  }, [inputValue, setShowDropdown]);

  return (
    <>
      <Input 
        {...options}
        ref={inputRef}
        value={inputValue} 
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
      />
      {showDropdown && (
        <Dropdown className={options?.dropdownClassName}>
          {children}
        </Dropdown>
      )}
    </>
  )
}