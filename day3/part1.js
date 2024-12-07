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

console.log({ part1: part1() });
