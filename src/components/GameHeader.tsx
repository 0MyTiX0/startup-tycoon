import MoneyDisplay from "./MoneyDisplay";

interface GameHeaderProps {
  amount: number;
  incomePerSecond?: number;
}

export default function GameHeader({
  amount,
  incomePerSecond,
}: GameHeaderProps) {
  return (
    <>
      <style>{`
        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }

        .game-header h1 {
          margin: 0;
        }

        .game-header-right {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .income-display {
          color: #999;
          font-size: 14px;
        }
      `}</style>
      <div className="game-header">
        <h1>Startup Tycoon</h1>

        <div className="game-header-right">
          <MoneyDisplay amount={amount} />

          <div className="income-display">
            {typeof incomePerSecond === "number"
              ? `Income/sec: $${incomePerSecond}`
              : "Revenu/s: -- (à venir)"}
          </div>
        </div>
      </div>
    </>
  );
}
