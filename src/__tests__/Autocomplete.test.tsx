import React from "react";
import { render, screen } from "@testing-library/react";

import {
  AutocompleteInput,
  AutocompleteList,
  AutocompleteEntry,
  AutocompleteContextProvider,
} from "../index";

const placeholderText = "Search...";

const results = {
  recentSearches: ["detergent", "potato chips", "hummus", "beer"],
  trendingSearches: ["beer", "candy", "marshmellows"],
};

const mount = () =>
  render(
    <AutocompleteContextProvider
      results={results}
      inputValue=""
      setInputValue={() => {}}
      lastTypedValue=""
      setLastTypedValue={() => {}}
    >
      <AutocompleteInput
        ref={() => {}}
        value="test"
        onInputChange={() => {}}
        placeholder={placeholderText}
      />
      <AutocompleteList>
        <AutocompleteEntry>test</AutocompleteEntry>
      </AutocompleteList>
    </AutocompleteContextProvider>
  );

describe("happy path", () => {
  it("Autocomplete does not break when composing", () => {
    expect(() => mount()).not.toThrow();
  });

  it("renders input", () => {
    mount();

    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
  });
});
