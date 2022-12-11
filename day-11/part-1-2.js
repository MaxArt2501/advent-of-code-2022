const getMonkeys = () =>
  input
    .trim()
    .split("\n\n")
    .map((info) =>
      info
        .match(
          /items: (\d+(?:, \d+)*)\n  Operation: new = old ([\+\*]) (\d+|old)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d)\n    If false: throw to monkey (\d)/
        )
        .slice(1)
    )
    .map(([rawList, operation, arg, div, pass, fail]) => ({
      list: rawList.split(", ").map(BigInt),
      operation,
      argument: arg === "old" ? 0n : BigInt(arg),
      divisor: BigInt(div),
      passIndex: Number(pass),
      failIndex: Number(fail),
    }));

const getMonkeyBusiness = (rounds, reducer) => {
  const monkeys = getMonkeys();
  // All the divisors should be different primes, so this is actually the least
  // common divisor. We need this to keep the worry levels low, otherwise BigInt
  // computations will take too long (especially for part 2).
  const commonDivisor = monkeys.reduce((prod, { divisor }) => prod * divisor, 1n);
  const activityCount = new Uint32Array(monkeys.length);
  for (let count = 0; count < rounds; count++)
    monkeys.forEach(
      (
        { list, operation, argument, divisor, passIndex, failIndex },
        index
      ) => {
        list.forEach((item) => {
          let worryLevel =
            operation === "+"
              ? item + (argument || item)
              : item * (argument || item);
          if (reducer !== 1n) worryLevel /= reducer;
          const recipientIndex = worryLevel % divisor ? failIndex : passIndex;
          monkeys[recipientIndex].list.push(worryLevel % commonDivisor);
        });
        activityCount[index] += list.length;
        list.length = 0;
      }
    );

  activityCount.sort((a, b) => b - a);
  return activityCount[0] * activityCount[1];
};

console.log(getMonkeyBusiness(20, 3n));    // Part 1
console.log(getMonkeyBusiness(10000, 1n)); // Part 2
