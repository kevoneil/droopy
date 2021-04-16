import React from 'react';
import { render } from '@testing-library/react';

import { Autocomplete } from '../AutocompleteInput';
import { AutocompleteList } from '../AutocompleteList'
import { AutocompleteEntry } from '../AutocompleteEntry'

test('Autocomplete does not break', () => {
 const results = ['test', 'test2']

 expect(() => render(
    <Autocomplete results={results}>
      <AutocompleteList ariaResults="1 results found">
        <AutocompleteEntry>test</AutocompleteEntry>
      </AutocompleteList>
    </Autocomplete>
  )).not.toThrow()
});