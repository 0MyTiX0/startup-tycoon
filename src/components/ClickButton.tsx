import { MouseEvent } from "react";

interface ClickButtonProps {
  clickValue: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ClickButton({ clickValue, onClick }: ClickButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>Développer</div>
      <div style={{ fontSize: "14px", marginTop: "5px" }}>
        +{clickValue}$ / clic
      </div>
    </button>
  );
}
