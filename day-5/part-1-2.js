const [config, rawMoves] = input.split("\n\n");

// Each column takes 4 characters
const columns = (config.indexOf("\n") + 1) / 4;
// Each rows is long columns * 4 characters. We remove the last line
const rows = (config.length + 1) / columns / 4 - 1;
const state1 = Array.from({ length: columns }, () => []);

for (let column = 0; column < columns; column++) {
  for (let row = rows - 1; row >= 0; row--) {
    const item = config[row * columns * 4 + column * 4 + 1];
    if (item !== " ") state1[column].push(item);
  }
}

// You need Node v17+ for this
// See https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
const state2 = structuredClone(state1);

const moves = rawMoves.trim().split('\n').map((line) =>
  line.match(/move (\d+) from (\d+) to (\d+)/).slice(1)
);

moves.forEach(([num, from, to]) => {
  for (let index = 0; index < num; index++) {
    state1[to - 1].push(state1[from - 1].pop());
  }
});

// Part 1
console.log(state1.map((column) => column.slice(-1)).join(""));

moves.forEach(([num, from, to]) => {
  // Yes, splice takes negative values as the first argument.
  // It takes from the end, as expected.
  state2[to - 1].push(...state2[from - 1].splice(-num, num));
});

// Part 2
console.log(state2.map((column) => column.slice(-1)).join(""));
