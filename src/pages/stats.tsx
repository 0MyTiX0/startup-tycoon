import GameHeader from "../components/GameHeader";
import type { Upgrade } from "../data/dataUpgrades";

interface StatsProps {
  money: number;
  incomePerSecond: number;
  upgrades: Upgrade[];
}

export default function Stats({
  money,
  incomePerSecond,
  upgrades,
}: StatsProps) {
  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );

  return (
    <div>
      <GameHeader />
      <h1>Stats</h1>
      <p>Regarder les statistiques de votre jeu.</p>
      <p>Argent actuel: {money}$</p>
      <p>Income/sec actuel: +{incomePerSecond}$/sec</p>
      <p>Upgrades possédés: {totalOwnedUpgrades}</p>
    </div>
  );
}
