const fs = require("fs");
const input = fs.readFileSync("./day2/input/input.txt", "utf8");

const lines = input.trim().split("\n");

const check = (previous, current) => {
  return {
    isSame: previous === current,
    isBigger:
      current > previous &&
      Math.abs(current - previous) <= 3 &&
      Math.abs(previous - current) >= 1,
    isSmaller:
      current < previous &&
      Math.abs(current - previous) <= 3 &&
      Math.abs(previous - current) >= 1,
  };
};

const checkOrder = (line, compareFunc, dampen = 0) => {
  return line.every((number, index, array) => {
    if (index === 0) return true;
    const isValid = check(array[index - 1], number);
    if (compareFunc(isValid)) return true;
    if (dampen >= 1) return false;
    return (
      checkOrder(
        [...array].filter((_, i) => i !== index - 1),
        compareFunc,
        dampen + 1
      ) ||
      checkOrder(
        [...array].filter((_, i) => i !== index),
        compareFunc,
        dampen + 1
      )
    );
  });
};

const part2 = () => {
  let sum = 0;
  lines.forEach(line => {
    const parsedLine = line.split(" ").map(Number);

    if (
      checkOrder(parsedLine, isValid => isValid.isSmaller) ||
      checkOrder(parsedLine, isValid => isValid.isBigger)
    ) {
      sum++;
    }
  });
  return sum;
};

console.log({ part2: part2() });
