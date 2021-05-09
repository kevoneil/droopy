import React from "react";
import {
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";

import {
  AutocompleteInput,
  AutocompleteList,
  AutocompleteEntry,
  AutocompleteContextProvider,
} from "../";
import { Autocomplete } from "../../demo/Autocomplete";

const placeholderText = "Search...";

const results = {
  recentSearches: ["detergent", "potato chips", "hummus", "beer"],
  trendingSearches: ["beer", "candy", "marshmellows"],
};

const mount = () =>
  render(
    <AutocompleteContextProvider results={results}>
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

const demoMount = () => render(<Autocomplete />);

describe("happy path", () => {
  it("Autocomplete does not break when composing", () => {
    expect(() => mount()).not.toThrow();
  });

  it("renders input", () => {
    mount();

    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
  });
});

describe("demo", () => {
  it("renders 0 results found", () => {
    demoMount();

    expect(screen.getByText(/0 results found/i)).toBeDefined();
  });

  it("renders value and brings up dropdown", () => {
    demoMount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "beer" } });

    expect(screen.getByText(/kale/i)).toBeDefined();
  });
});
