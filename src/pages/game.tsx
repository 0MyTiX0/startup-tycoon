import { useState } from "react";
import GameHeader from "../components/GameHeader";
import ClickButton from "../components/ClickButton";

export default function Game() {
  const [money, setMoney] = useState(0);
  const clickValue = 1;

  const handleClick = () => {
    setMoney((currentMoney) => currentMoney + clickValue);
  };

  return (
    <div>
      <GameHeader amount={money} />
      <div style={{ textAlign: "center" }}>
        <ClickButton clickValue={clickValue} onClick={handleClick} />
      </div>
    </div>
  );
}
