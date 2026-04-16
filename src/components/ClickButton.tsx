import { MouseEvent } from "react";
import { formatMoney } from "../utils/formatNumber";

interface ClickButtonProps {
  clickValue: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ClickButton({ clickValue, onClick }: ClickButtonProps) {
  const formattedClickValue = formatMoney(clickValue);

  return (
    <>
      <style>{`
        .click-button-wrap {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .click-button {
          position: relative;
          min-width: 220px;
          padding: 18px 22px;
          font-size: 18px;
          cursor: pointer;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          border: none;
          border-radius: 18px;
          box-shadow: 0 14px 28px rgba(22, 163, 74, 0.24);
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
          overflow: hidden;
        }

        .click-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 50%);
          pointer-events: none;
        }

        .click-button:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 18px 34px rgba(22, 163, 74, 0.3);
          filter: brightness(1.02);
        }

        .click-button:active {
          transform: translateY(0) scale(0.99);
          box-shadow: 0 10px 20px rgba(22, 163, 74, 0.22);
        }

        .click-button-title {
          font-weight: bold;
          font-size: 17px;
          letter-spacing: 0.02em;
        }

        .click-button-value {
          margin-top: 6px;
          font-size: 14px;
          opacity: 0.94;
        }

        .click-button-hint {
          font-size: 12px;
          color: #64748b;
        }

        .click-button-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
      `}</style>
      <div className="click-button-wrap">
        <div className="click-button-badge">Gain de clic actuel</div>
        <button className="click-button" onClick={onClick}>
          <div className="click-button-title">Développer</div>
          <div className="click-button-value">
            +{formattedClickValue}$ / clic
          </div>
        </button>
        <div className="click-button-hint">
          Le gain affiché inclut les bonus actifs.
        </div>
      </div>
    </>
  );
}
