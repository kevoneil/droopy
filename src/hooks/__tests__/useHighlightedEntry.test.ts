import { renderHook, act } from "@testing-library/react-hooks";
import useHighlightedEntry from "../useHighlightedEntry";

enum ResultKey {
  Recent = "recentSearches",
  Popular = "popularSearches",
}

const results = {
  [ResultKey.Recent]: ["candy", "beer", "hummus"],
  [ResultKey.Popular]: ["wine", "beer", "sushi", "curry"],
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

  it("should return previous highlighted entry after user hits the up arrow", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getNextEntry();
    });

    act(() => {
      result.current.getNextEntry();
    });

    expect(result.current.highlightedIndex).toEqual(1);
    expect(result.current.activeGroup).toEqual(ResultKey.Recent);
    expect(result.current.activeGroupIndex).toEqual(1);

    act(() => {
      result.current.getPreviousEntry();
    });

    expect(result.current.highlightedIndex).toEqual(0);
    expect(result.current.activeGroup).toEqual(ResultKey.Recent);
    expect(result.current.activeGroupIndex).toEqual(0);
  });

  it("should return first entry if user navigates past last one", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.setHighlightedEntry("curry", ResultKey.Popular);
    });

    act(() => {
      result.current.getNextEntry();
    });

    expect(result.current.highlightedIndex).toEqual(0);
    expect(result.current.activeGroup).toEqual(ResultKey.Recent);
    expect(result.current.activeGroupIndex).toEqual(0);
  });

  it("should not get confused when met with duplicate term", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getNextEntry();
    });

    act(() => {
      result.current.getNextEntry();
    });

    act(() => {
      result.current.getNextEntry();
    });

    act(() => {
      result.current.getNextEntry();
    });

    act(() => {
      result.current.getNextEntry();
    });

    // should return 'beer' in the second list
    expect(result.current.highlightedIndex).toEqual(4);
    expect(result.current.activeGroup).toEqual(ResultKey.Popular);
    expect(result.current.activeGroupIndex).toEqual(4);
  });

  it("should return last entry if user presses the up arrow on first entry", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getPreviousEntry();
    });

    expect(result.current.highlightedIndex).toEqual(6);
    expect(result.current.activeGroup).toEqual(ResultKey.Popular);
    expect(result.current.activeGroupIndex).toEqual(6);
  });

  it("resets highlighted entry back to square one", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.getPreviousEntry();
    });

    expect(result.current.highlightedIndex).toEqual(6);

    act(() => {
      result.current.resetHighlightedEntry();
    });

    expect(result.current.highlightedIndex).toEqual(-1);
    expect(result.current.activeGroup).toEqual("");
    expect(result.current.activeGroupIndex).toEqual(-1);
  });

  it("sets highilghted entry", () => {
    const { result } = renderHook(() => useHighlightedEntry(results));

    act(() => {
      result.current.setHighlightedEntry("beer", ResultKey.Popular);
    });

    expect(result.current.activeGroup).toEqual(ResultKey.Popular);
    expect(result.current.activeGroupIndex).toEqual(1);
  });
});
