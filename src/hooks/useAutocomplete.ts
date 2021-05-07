import { useContext } from "react";
import { AutocompleteContext } from "../AutocompleteContextProvider";

export const useAutocomplete = () => {
  return useContext(AutocompleteContext);
};
