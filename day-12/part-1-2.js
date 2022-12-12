const heightMap = input
  .trim()
  .split("\n")
  .map((row) =>
    row.split("").map((char) => {
      const code = char.charCodeAt(0);
      // 83 = 'S', 69 = 'E', 97 = 'a'
      return code === 83 ? 0 : code === 69 ? 25 : code - 97;
    })
  );
const width = heightMap[0].length;
const height = heightMap.length;

const endIndex = input.indexOf("E");
const endCoords = `${endIndex % (width + 1)},${Math.floor(
  endIndex / (width + 1)
)}`;

const getMinSteps = (startCoords) => {
  let frontier = new Set([startCoords]);
  const visited = new Set([startCoords]);
  let step = 0;
  while (step < 10000) {
    const newFrontier = new Set();
    step++;
    for (const coords of frontier) {
      const [col, row] = coords.split(",").map(Number);
      const elevation = heightMap[row][col];
      if (col > 0) {
        const newElevation = heightMap[row][col - 1];
        if (newElevation - elevation < 2) {
          const newCoords = col - 1 + "," + row;
          if (!visited.has(newCoords)) {
            visited.add(newCoords);
            newFrontier.add(newCoords);
          }
        }
      }
      if (row > 0) {
        const newElevation = heightMap[row - 1][col];
        if (newElevation - elevation < 2) {
          const newCoords = col + "," + (row - 1);
          if (!visited.has(newCoords)) {
            visited.add(newCoords);
            newFrontier.add(newCoords);
          }
        }
      }
      if (col < width - 1) {
        const newElevation = heightMap[row][col + 1];
        if (newElevation - elevation < 2) {
          const newCoords = col + 1 + "," + row;
          if (!visited.has(newCoords)) {
            visited.add(newCoords);
            newFrontier.add(newCoords);
          }
        }
      }
      if (row < height - 1) {
        const newElevation = heightMap[row + 1][col];
        if (newElevation - elevation < 2) {
          const newCoords = col + "," + (row + 1);
          if (!visited.has(newCoords)) {
            visited.add(newCoords);
            newFrontier.add(newCoords);
          }
        }
      }
    }
    if (newFrontier.has(endPos)) {
      return step;
    }
    if (!newFrontier.size) {
      break;
    }
    frontier = newFrontier;
  }
  return -1;
};

// Part 1
const startIndex = input.indexOf("S");
const startCoords = `${startIndex % (width + 1)},${Math.floor(
  startIndex / (width + 1)
)}`;
console.log(getMinSteps(startCoords));

// Part 2
// There could be 2000+ points with elevation 0, but this could take too much.
// Fortunately, only some of them are *good* starting points.
const candidateStartingPoints = heightMap.flatMap((elevList, row) =>
  elevList.reduce((candidates, elevation, col) => {
    // Only points with elevation 0 and nearby points with elevation 1 are
    // candidate starting points
    if (
      elevation === 0 &&
      ((col > 1 && elevList[col - 1] === 1) ||
        (row > 0 && heightMap[row - 1][col] === 1) ||
        (col < width - 1 && elevList[col + 1] === 1) ||
        (row < height - 1 && heightMap[row + 1][col] === 1))
    ) {
      candidates.push(`${col},${row}`);
    }
    return candidates;
  }, [])
);
console.log(Math.min(...candidateStartingPoints.map(getMinSteps)));
