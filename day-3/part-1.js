// You *can* generate this, I guess...
// The position of an item in the sequence equals its priority value minus 1
const charPriorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const sacks = input
  .trim()
  .split("\n")
  .map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)]);

const prioritySum = sacks.reduce((sum, [comp1, comp2]) => {
  const commonItem = comp1.split("").find((item) => comp2.includes(item));
  return sum + charPriorities.indexOf(commonItem) + 1;
}, 0);

console.log(prioritySum);
