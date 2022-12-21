const getMonkeys = () =>
  input
    .trim()
    .split("\n")
    .reduce((map, line) => {
      const [, name, a, operation, b, strValue] = line.match(
        /([a-z]{4}): (?:([a-z]{4}) ([+\-*\/]) ([a-z]{4})|(\d+))/
      );
      map[name] = { a, b, operation, value: +strValue };
      return map;
    }, {});

const computeMonkeys = (excludeHuman = false) => {
  const monkeys = getMonkeys();
  let frontier = new Set(
    Object.entries(monkeys)
      .filter(([, data]) => !Number.isNaN(data.value))
      .map(([name]) => name)
  );
  const toBeComputed = new Set(
    Object.keys(monkeys).filter((name) => !frontier.has(name))
  );
  if (excludeHuman) {
    frontier.delete("humn");
  }
  while (frontier.size) {
    const newFrontier = new Set();
    for (const name of frontier)
      for (const waitingName of toBeComputed) {
        const monkey = monkeys[waitingName];
        if (monkey.a === name) monkey.a = monkeys[name].value;
        else if (monkey.b === name) monkey.b = monkeys[name].value;
        if (typeof monkey.a === "number" && typeof monkey.b === "number") {
          monkey.value = {
            "+": monkey.a + monkey.b,
            "*": monkey.a * monkey.b,
            "-": monkey.a - monkey.b,
            "/": monkey.a / monkey.b,
          }[monkeys[waitingName].operation];
          toBeComputed.delete(waitingName);
          newFrontier.add(waitingName);
        }
      }
    frontier = newFrontier;
  }
  return monkeys;
};

// Part 1
console.log(computeMonkeys().root.value);

// Part 2
const computeInitialValue = (monkeys) => {
  let initialValue =
    typeof monkeys.root.a === "string" ? monkeys.root.b : monkeys.root.a;
  let monkey =
    monkeys[
      typeof monkeys.root.a === "string" ? monkeys.root.a : monkeys.root.b
    ];
  while (monkey !== monkeys.humn) {
    if (typeof monkey.a === "string") {
      // The first argument is the name of the next monkey
      initialValue = {
        "+": initialValue - monkey.b,
        "*": initialValue / monkey.b,
        "-": initialValue + monkey.b,
        "/": initialValue * monkey.b,
      }[monkey.operation];
      monkey = monkeys[monkey.a];
    } else {
      initialValue = {
        "+": initialValue - monkey.a,
        "*": initialValue / monkey.a,
        "-": monkey.a - initialValue,
        "/": monkey.a / initialValue,
      }[monkey.operation];
      monkey = monkeys[monkey.b];
    }
  }
  return initialValue;
};
const monkeys = computeMonkeys(true);
console.log(computeInitialValue(monkeys));
