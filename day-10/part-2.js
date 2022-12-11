const instructions = input
  .trim()
  .split("\n")
  .map((line) => Number(line.slice(5)));

const display = new Array(40 * 6);
let cycle = 0;
let x = 1;
for (const value of instructions) {
  const opCycles = value ? 2 : 1;
  // It could paint 1 or 2 pixels depending on the instruction
  for (let index = 0; index < opCycles; index++) {
    display[cycle + index] =
      Math.abs(x - ((cycle + index) % 40)) < 2 ? "#" : ".";
  }
  cycle += opCycles;
  x += value;
}

console.log(display.join("").replace(/(.{40})/g, "$1\n"));
