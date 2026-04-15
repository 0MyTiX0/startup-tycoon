import GameHeader from "../components/GameHeader";
import ClickButton from "../components/ClickButton";

interface GameProps {
  money: number;
  incomePerSecond: number;
  onCollect: () => void;
}

export default function Game({ money, incomePerSecond, onCollect }: GameProps) {
  const clickValue = 1;

  return (
    <div>
      <GameHeader amount={money} incomePerSecond={incomePerSecond} />
      <div style={{ textAlign: "center" }}>
        <ClickButton clickValue={clickValue} onClick={onCollect} />
      </div>
    </div>
  );
}
