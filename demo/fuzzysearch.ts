export const fuzzySearch = (input: string, results: string[]) => {
  const endResults = [];

  results.forEach((result) => {
    const characters = input.split("");

    let valid = true;
    const resArr = [...result];

    characters.forEach((char) => {
      if (resArr.indexOf(char) < 0) {
        valid = false;
      } else {
        // splice modifies current string
        // slice creates a shallow copy
        resArr.splice(resArr.indexOf(char), 1);
      }
    });

    if (valid) {
      endResults.push(result);
    }
  });

  return endResults;
};
