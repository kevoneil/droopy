import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Autocomplete } from "../Autocomplete";

const placeholderText = "Search...";

const mount = () => render(<Autocomplete />);

describe("Autocomplete demo", () => {
  it("renders 0 results found", () => {
    mount();

    expect(screen.getByText(/0 results found/i)).toBeDefined();
  });

  it("renders value and brings up dropdown", () => {
    mount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "beer" } });

    expect(screen.getByText(/kale/i)).toBeDefined();
  });

  it("renders correct number of results found", () => {
    mount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "beer" } });

    expect(screen.getByText(/8 results found/i)).toBeDefined();
  });

  it("clears input when user hits escape key", () => {
    mount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "beer" } });

    const newInput = screen.getByDisplayValue(/beer/i);

    fireEvent.keyDown(newInput, {
      key: "Escape",
      code: "Escape",
    });

    expect(screen.queryByText(/beer/i)).toBeNull();
    expect(screen.getByText(/0 results found/i)).toBeDefined();
  });

  it("fills in input field with first entry if user presses down key", () => {
    mount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "beer" } });

    const newInput = screen.getByDisplayValue(/beer/i);

    fireEvent.keyDown(newInput, {
      key: "KeyDown",
      code: "KeyDown",
    });

    expect(screen.getByDisplayValue(/beer/i)).toBeDefined();
  });

  it("fills in input field with second entry if user presses down key", () => {
    mount();

    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: "bread" } });

    const newInput = screen.getByDisplayValue(/bread/i);

    fireEvent.keyDown(newInput, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    expect(screen.getByDisplayValue(/beer/i)).toBeDefined();

    fireEvent.keyDown(newInput, {
      key: "ArrowDown",
      code: "ArrowDown",
    });

    expect(screen.getByDisplayValue(/hummus/i)).toBeDefined();
  });
});