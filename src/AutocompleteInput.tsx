import React, { useRef, useState, useEffect } from 'react';
import { Input } from './Input';
import { Dropdown } from './Dropdown';

export const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false)
    }
  }, [inputValue, setShowDropdown]);

  return (
    <>
      <Input 
        ref={inputRef}
        value={inputValue} 
        onChange={(event) => { 
          setInputValue(event.currentTarget.value);
        }}
      />
      {showDropdown && (
        <Dropdown>
          <h3>test</h3>
        </Dropdown>
      )}
    </>
  )
}