import { useState } from "react";
import GameHeader from "../components/GameHeader";
import UpgradeCard from "../components/UpgradeCard";
import type { Upgrade } from "../data/dataUpgrades";

interface ShopProps {
  money: number;
  incomePerSecond: number;
  upgrades: Upgrade[];
  onBuyUpgrade: (upgradeId: string) => boolean;
}

export default function Shop({
  money,
  incomePerSecond,
  upgrades,
  onBuyUpgrade,
}: ShopProps) {
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Sélectionnez un upgrade à acheter.",
  );

  const getCurrentCost = (upgrade: Upgrade) =>
    Math.round(upgrade.initialCost * Math.pow(1.15, upgrade.count));

  const handleBuy = (upgradeId: string) => {
    const selectedUpgrade = upgrades.find(
      (upgrade) => upgrade.id === upgradeId,
    );

    if (!selectedUpgrade) {
      return;
    }

    const success = onBuyUpgrade(upgradeId);

    if (!success) {
      setFeedbackMessage(
        `Achat refusé pour ${selectedUpgrade.name}. Fonds insuffisants.`,
      );
      return;
    }

    setFeedbackMessage(`Achat réussi: ${selectedUpgrade.name}`);
  };

  return (
    <div>
      <style>{`
        .shop-container {
          padding: 20px;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .shop-feedback {
          margin-top: 12px;
          color: #374151;
          font-size: 14px;
        }
      `}</style>

      <div className="shop-container">
        <GameHeader amount={money} incomePerSecond={incomePerSecond} />
        <h1>Shop - Upgrades</h1>
        <p>Acheter des upgrades pour augmenter vos revenus.</p>

        <div className="shop-grid">
          {upgrades.map((upgrade) => {
            const currentCost = getCurrentCost(upgrade);
            const canBuy = money >= currentCost;

            return (
              <UpgradeCard
                key={upgrade.id}
                name={upgrade.name}
                count={upgrade.count}
                cost={currentCost}
                gain={upgrade.incomePerSecond}
                canBuy={canBuy}
                onBuy={() => handleBuy(upgrade.id)}
              />
            );
          })}
        </div>

        <div className="shop-feedback">{feedbackMessage}</div>
      </div>
    </div>
  );
}
