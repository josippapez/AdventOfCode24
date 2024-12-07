// read from input/input.txt
const fs = require("fs");
const input = fs.readFileSync("./day5/input/input.txt", "utf8");

const data = input.split("\n");
const split = data.findIndex((line, i) => line === "" && i > 0);

const orderingRules = data
  .slice(0, split)
  .map(line => line.split("|").map(Number));
const order = data.slice(split + 1).map(line => line.split(",").map(Number));

const mapOfOrderingRules = new Map();
const mapOfAfterRules = new Map();
orderingRules.forEach(([a, b]) => {
  if (!mapOfOrderingRules.has(a)) {
    mapOfOrderingRules.set(a, []);
  }
  if (!mapOfAfterRules.has(b)) {
    mapOfAfterRules.set(b, []);
  }

  mapOfOrderingRules.get(a).push(b);
  mapOfAfterRules.get(b).push(a);
});

const checkOrder = () => {
  const result = [[]];

  order.forEach((pageOrder, i) => {
    result.push([]);

    pageOrder.forEach((page, j) => {
      if (!mapOfOrderingRules.has(page) && mapOfAfterRules.has(page))
        return result[i].push(page);
      if (j === 0 && mapOfOrderingRules.get(page)?.includes(pageOrder[j + 1])) {
        return result[i].push(page);
      }
      if (
        j === pageOrder.length - 1 &&
        !mapOfOrderingRules.get(page)?.includes(pageOrder[j - 1])
      ) {
        return result[i].push(page);
      }

      if (
        !mapOfOrderingRules.get(page).includes(pageOrder[j - 1]) &&
        mapOfOrderingRules.get(page).includes(pageOrder[j + 1])
      ) {
        return result[i].push(page);
      }

      result[i].push("invalid");
    });
  });

  return result;
};

const result = checkOrder();

const part1 = () => {
  // sum of the central pages
  let sum = 0;

  result.forEach((pageOrder, i) => {
    if (pageOrder.includes("invalid")) return;
    const pageOrderLength = pageOrder.length;
    if (pageOrderLength % 2 === 0) return;
    sum += pageOrder[Math.floor(pageOrderLength / 2)];
  });

  return sum;
};

console.log({ part1: part1() });
