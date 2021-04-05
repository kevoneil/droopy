import { useState } from 'react'

export const useHighlightedEntry = (results: string[]) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const getNextEntry = () => {
    if (highlightedIndex + 1 > results.length) {
        return results[0];
    }

    setHighlightedIndex(highlightedIndex + 1);
    return results[highlightedIndex + 1];
  }

  return { getNextEntry }
}