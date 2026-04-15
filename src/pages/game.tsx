import { useEffect, useState } from "react";
import GameHeader from "../components/GameHeader";
import ClickButton from "../components/ClickButton";

export default function Game() {
  const [money, setMoney] = useState(0);
  const [incomePerSecond, setIncomePerSecond] = useState(0);
  const clickValue = 1;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMoney((currentMoney) => currentMoney + incomePerSecond);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [incomePerSecond]);

  const handleClick = () => {
    setMoney((currentMoney) => currentMoney + clickValue);
  };

  return (
    <div>
      <GameHeader amount={money} incomePerSecond={incomePerSecond} />
      <div style={{ textAlign: "center" }}>
        <ClickButton clickValue={clickValue} onClick={handleClick} />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() =>
              setIncomePerSecond((currentValue) => currentValue + 1)
            }
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            +1 income/sec
          </button>
          <button
            onClick={() => setIncomePerSecond(0)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Reset income/sec
          </button>
        </div>
      </div>
    </div>
  );
}
