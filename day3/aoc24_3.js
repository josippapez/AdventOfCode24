// read from input/input.txt
const fs = require("fs");
const inputs = fs.readFileSync("./day3/input/input.txt", "utf8");

// only keep mul(xxx,yyy) in that form and remove all other characters where xxx and yyy can be up to 3 digits
let input = inputs.match(/mul\(\d{1,3},\d{1,3}\)/g);

const part1 = () => {
  let sum = 0;

  input?.forEach(element => {
    sum += element
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .reduce((acc, curr) => acc * curr, 1);
  });

  return sum;
};

const part2 = () => {
  const filteredInput = inputs
    .trim()
    .replace(/[\n\r]/g, "")
    .replaceAll(/don't\(\).*?do\(\)/g, "")
    .match(/mul\(\d{1,3},\d{1,3}\)/g);
  let sum = 0;

  filteredInput?.forEach(element => {
    sum += element
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .reduce((acc, curr) => acc * curr, 1);
  });

  return sum;
};

console.log({ part1: part1(), part2: part2() });
