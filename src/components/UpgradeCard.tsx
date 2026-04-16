import { formatMoney } from "../utils/formatNumber";

interface UpgradeCardProps {
  name: string;
  count: number;
  cost: number;
  kind: "click" | "income";
  gain: number;
  canBuy: boolean;
  onBuy: () => void;
}

export default function UpgradeCard({
  name,
  count,
  cost,
  kind,
  gain,
  canBuy,
  onBuy,
}: UpgradeCardProps) {
  const kindLabel = kind === "click" ? "Upgrade de clic" : "Upgrade d'income/s";
  const gainLabel = kind === "click" ? "+" : "+";
  const gainSuffix = kind === "click" ? " valeur de clic" : " revenu/s";

  return (
    <>
      <style>{`
        .upgrade-card {
          border: 2px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          background-color: #f9f9f9;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .upgrade-card h3 {
          margin: 0;
          font-size: 18px;
        }

        .upgrade-info {
          font-size: 14px;
          color: #666;
        }

        .upgrade-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .upgrade-badge.click {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .upgrade-badge.income {
          background-color: #dcfce7;
          color: #166534;
        }

        .upgrade-info p {
          margin: 4px 0;
        }

        .upgrade-button {
          padding: 10px 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        .upgrade-button:hover:not(:disabled) {
          background-color: #45a049;
        }

        .upgrade-button:disabled {
          background-color: #9aa39a;
          cursor: not-allowed;
        }

        .upgrade-note {
          font-size: 13px;
          color: #b45309;
        }
      `}</style>

      <div className="upgrade-card">
        <h3>{name}</h3>
        <div
          className={`upgrade-badge ${kind === "click" ? "click" : "income"}`}
        >
          {kindLabel}
        </div>
        <div className="upgrade-info">
          <p>
            <strong>Coût actuel:</strong> {cost}$
          </p>
          <p>
            <strong>{kind === "click" ? "Bonus clic" : "Revenu/s"}:</strong>{" "}
            {gainLabel}
            {formatMoney(gain)}
            {gainSuffix}
          </p>
          <p>
            <strong>Quantité:</strong> {formatMoney(count)}
          </p>
        </div>
        <button className="upgrade-button" onClick={onBuy} disabled={!canBuy}>
          Acheter
        </button>
        {!canBuy && <div className="upgrade-note">Fonds insuffisants</div>}
      </div>
    </>
  );
}
