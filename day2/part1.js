const fs = require("fs");
const input = fs.readFileSync("./day2/input/input.txt", "utf8");

const lines = input.trim().split("\n");

const part1 = () => {
  let sum = 0;
  lines.forEach(line => {
    const allNumbersAreDescending = [...line.split(" ")].every(
      (number, index, array) => {
        if (index === 0) return true;

        return (
          parseInt(number) < parseInt(array[index - 1]) &&
          Math.abs(parseInt(number) - array[index - 1]) <= 3 &&
          Math.abs(parseInt(array[index - 1]) - parseInt(number)) >= 1
        );
      }
    );

    if (allNumbersAreDescending) {
      return sum++;
    }

    const allNumbersAreAscending = [...line.split(" ")].every(
      (number, index, array) => {
        if (index === 0) return true;
        return (
          parseInt(number) > parseInt(array[index - 1]) &&
          Math.abs(parseInt(number) - array[index - 1]) <= 3 &&
          Math.abs(parseInt(array[index - 1]) - parseInt(number)) >= 1
        );
      }
    );

    if (allNumbersAreAscending) {
      return sum++;
    }
  });

  return sum;
};

console.log({ part1: part1() });
