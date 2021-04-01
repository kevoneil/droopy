import React from 'react'
import ReactDOM from 'react-dom'
import { Autocomplete } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'
import './styles.scss'

const domContainer = document.querySelector('#app');

const app = () => {
  const results = ['test', 'test2']
  const ariaGroup = 'group-0'

  return (
    <>
      <Autocomplete>
        <AutocompleteList ariaResults={`${results.length} results found`} headerText="Recent Entries" ariaGroupHeader="group-1-header">
          {results.map((result, index) => (
            <AutocompleteEntry key={result} aria-labelledby={`${ariaGroup}-option-${index}`}>{result}</AutocompleteEntry>
          ))}
        </AutocompleteList>
      </Autocomplete>
    </>
  )
}

ReactDOM.render(app(), domContainer);
