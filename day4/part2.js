const fs = require("fs");
const input = fs.readFileSync("./day4/input/input.txt", "utf8");

const matrix = input.split("\n").map(row => row.split(""));

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

console.log({ part2: part2() });
