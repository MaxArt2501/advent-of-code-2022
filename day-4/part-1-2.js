const intervals = input
  .trim()
  .split("\n")
  .map((line) => line.split(",").map((range) => range.split("-").map(Number)));

// Either the first interval is contained in the second (a >= c && b <= d)
// or the second is contained in the first (c >= a && d <= b).
const containedIntervals = intervals.filter(
  ([[a, b], [c, d]]) => (a >= c && b <= d) || (c >= a && d <= b)
);

console.log(containedIntervals.length);

// In order to have disjoint intervals, either a is *after* d, or b is *before*
// c, meaning a > d || b < c. Negating this condition gives all the overlapping
// intervals, resulting in the condition below.
const overlappingIntervals = intervals.filter(
  ([[a, b], [c, d]]) => a <= d && b >= c
);

console.log(overlappingIntervals.length);
