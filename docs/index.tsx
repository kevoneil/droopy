import React from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "./Autocomplete";

const domContainer = document.querySelector("#app");

const app = () => <Autocomplete />;

ReactDOM.render(app(), domContainer);
