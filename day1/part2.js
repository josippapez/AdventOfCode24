
const fs = require("fs");
const input = fs.readFileSync("./day1/input/input.txt", "utf8");

const lines = input.trim().split("\n");
const left = lines.map(line => line.split("   ")[0]).sort((a, b) => a - b);
const right = lines.map(line => line.split("   ")[1]).sort((a, b) => a - b);

const part2 = () => {
  let occurrences = {};
  right.forEach(element => {
    occurrences[element] = occurrences[element] ? occurrences[element] + 1 : 1;
  });

  return left.reduce(
    (acc, element) =>
      acc + parseInt(element) * parseInt(occurrences?.[element] ?? 0),
    0
  );
};

console.log({ part2: part2() });
