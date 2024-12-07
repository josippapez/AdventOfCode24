const fs = require("fs");
const inputs = fs.readFileSync("./day3/input/input.txt", "utf8");

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

console.log({ part2: part2() });
