import { useHighlightedEntry } from "./useHighlighedEntry";

interface Props {
  results: string[];
  children: JSX.Element | JSX.Element[];
}

export const useAutocomplete = ({ results }: Props) => {
  const {
    getNextEntry,
    getPreviousEntry,
    highlightedIndex,
  } = useHighlightedEntry(results);

  return {
    getNextEntry,
    getPreviousEntry,
    highlightedIndex,
  };
};
