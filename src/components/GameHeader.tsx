import MoneyDisplay from "./MoneyDisplay";

interface GameHeaderProps {
  amount: number;
}

export default function GameHeader({ amount }: GameHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #333",
        paddingBottom: "15px",
        marginBottom: "20px",
      }}
    >
      <h1 style={{ margin: 0 }}>Startup Tycoon</h1>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <MoneyDisplay amount={amount} />

        {/* IncomeDisplay placeholder pour les TP suivants */}
        <div style={{ color: "#999", fontSize: "14px" }}>
          Revenu/s: -- (à venir)
        </div>
      </div>
    </div>
  );
}
