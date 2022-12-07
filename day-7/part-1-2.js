const lines = input.trim().split("\n");

const parseDir = (node, index = 1) => {
  let line;
  while ((line = lines[index++]) && line !== "$ cd ..") {
    if (line.startsWith("dir ")) {
      const dirNode = { dirs: {}, files: {} };
      node.dirs[line.slice(4)] = dirNode;
    } else if (line.startsWith("$ cd ")) {
      index = parseDir(node.dirs[line.slice(5)], index);
    } else if (line !== "$ ls") {
      const [size, file] = line.split(" ");
      node.files[file] = +size;
    }
  }
  return index;
};

const root = { dirs: {}, files: {} };
// Fills in the object above
parseDir(root);

/** Maps every directory with its size */
const getDirSizes = (node, map = {}, name = "") => {
  const subDirSizes = Object.entries(node.dirs).map(([dirName, dirNode]) => {
    const res = getDirSizes(dirNode, map, name + "/" + dirName);
    return res[name + "/" + dirName];
  });
  map[name] = [...Object.values(node.files), ...subDirSizes].reduce(
    (total, size) => total + size,
    0
  );
  return map;
};

const dirSizes = getDirSizes(root);

// Part 1
const smallDirsTotalSize = Object.values(dirSizes)
  .filter((size) => size <= 100000)
  .reduce((total, size) => size + total);
console.log(smallDirsTotalSize);

const freeSpace = 7e7 - dirSizes[""];
const neededSpace = 3e7 - freeSpace;
const smallestFitDirSize = Object.values(dirSizes).reduce(
  (min, size) => (size >= neededSpace && size < min ? size : min),
  Infinity
);
// Part 2
console.log(smallestFitDirSize);
