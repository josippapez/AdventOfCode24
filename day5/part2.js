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

const isValidPage = (page, pageOrder, j) => {
  if (!mapOfOrderingRules.has(page) && mapOfAfterRules.has(page)) return true;
  if (j === 0 && mapOfOrderingRules.get(page)?.includes(pageOrder[j + 1])) return true;
  if (j === pageOrder.length - 1 && !mapOfOrderingRules.get(page)?.includes(pageOrder[j - 1])) return true;
  if (!mapOfOrderingRules.get(page).includes(pageOrder[j - 1]) && mapOfOrderingRules.get(page).includes(pageOrder[j + 1])) return true;
  return false;
};

const checkOrder = () => {
  const result = [[]];

  order.forEach((pageOrder, i) => {
    result.push([]);

    pageOrder.forEach((page, j) => {
      if (isValidPage(page, pageOrder, j)) {
        result[i].push(page);
      } else {
        result[i].push("invalid");
      }
    });
  });

  return result;
};

const result = checkOrder();

const calculateRankings = (tempOrder, rankings, i) => {
  tempOrder.forEach((page) => {
    if (mapOfOrderingRules.has(page)) {
      mapOfOrderingRules.get(page).forEach((afterPage) => {
        if (!rankings[i]) rankings[i] = {};
        if (!rankings[i][page]) rankings[i][page] = 0;
        if (tempOrder.includes(afterPage)) rankings[i][page]++;
      });
    } else if (mapOfAfterRules.has(page)) {
      mapOfAfterRules.get(page).forEach((beforePage) => {
        if (!rankings[i]) rankings[i] = {};
        if (!rankings[i][page]) rankings[i][page] = 0;
        if (tempOrder.includes(beforePage)) rankings[i][page]--;
      });
    }
  });
};

const orderInvalidInputsCorrectly = () => {
  const rankings = [];
  result.forEach((pageOrder, i) => {
    if (!pageOrder.includes("invalid")) return;

    const tempOrder = [...order[i]];
    calculateRankings(tempOrder, rankings, i);
  });

  return result
    .map((pageOrder, i) => {
      if (pageOrder.includes("invalid")) {
        return Object.keys(rankings[i])
          .sort((a, b) => rankings[i][b] - rankings[i][a])
          .map(Number);
      }
    })
    .filter(Boolean);
};

const part2 = () => {
  let sum = 0;
  const filteredResults = orderInvalidInputsCorrectly();

  filteredResults.forEach((ranking) => {
    const pageOrderLength = ranking.length;
    if (pageOrderLength % 2 === 0) return;
    sum += ranking[Math.floor(pageOrderLength / 2)];
  });

  return sum;
};

console.log({ part2: part2() });
