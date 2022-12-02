const rounds = input.trim().split("\n");

// Each combination of `[ABC] [XYZ]` has a predefined score, so here's a simple
// map...

const part1Scores = {
  "A X": 4,
  "A Y": 8,
  "A Z": 3,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 7,
  "C Y": 2,
  "C Z": 6,
};

const computeScore = (scoreMap) =>
  rounds.reduce((total, round) => total + scoreMap[round], 0);

// Part 1
console.log(computeScore(part1Scores));

// In the end, we just need to adjust the scores...
const part2Scores = {
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7,
};

// Part 2
console.log(computeScore(part2Scores));
