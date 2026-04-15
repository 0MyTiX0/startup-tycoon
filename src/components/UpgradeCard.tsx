interface UpgradeCardProps {
  name: string;
  count: number;
  cost: number;
  gain: number;
  canBuy: boolean;
  onBuy: () => void;
}

export default function UpgradeCard({
  name,
  count,
  cost,
  gain,
  canBuy,
  onBuy,
}: UpgradeCardProps) {
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
        <div className="upgrade-info">
          <p>
            <strong>Coût actuel:</strong> {cost}$
          </p>
          <p>
            <strong>Revenu/s:</strong> +{gain}$
          </p>
          <p>
            <strong>Quantité:</strong> {count}
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
