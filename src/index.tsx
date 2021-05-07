import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "./Autocomplete";
import "./styles.scss";

const domContainer = document.querySelector("#app");

const app = () => <Autocomplete />;

ReactDOM.render(app(), domContainer);
