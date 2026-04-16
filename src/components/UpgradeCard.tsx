import { formatMoney } from "../utils/formatNumber";

interface UpgradeCardProps {
  name: string;
  description: string;
  count: number;
  cost: number;
  kind: "click" | "income" | "production";
  gain: number;
  canBuy: boolean;
  onBuy: () => void;
}

export default function UpgradeCard({
  name,
  description,
  count,
  cost,
  kind,
  gain,
  canBuy,
  onBuy,
}: UpgradeCardProps) {
  const kindLabel =
    kind === "click"
      ? "Upgrade de clic"
      : kind === "income"
        ? "Upgrade d'income/s"
        : "Upgrade de production";
  const gainLabel =
    kind === "click"
      ? "Bonus clic"
      : kind === "income"
        ? "Revenu/s"
        : "Boost global";
  const kindClass = kind;
  const valueText =
    kind === "click"
      ? `+${formatMoney(gain)} clic`
      : kind === "income"
        ? `+${formatMoney(gain)} / sec`
        : `+${Math.round(gain * 100)}% production`;

  return (
    <>
      <style>{`
        .upgrade-card {
          position: relative;
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-radius: 18px;
          padding: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .upgrade-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12);
        }

        .upgrade-card.click {
          border-top: 4px solid #2563eb;
        }

        .upgrade-card.income {
          border-top: 4px solid #16a34a;
        }

        .upgrade-card.production {
          border-top: 4px solid #7c3aed;
        }

        .upgrade-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .upgrade-card h3 {
          margin: 0;
          font-size: 18px;
          line-height: 1.2;
          color: #0f172a;
        }

        .upgrade-card p {
          margin: 0;
        }

        .upgrade-info {
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
        }

        .upgrade-badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .upgrade-badge.click {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .upgrade-badge.income {
          background-color: #dcfce7;
          color: #166534;
        }

        .upgrade-badge.production {
          background-color: #ede9fe;
          color: #6d28d9;
        }

        .upgrade-info p {
          margin: 6px 0;
        }

        .upgrade-metric {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.15);
        }

        .upgrade-metric strong {
          color: #0f172a;
        }

        .upgrade-description {
          font-size: 13px;
          color: #64748b;
          background: rgba(148, 163, 184, 0.08);
          border-radius: 12px;
          padding: 10px 12px;
        }

        .upgrade-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .upgrade-button {
          padding: 10px 16px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 8px 18px rgba(22, 163, 74, 0.22);
        }

        .upgrade-button:hover:not(:disabled) {
          filter: brightness(1.03);
        }

        .upgrade-button:disabled {
          background: #9aa39a;
          cursor: not-allowed;
          box-shadow: none;
        }

        .upgrade-note {
          font-size: 13px;
          color: #b45309;
        }
      `}</style>

      <div className={`upgrade-card ${kindClass}`}>
        <div className="upgrade-top">
          <div>
            <h3>{name}</h3>
            <div className="upgrade-info">
              <p>{kindLabel}</p>
            </div>
          </div>
          <div className={`upgrade-badge ${kindClass}`}>{valueText}</div>
        </div>
        <div className="upgrade-info">
          <div className="upgrade-metric">
            <strong>Coût</strong>
            <span>{formatMoney(cost)}$</span>
          </div>
          <div className="upgrade-metric">
            <strong>{gainLabel}</strong>
            <span>{valueText}</span>
          </div>
          <div className="upgrade-description">{description}</div>
        </div>
        <div className="upgrade-footer">
          <button className="upgrade-button" onClick={onBuy} disabled={!canBuy}>
            Acheter
          </button>
          <div className="upgrade-note">Niveau {count}</div>
        </div>
        {!canBuy && <div className="upgrade-note">Fonds insuffisants</div>}
      </div>
    </>
  );
}
