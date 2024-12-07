// read from input/input.txt
const fs = require("fs");
const input = fs.readFileSync("./day2/input/input.txt", "utf8");

// const lines = example.trim().split("\n");
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

const checkDescending = (line, dampen = 0) => {
  return line.every((number, index, array) => {
    if (index === 0) return true;
    const isValid = check(array[index - 1], number);
    if (isValid.isSmaller) return true;
    if (dampen >= 1) return false;
    return (
      checkDescending(
        [...array].filter((_, i) => i !== index),
        dampen + 1
      ) ||
      checkDescending(
        [...array].filter((_, i) => i !== index - 1),
        dampen + 1
      )
    );
  });
};

const checkAscending = (line, dampen = 0) => {
  return line.every((number, index, array) => {
    if (index === 0) return true;
    const isValid = check(array[index - 1], number);
    if (isValid.isBigger) return true;
    if (dampen >= 1) return false;
    return (
      checkAscending(
        [...array].filter((_, i) => i !== index - 1),
        dampen + 1
      ) ||
      checkAscending(
        [...array].filter((_, i) => i !== index),
        dampen + 1
      )
    );
  });
};

const part2 = () => {
  let sum = 0;
  lines.forEach(line => {
    const parsedLine = line.split(" ").map(Number);

    if (checkDescending(parsedLine) || checkAscending(parsedLine)) {
      sum++;
    }
  });
  return sum;
};

console.log({ part1: part1(), part2: part2() });
