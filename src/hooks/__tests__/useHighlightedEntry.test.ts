import { renderHook, act } from "@testing-library/react-hooks";
import useHighlightedEntry from "../useHighlightedEntry";

const results = {
  recentSearches: ["test"],
};

test("should increment highlighted entry index", () => {
  const { result } = renderHook(() => useHighlightedEntry(results));

  act(() => {
    result.current.getNextEntry();
  });

  expect(result.current.highlightedIndex).toEqual(0);
  expect(result.current.activeGroup).toEqual("recentSearches");
  expect(result.current.activeGroupIndex).toEqual(0);
});
