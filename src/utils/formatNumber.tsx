export const formatMoney = (value: number): string => {
  const absValue = Math.abs(value);

  if (absValue < 1_000) {
    return Number(value.toFixed(2)).toString();
  }

  const suffixes = [
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
  ];
  const exponent = Math.min(
    Math.floor(Math.log10(absValue) / 3),
    suffixes.length,
  );

  const scaledValue = value / 1_000 ** exponent;
  const suffix = suffixes[exponent - 1] ?? "";

  return `${Number(scaledValue.toFixed(2)).toString()}${suffix}`;
};

export default formatMoney;
