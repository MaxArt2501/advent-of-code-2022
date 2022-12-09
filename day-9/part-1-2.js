const moves = input
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

// YES these functions *mutate* the original pairs. It comes from with attempts
// using the cellphone. Sue me -__-
const moveKnot = (knot, dir) => {
  if (dir === "U") knot[1]--;
  else if (dir === "R") knot[0]++;
  else if (dir === "D") knot[1]++;
  else if (dir === "L") knot[0]--;
};

const updateKnotPosition = (prevKnot, knot) => {
  if (
    knot.some((coord, coordIndex) => Math.abs(coord - prevKnot[coordIndex]) > 1)
  ) {
    knot.forEach(
      (coord, coordIndex) =>
        // The Math.sign trick takes care of the diagonal move correctly
        (knot[coordIndex] = coord - Math.sign(coord - prevKnot[coordIndex]))
    );
  }
};

const getVisitedByTail = (knots) => {
  const knotPos = Array.from({ length: knots }, () => [0, 0]);
  const visited = new Set(["0,0"]);
  moves.forEach(([dir, steps]) => {
    for (let k = 0; k < +steps; k++) {
      knotPos.forEach((knot, index) => {
        if (index === 0) moveKnot(knot, dir);
        else knot = updateKnotPosition(knotPos[index - 1], knot);
      });
      visited.add(knotPos[knots - 1].join());
    }
  });
  return visited.size;
};

console.log(getVisitedByTail(2));  // Part 1
console.log(getVisitedByTail(10)); // Part 2
