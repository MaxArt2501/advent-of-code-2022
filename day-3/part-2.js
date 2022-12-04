// Same as part 1...
const charPriorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// We don't need to split the sacks now
const sacks = input.trim().split("\n");

let prioritySum = 0;
for (let index = 0; index < sacks.length; index += 3) {
  const commonItem = sacks[index]
    .split("")
    .find(
      (item) =>
        sacks[index + 1].includes(item) && sacks[index + 2].includes(item)
    );
  prioritySum += charPriorities.indexOf(commonItem) + 1;
}

console.log(prioritySum);
