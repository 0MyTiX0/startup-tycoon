import GameHeader from "../components/GameHeader";
import ClickButton from "../components/ClickButton";
import { useGameStore } from "../state/gameStore";

export default function Game() {
  const {
    state: { clickValue, productionMultiplier },
    dispatch,
  } = useGameStore();

  const effectiveClickValue = clickValue * productionMultiplier;

  return (
    <div>
      <GameHeader />
      <div style={{ textAlign: "center" }}>
        <ClickButton
          clickValue={effectiveClickValue}
          onClick={() => dispatch({ type: "CLICK" })}
        />
      </div>
    </div>
  );
}
