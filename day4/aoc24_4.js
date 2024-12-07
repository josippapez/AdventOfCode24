// read from input/input.txt
const fs = require("fs");
const input = fs.readFileSync("./day4/input/input.txt", "utf8");

const matrix = input.split("\n").map(row => row.split(""));

const checkForXmasInRow = row => {
  const match = row.join("").match(/XMAS/g);
  return match?.length || 0;
};

const checkForXmasInColumn = column => {
  return checkForXmasInRow([...column]) + checkForXmasInRow([...column].reverse());
};

const checkForXmasInDiagonal = matrix => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    const diagonal1 = [];
    const diagonal2 = [];

    for (let j = 0; j < matrix.length - i; j++) {
      diagonal1.push(matrix[j][j + i]);
      diagonal2.push(matrix[j][matrix.length - 1 - j - i]);

    }

    count += checkForXmasInRow(diagonal1) + checkForXmasInRow(diagonal2);
    count +=
      checkForXmasInRow(diagonal1.reverse()) +
      checkForXmasInRow(diagonal2.reverse());
  }

  for (let i = 1; i < matrix.length; i++) {
    const diagonal3 = [];
    const diagonal4 = [];

    for (let j = 0; j < matrix.length - i; j++) {
      diagonal3.push(matrix[j + i][j]);
      diagonal4.push(matrix[j + i][matrix.length - 1 - j]);
    }

    count += checkForXmasInRow(diagonal3) + checkForXmasInRow(diagonal4);
    count +=
      checkForXmasInRow(diagonal3.reverse()) +
      checkForXmasInRow(diagonal4.reverse());
  }

  return count;
};

const part1 = () => {
  let count = 0;

  matrix.forEach((row, i) => {
    const column = matrix.map(row => row[i]);
    count += checkForXmasInRow([...row]) + checkForXmasInRow([...row].reverse()) + checkForXmasInColumn(column);
  });

  count += checkForXmasInDiagonal(matrix);

  return count;
};

// PART 2
const checkForMasInXShape = matrix => {
  let count = 0;

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      // check if the current cell is an "A" and if the surrounding cells are valid
      if (
        matrix[i][j] === "A" &&
        matrix[i - 1][j - 1] &&
        matrix[i + 1][j + 1] &&
        matrix[i - 1][j + 1] &&
        matrix[i + 1][j - 1]
      ) {
        const firstDiagonal = [
          matrix[i - 1][j - 1],
          matrix[i][j],
          matrix[i + 1][j + 1],
        ].join("");
        const secondDiagonal = [
          matrix[i - 1][j + 1],
          matrix[i][j],
          matrix[i + 1][j - 1],
        ].join("");

        if (
          (firstDiagonal === "MAS" || firstDiagonal === "SAM") &&
          (secondDiagonal === "MAS" || secondDiagonal === "SAM")
        ) {
          count++;
        }
      }
    }
  }

  return count;
};

const part2 = () => {
  return checkForMasInXShape(matrix);
};

console.log({ part1: part1(), part2: part2() });
