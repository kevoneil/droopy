import React from 'react'
import ReactDOM from 'react-dom'
import { Autocomplete } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'
import './styles.scss'

const domContainer = document.querySelector('#app');

const app = () => {
  const results = ['test', 'beer map']
  const ariaGroup = 'group-0'

  return (
    <Autocomplete results={results}>
      <AutocompleteList ariaResults={`${results.length} results found`} headerText="Recent Entries" ariaGroupHeader={`${ariaGroup}-header`}>
        {results.map((result, index) => (
          <AutocompleteEntry  key={result} id={`${ariaGroup}-option-${index}`}>{result}</AutocompleteEntry>
        ))}
      </AutocompleteList>
    </Autocomplete>
  )
}

ReactDOM.render(app(), domContainer);
