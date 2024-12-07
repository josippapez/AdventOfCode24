const fs = require("fs");
const input = fs.readFileSync("./day5/input/input.txt", "utf8");

const data = input.split("\n");
const split = data.findIndex((line, i) => line === "" && i > 0);

const orderingRules = data.slice(0, split).map(line => line.split("|").map(Number));
const order = data.slice(split + 1).map(line => line.split(",").map(Number));

const createMap = (rules, index) => {
  const map = new Map();
  rules.forEach(rule => {
    const key = rule[index];
    const value = rule[1 - index];
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(value);
  });
  return map;
};

const mapOfOrderingRules = createMap(orderingRules, 0);
const mapOfAfterRules = createMap(orderingRules, 1);

const isValidPage = (pageOrder, page, j) => {
  if (!mapOfOrderingRules.has(page) && mapOfAfterRules.has(page)) return true;
  if (j === 0 && mapOfOrderingRules.get(page)?.includes(pageOrder[j + 1])) return true;
  if (j === pageOrder.length - 1 && !mapOfOrderingRules.get(page)?.includes(pageOrder[j - 1])) return true;
  if (!mapOfOrderingRules.get(page).includes(pageOrder[j - 1]) && mapOfOrderingRules.get(page).includes(pageOrder[j + 1])) return true;
  return false;
};

const checkOrder = () => {
  return order.map(pageOrder => {
    return pageOrder.map((page, j) => {
      return isValidPage(pageOrder, page, j) ? page : "invalid";
    });
  });
};

const result = checkOrder();

const part1 = () => {
  return result.reduce((sum, pageOrder) => {
    if (pageOrder.includes("invalid")) return sum;
    const pageOrderLength = pageOrder.length;
    if (pageOrderLength % 2 === 0) return sum;
    return sum + pageOrder[Math.floor(pageOrderLength / 2)];
  }, 0);
};

console.log({ part1: part1() });
