const sensors = input
  .trim()
  .split("\n")
  .map((/** @type {string} */line) => {
    const [, x, y, bx, by] = line
      .match(
        /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/
      )
      .map(Number);
    const distance = Math.abs(x - bx) + Math.abs(y - by);
    return { x, y, bx, by, distance };
  });

/**
 * Return a list of intervals of x-coordinates that are reached by at least one
 * sensor in the given row.
 * @param {number} row
 * @returns {Array<[number, number]>}
 */
const getCoveredIntervals = (row) => {
  let intervals = sensors
    .map(({ x, y, distance }) => {
      const diff = distance - Math.abs(y - row);
      return [x - diff, x + diff];
    })
    .filter(([a, b]) => a <= b);

  // Some of the intervals might be overlapping, so we have to join them.
  let reducedIntervals = intervals;
  do {
    intervals = reducedIntervals;
    reducedIntervals = intervals.reduce((list, [a, b]) => {
      // Find the index of an overlapping interval in the list so far
      const overlappingIndex = list.findIndex(([c, d]) => !(a > d || b < c));
      if (overlappingIndex >= 0) {
        const [c, d] = list[overlappingIndex];
        list[overlappingIndex] = [Math.min(a, c), Math.max(b, d)];
      } else {
        list.push([a, b]);
      }
      return list;
    }, []);
  } while (
    reducedIntervals.length > 1 &&
    reducedIntervals.length < intervals.length
  );

  return reducedIntervals;
};

// Part 1
const refY = 2e6;
const coveredPositions = getCoveredIntervals(refY).reduce(
  (total, [start, end]) => total + end - start + 1,
  0
);
// We need to take into account the beacons that are actually in the row. In
// both the example and my input there was one, but I guess you can't be sure.
const beaconXCoordsInRow = new Set(
  sensors.filter((sensor) => sensor.by === refY).map((sensor) => sensor.bx)
);
console.log(coveredPositions - beaconXCoordsInRow.size);

// Part 2
// This isn't exactly fast, but completes in a reasonable amount of time. It
// took less than 30 seconds on my phone (CPU Snapdragon 855) with Node 18.12.1.
// I had another idea in mind too (using the sensor boundaries), but it didn't
// seem much faster. Meh.
const limit = 4e6;
for (let y = 0; y < limit; y++) {
  const intervals = getCoveredIntervals(y);
  // Check that the interval [0, 4000000] is not entirely contained by one of
  // the intervals
  if (!intervals.some(([a, b]) => a <= 0 && b >= limit)) {
    for (const [a, b] of intervals) {
      if (a > 0 && a <= limit) {
        const x = a - 1;
        console.log(x * limit + y);
        break;
      } else if (b >= 0 && b < limit) {
        const x = b + 1;
        console.log(x * limit + y);
        break;
      }
    }
    break;
  }
}
