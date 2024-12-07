const fs = require("fs");
const input = fs.readFileSync("./day6/input/input.txt", "utf8");

const mapMatrix = input
  .trim()
  .split("\n")
  .map(row => row.split(""));

//first always visited
let visited = 1;
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

const countVisitedFields = (startRow, startColumn) => {
  let [row, column] = [startRow, startColumn];

  while (true) {
    if (isNextFieldAnObstacle(row, column, currentDirection)) {
      currentDirection = turnRight(currentDirection);
    }

    switch (currentDirection) {
      case "up":
        if (mapMatrix[row] && mapMatrix[row][column]) {
          mapMatrix[row][column] = "X";
        }
        row--;
        break;
      case "down":
        if (mapMatrix[row] && mapMatrix[row][column]) {
          mapMatrix[row][column] = "X";
        }
        row++;
        break;
      case "left":
        if (mapMatrix[row] && mapMatrix[row][column]) {
          mapMatrix[row][column] = "X";
        }
        column--;
        break;
      case "right":
        if (mapMatrix[row] && mapMatrix[row][column]) {
          mapMatrix[row][column] = "X";
        }
        column++;
        break;
    }

    if (
      row < 0 ||
      row >= mapMatrix.length ||
      column < 0 ||
      column >= mapMatrix[0].length
    ) {
      break;
    }

    if (mapMatrix[row][column] === ".") visited++;
  }
};

const part1 = () => {
  countVisitedFields(startRow, startColumn);

  return visited;
};

console.log({ part1: part1() });
