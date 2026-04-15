export const formatMoney = (value: number): string => {
  const absValue = Math.abs(value);

  if (absValue < 1_000) {
    return value.toString();
  }

  if (absValue < 1_000_000) {
    return `${Number((value / 1_000).toFixed(2)).toString()}K`;
  }

  if (absValue < 1_000_000_000) {
    return `${Number((value / 1_000_000).toFixed(2)).toString()}M`;
  }

  return `${Number((value / 1_000_000_000).toFixed(2)).toString()}B`;
};

export default formatMoney;
