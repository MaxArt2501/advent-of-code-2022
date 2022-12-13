const pairs = input
  .trim()
  .split("\n\n")
  .map((pair) => pair.split("\n").map(JSON.parse));

// Instead of a function that returns a boolean, here's one that can be used
// with `Array.sort`. This will be useful for part 2.
const packetCompare = (a, b) => {
  for (let index = 0; index < a.length && index < b.length; index++) {
    const itemA = a[index];
    const itemB = b[index];
    const isBNumber = typeof itemB === 'number';
    let res;
    if (typeof itemA === "number") {
      res = isBNumber ? itemA - itemB : packetCompare([itemA], itemB);
    } else {
      res = packetCompare(itemA, isBNumber ? [itemB] : itemB);
    }
    if (res !== 0) return res;
  }
  return a.length - b.length;
};

// Part 1
const indexSum = pairs.reduce((tot, pair, index) => {
  if (packetCompare(...pair) < 0) tot += index + 1;
  return tot;
}, 0);
console.log(indexSum);

// Part 2
const divider1 = [[2]];
const divider2 = [[6]];
const sortedPackets = [...pairs.flat(), divider1, divider2].sort(packetCompare);
console.log(
  (sortedPackets.indexOf(divider1) + 1) * (sortedPackets.indexOf(divider2) + 1)
);
