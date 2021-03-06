import { useState, useEffect } from "react";

const useShowDropdown = (inputRef) => {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (inputRef?.current.value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [inputRef.current?.value, setShowDropdown]);

  return showDropdown;
};

export default useShowDropdown;
