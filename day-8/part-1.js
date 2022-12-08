const forest = input
  .trim()
  .split("\n")
  .map((row) => row.split(""));

let visible = 0;
forest.forEach((treeRow, row) => {
  treeRow.forEach((tree, column) => {
    // There surely are more efficient ways but... eh. It works fast enough.
    if (
      treeRow.slice(0, column).every((t) => t < tree) ||
      treeRow.slice(column + 1).every((t) => t < tree) ||
      forest.slice(0, row).every((r) => r[column] < tree) ||
      forest.slice(row + 1).every((r) => r[column] < tree)
    ) {
      visible++;
    }
  });
});

console.log(visible);
