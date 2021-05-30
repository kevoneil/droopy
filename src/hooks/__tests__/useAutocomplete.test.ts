import { renderHook } from "@testing-library/react-hooks";
import { useAutocomplete } from "../useAutocomplete";

describe("useAutocomplete hook", () => {
  it("returns default exports", () => {
    const { result } = renderHook(() => useAutocomplete());

    expect(result.current.highlightedIndex).toEqual(-1);
    expect(result.current.activeGroupIndex).toEqual(-1);
  });
});
