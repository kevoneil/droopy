import React from 'react'
import ReactDOM from 'react-dom'
import { Autocomplete } from './AutocompleteInput'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteEntry } from './AutocompleteEntry'

const domContainer = document.querySelector('#app');

const app = 
  <>
    <Autocomplete>
      <AutocompleteList>
        <AutocompleteEntry>test</AutocompleteEntry>
        <AutocompleteEntry>test2</AutocompleteEntry>
      </AutocompleteList>
    </Autocomplete>
  </>

ReactDOM.render(app, domContainer);
