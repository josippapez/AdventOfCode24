const fs = require("fs");
const input = fs.readFileSync("./day2/input/input.txt", "utf8");

const lines = input.trim().split("\n");

const isSequenceValid = (line, comparator) => {
  const numbers = line.split(" ").map(Number);
  return numbers.every((number, index, array) => {
    if (index === 0) return true;
    return (
      comparator(number, array[index - 1]) &&
      Math.abs(number - array[index - 1]) <= 3 &&
      Math.abs(array[index - 1] - number) >= 1
    );
  });
};

const part1 = () => {
  let sum = 0;
  lines.forEach(line => {
    if (
      isSequenceValid(line, (a, b) => a < b) ||
      isSequenceValid(line, (a, b) => a > b)
    ) {
      sum++;
    }
  });
  return sum;
};

console.log({ part1: part1() });
