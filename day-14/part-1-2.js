const lines = input
  .trim()
  .split("\n")
  .map((l) => l.split(" -> ").map((c) => c.split(",").map(Number)));

// +1 and -1 because *maybe* the sand will end up falling on the side of the map
const maxX = Math.max(...lines.flat().map((coords) => coords[0])) + 1;
const minX = Math.min(...lines.flat().map((coords) => coords[0])) - 1;
const maxY = Math.max(...lines.flat().map((coords) => coords[1]));

const getField = () => {
  const field = Array.from(
    { length: maxY + 1 },
    () => new Uint8Array(maxX - minX + 1)
  );

  lines.forEach((points) =>
    points.forEach(([px, py], index) => {
      if (!index) {
        field[py][px - minX] = 1;
        return;
      }
      let [ix, iy] = points[index - 1];
      const dx = Math.sign(px - ix);
      const dy = Math.sign(py - iy);
      while (px !== ix || py !== iy) {
        ix += dx;
        iy += dy;
        field[iy][ix - minX] = 1;
      }
    })
  );
  return field;
};

function* getSand(field, startX) {
  let x = startX;
  let y = 0;
  let c = 0;
  while (y < field.length - 1 && field[y][x] === 0) {
    if (field[y + 1][x]) {
      if (field[y + 1][x - 1] === 0) x--;
      else if (field[y + 1][x + 1] === 0) x++;
      else {
        field[y][x] = 2;
        c++;
        yield [y, x];
        x = startX;
        y = 0;
        continue;
      }
    }
    y++;
  }
}

// Part 1
const startX = 500 - minX;
console.log([...getSand(getField(), startX)].length);

// Part 2
// We need to "extend" the field with enough space to contain all the sand,
// that will form a rectangle isosceles triangle with the vertex on the sand
// source. So we need to add some map to the left, to the right and add an
// empty then a filled row at the bottom.
// We *could* use the sand that have fallen in part 1, but... eh.
const field = getField();
const offset = field.length - startX;
const rowSize = field.length * 2 + 1;
const extendedField = [
  ...field.map(row => {
    const newRow = new Uint8Array(rowSize);
    newRow.set(row, offset);
    return newRow;
  }),
  new Uint8Array(rowSize),
  new Uint8Array(rowSize).fill(1)
];
console.log([...getSand(extendedField, offset + startX)].length);
