import GameHeader from "../components/GameHeader";
import ClickButton from "../components/ClickButton";
import { useGameStore } from "../state/gameStore";

export default function Game() {
  const {
    state: { money, incomePerSecond, clickValue },
    dispatch,
  } = useGameStore();

  return (
    <div>
      <GameHeader amount={money} incomePerSecond={incomePerSecond} />
      <div style={{ textAlign: "center" }}>
        <ClickButton
          clickValue={clickValue}
          onClick={() => dispatch({ type: "CLICK" })}
        />
      </div>
    </div>
  );
}
