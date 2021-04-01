import React from 'react'
import ReactDOM from 'react-dom'
import { Autocomplete } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'

const domContainer = document.querySelector('#app');

const app = () => {
  const results = ['test', 'test2']

  return (
    <>
      <Autocomplete>
        <AutocompleteList ariaResults={`${results.length} results found`}>
          {results.map(result => (
            <AutocompleteEntry key={result}>{result}</AutocompleteEntry>
          ))}
        </AutocompleteList>
      </Autocomplete>
    </>
  )
}

ReactDOM.render(app(), domContainer);
