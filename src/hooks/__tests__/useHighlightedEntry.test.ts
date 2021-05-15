import { renderHook, act } from "@testing-library/react-hooks";
import useHighlightedEntry from "../useHighlightedEntry";

enum ResultKey {
  Recent = "recentSearches",
  Popular = "popularSearches",
}

const results = {
  [ResultKey.Recent]: ["candy", "beer", "hummus"],
  [ResultKey.Popular]: ["wine", "cheese", "sushi", "curry"],
};

describe("useHighlightedEntry hook", () => {
  it("should increment highlighted entry index", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getNextEntry();
    });

    expect(result.current.highlightedIndex).toEqual(0);
    expect(result.current.activeGroup).toEqual(ResultKey.Recent);
    expect(result.current.activeGroupIndex).toEqual(0);
  });

  it("should return first entry if user navigates past last one", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getNextEntry();
      result.current.getNextEntry();
      result.current.getNextEntry();
      result.current.getNextEntry();
      result.current.getNextEntry();
    });

    expect(result.current.highlightedIndex).toEqual(0);
    expect(result.current.activeGroup).toEqual(ResultKey.Recent);
    expect(result.current.activeGroupIndex).toEqual(0);
  });

  it("should return last entry if user presses the up arrow on first entry", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getPreviousEntry();
    });

    expect(result.current.highlightedIndex).toEqual(6);
    expect(result.current.activeGroup).toEqual(ResultKey.Popular);
    expect(result.current.activeGroupIndex).toEqual(3);
  });
});
