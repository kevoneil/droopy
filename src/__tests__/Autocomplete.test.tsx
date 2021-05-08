import React, { useRef } from "react";
import { render } from "@testing-library/react";

import { AutocompleteInput } from "../AutocompleteInput";
import { AutocompleteList } from "../AutocompleteList";
import { AutocompleteEntry } from "../AutocompleteEntry";

test("Autocomplete does not break", () => {
  const results = ["test", "test2"];

  expect(() =>
    render(
      <>
        <AutocompleteInput ref={() => {}} value="test" onChange={() => {}} />
        <AutocompleteList>
          <AutocompleteEntry>test</AutocompleteEntry>
        </AutocompleteList>
      </>
    )
  ).not.toThrow();
});
