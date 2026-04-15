import formatMoney from "../utils/formatNumber";

interface MoneyProps {
  amount: number;
}

export default function MoneyDisplay({ amount }: MoneyProps) {
  return (
    <div>
      <p>Argent: {formatMoney(amount)} $</p>
    </div>
  );
}
