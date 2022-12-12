// Let's try another approach: instead of finding the best starting point among
// all the candidate points of elevation 0, start from the end and, still using
// a breadth-first search, reach the first point of elevation 0: it will take
// the least amount of steps, i.e. the solution to part 2.
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

let frontier = new Set([endCoords]);
const visited = new Set([endCoords]);
let step = 0;
// 'TIS A LABEL! 😱 Sorry for my lazy noggin, but I had to break two cycles...
// I *could* refactor the code so I won't need it, but... it works, so eh.
out: while (frontier.size) {
  const newFrontier = new Set();
  step++;
  for (const coords of frontier) {
    const [col, row] = coords.split(",").map(Number);
    const elevation = heightMap[row][col];
    if (col > 0) {
      const newElevation = heightMap[row][col - 1];
      // Since we're *descending*, now it's > -2 instead of < 2 👀
      if (newElevation - elevation > -2) {
        // Found elevation 0, KTHXBAIIIII 👋
        if (newElevation === 0) break out;
        const newCoords = col - 1 + "," + row;
        if (!visited.has(newCoords)) {
          visited.add(newCoords);
          newFrontier.add(newCoords);
        }
      }
    }
    if (row > 0) {
      const newElevation = heightMap[row - 1][col];
      if (newElevation - elevation > -2) {
        if (newElevation === 0) break out;
        const newCoords = col + "," + (row - 1);
        if (!visited.has(newCoords)) {
          visited.add(newCoords);
          newFrontier.add(newCoords);
        }
      }
    }
    if (col < width - 1) {
      const newElevation = heightMap[row][col + 1];
      if (newElevation - elevation > -2) {
        if (newElevation === 0) break out;
        const newCoords = col + 1 + "," + row;
        if (!visited.has(newCoords)) {
          visited.add(newCoords);
          newFrontier.add(newCoords);
        }
      }
    }
    if (row < height - 1) {
      const newElevation = heightMap[row + 1][col];
      if (newElevation - elevation > -2) {
        if (newElevation === 0) break out;
        const newCoords = col + "," + (row + 1);
        if (!visited.has(newCoords)) {
          visited.add(newCoords);
          newFrontier.add(newCoords);
        }
      }
    }
  }
  frontier = newFrontier;
}
console.log(step);
