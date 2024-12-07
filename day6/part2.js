const fs = require("fs");
const input = fs.readFileSync("./day6/input/input.txt", "utf8");

const mapMatrix = input
  .trim()
  .split("\n")
  .map(row => row.split(""));

//first always visited
let possiblSolutions = 0;
// always up at the beginning
let currentDirection = "up";
let [startRow, startColumn] = [0, 0];

mapMatrix.forEach((row, rowIndex) => {
  row.forEach((field, columnIndex) => {
    if (field === "^") {
      startRow = rowIndex;
      startColumn = columnIndex;
    }
  });
});

const isNextFieldAnObstacle = (row, column, direction) => {
  switch (direction) {
    case "up":
      return mapMatrix[row - 1]?.[column] === "#";
    case "down":
      return mapMatrix[row + 1]?.[column] === "#";
    case "left":
      return mapMatrix[row]?.[column - 1] === "#";
    case "right":
      return mapMatrix[row]?.[column + 1] === "#";
  }
};

const turnRight = direction => {
  switch (direction) {
    case "up":
      return "right";
    case "down":
      return "left";
    case "left":
      return "up";
    case "right":
      return "down";
  }
};

const part2 = () => {
  let sum = 0;

  return sum;
};

console.log({ part2: part2() });
