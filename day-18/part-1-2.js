const cubes = input.trim().split("\n");

const checkShifts = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const computeArea = (cubes) =>
  cubes.reduce((tot, cube) => {
    const [x, y, z] = cube.split(",").map(Number);
    const freeSides = checkShifts.reduce((count, [dx, dy, dz]) => {
      const adjacent = [x + dx, y + dy, z + dz].join();
      return count + !cubes.includes(adjacent);
    }, 0);
    return tot + freeSides;
  }, 0);

// Part 1
console.log(computeArea(cubes));

// Part 2
// Instead of removing the inner bubbles, we can count the surface of the
// surrounding space as we did above, and subtract the outer surface.
// But first we need to know what cubes constitute the "surrounding space":
// we can start from the minimum values of the coordinates - minus one cube of
// border, just to be sure - and end with the maximum values, plus 1.
// We cannot just iterate from the minimum to the maximum values of the
// coordinates, as we should stop when we meet the lava droplet. That's why we
// need to determine the external space by expanding a frontier of cubes.
const parsedCubes = cubes.map((cube) => cube.split(",").map(Number));
const xCoords = parsedCubes.map(([x]) => x);
const yCoords = parsedCubes.map(([, y]) => y);
const zCoords = parsedCubes.map(([, , z]) => z);
const minX = Math.min(...xCoords);
const maxX = Math.max(...xCoords);
const minY = Math.min(...yCoords);
const maxY = Math.max(...yCoords);
const minZ = Math.min(...zCoords);
const maxZ = Math.max(...zCoords);

const externalCubes = new Set([`${minX - 1},${minY - 1},${minZ - 1}`]);
let frontier = new Set(externalCubes);
while (frontier.size) {
  const newFrontier = new Set();
  for (const cube of frontier) {
    const [x, y, z] = cube.split(",").map(Number);
    for (const [dx, dy, dz] of checkShifts) {
      if (
        (dx < 0 && x < minX) ||
        (dx > 0 && x > maxX) ||
        (dy < 0 && y < minY) ||
        (dy > 0 && y > maxY) ||
        (dz < 0 && z < minZ) ||
        (dz > 0 && z > maxZ)
      ) {
        continue;
      }
      const adjacent = [x + dx, y + dy, z + dz].join();
      if (!externalCubes.has(adjacent) && !cubes.includes(adjacent)) {
        newFrontier.add(adjacent);
        externalCubes.add(adjacent);
      }
    }
  }
  frontier = newFrontier;
}

console.log(computeArea([...externalCubes])
  - (maxX - minX + 3) * (maxY - minY + 3) * 2
  - (maxX - minX + 3) * (maxZ - minZ + 3) * 2
  - (maxZ - minZ + 3) * (maxY - minY + 3) * 2
);
