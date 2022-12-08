const forest = input
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const width = forest[0].length;
const height = forest.length;
const scoreMatrix = forest.map((treeRow, row) =>
  treeRow.map((tree, column) => {
    // As in part 1, there surely are more efficient ways but... eh.
    // E.g.: classic `for` cycles are way faster and don't allocate memory.
    const visibleTop = forest
      .slice(0, row)
      .reverse()
      .findIndex((r) => r[column] >= tree);
    const visibleRight = treeRow.slice(column + 1).findIndex((t) => t >= tree);
    const visibleBottom = forest
      .slice(row + 1)
      .findIndex((r) => r[column] >= tree);
    const visibleLeft = treeRow
      .slice(0, column)
      .reverse()
      .findIndex((t) => t >= tree);
    return (
      (visibleTop < 0 ? row : visibleTop + 1) *
      (visibleRight < 0 ? width - column - 1 : visibleRight + 1) *
      (visibleBottom < 0 ? height - row - 1 : visibleBottom + 1) *
      (visibleLeft < 0 ? column : visibleLeft + 1)
    );
  })
);

console.log(Math.max(...scoreMatrix.flat()));
