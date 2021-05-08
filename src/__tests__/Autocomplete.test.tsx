import React from "react";
import { render } from "@testing-library/react";

import { AutocompleteInput } from "../AutocompleteInput";
import { AutocompleteList } from "../AutocompleteList";
import { AutocompleteEntry } from "../AutocompleteEntry";

describe("happy path", () => {
  test("Autocomplete does not break when composing", () => {
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
});
