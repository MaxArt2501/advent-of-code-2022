const findMarkerIndex = length => {
  for (let index = length; index < input.length; index++) {
    const charSet = new Set(input.slice(index - length, index));
    if (charSet.size === length) return index;
  }
  return -1;
};

// Part 1
console.log(findMarkerIndex(4));

// Part 2
console.log(findMarkerIndex(14));
