// This transforms `addx` instructions into their numeric argument, and `noop`s
// into zeroes.
const instructions = input
  .trim()
  .split("\n")
  .map((line) => Number(line.slice(5)));

let cycle = 0;
let x = 1;
let totalSignal = 0;
for (const value of instructions) {
  cycle += value ? 2 : 1;
  const rest = (cycle - 20) % 40;
  // The second argument of the 'or' condition is there because there could be
  // a `noop` after an `addx` with a zero rest. So if the rest is 1 it should
  // add to the total signal only if we're coming from an `addx`.
  if (rest === 0 || rest === 1 && value) {
    totalSignal += x * (cycle - rest);
  }
  x += value;
}

console.log(totalSignal);
