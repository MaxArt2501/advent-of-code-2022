const snafuToDecimal = (snafu) =>
  snafu
    .split("")
    .reduce(
      (total, char) =>
        total * 5 + (char === "=" ? -2 : char === "-" ? -1 : +char),
      0
    );

const snafuCharMap = { "-2": "=", "-1": "-", 0: 0, 1: 1, 2: 2 };
const decimalToSnafu = (number) => {
  let snafu = "";
  for (
    let exp = Math.round(Math.log(number) / Math.log(5)), rest = number;
    exp >= 0;
    exp--
  ) {
    const digit = Math.round(rest / 5 ** exp);
    snafu += snafuCharMap[digit];
    rest -= digit * 5 ** exp;
  }
  return snafu;
};

const total = input
  .trim()
  .split("\n")
  .reduce((tot, snafu) => tot + snafuToDecimal(snafu), 0);
console.log(decimalToSnafu(total));
