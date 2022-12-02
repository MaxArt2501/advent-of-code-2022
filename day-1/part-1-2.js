const caloriesForElf = input
  .trim()
  .split("\n\n")
  .map((block) =>
    block.split("\n").reduce((sum, calories) => sum + Number(calories), 0)
  )
  .sort((cal1, cal2) => cal2 - cal1);

// Part 1
console.log(caloriesForElf[0]);

// Part 2
console.log(caloriesForElf[0] + caloriesForElf[1] + caloriesForElf[2]);
