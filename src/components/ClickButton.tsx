import { MouseEvent } from "react";

interface ClickButtonProps {
  clickValue: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ClickButton({ clickValue, onClick }: ClickButtonProps) {
  return (
    <>
      <style>{`
        .click-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
        }

        .click-button:hover {
          background-color: #45a049;
        }

        .click-button-title {
          font-weight: bold;
        }

        .click-button-value {
          font-size: 14px;
          margin-top: 5px;
        }
      `}</style>
      <button className="click-button" onClick={onClick}>
        <div className="click-button-title">Développer</div>
        <div className="click-button-value">+{clickValue}$ / clic</div>
      </button>
    </>
  );
}
