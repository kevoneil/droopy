import React from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "./Autocomplete";

const domContainer = document.querySelector("#app");

const app = () => (
  <div className="app-container">
    <h1>Droopy Dropdown</h1>
    <p>An toolkit for building a11y friendly dropdown components</p>
    <Autocomplete />
  </div>
);

ReactDOM.render(app(), domContainer);
