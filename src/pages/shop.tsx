import { useState, useMemo, useCallback, useEffect } from "react";
import GameHeader from "../components/GameHeader";
import UpgradeCard from "../components/UpgradeCard";
import { useGameStore } from "../state/gameStore";
import { formatMoney } from "../utils/formatNumber";

export default function Shop() {
  const {
    state: { money, incomePerSecond, upgrades },
    dispatch,
  } = useGameStore();

  const [feedbackMessage, setFeedbackMessage] = useState(
    "Sélectionnez un upgrade à acheter.",
  );

  const DEBUG_RENDERS =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("renderLogs") === "1";

  if (DEBUG_RENDERS) {
    console.count("Shop render");
  }

  // Search + debounce
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const getCurrentCost = (upgrade: (typeof upgrades)[number]) =>
    Math.round(upgrade.initialCost * Math.pow(1.15, upgrade.count));

  const sortedUpgrades = useMemo(() => {
    const all = [...upgrades].sort((firstUpgrade, secondUpgrade) => {
      if (firstUpgrade.category !== secondUpgrade.category) {
        return firstUpgrade.initialCost - secondUpgrade.initialCost;
      }

      return firstUpgrade.initialCost - secondUpgrade.initialCost;
    });

    if (!debouncedTerm) return all;

    const term = debouncedTerm.toLowerCase();
    return all.filter((u) => u.name.toLowerCase().includes(term));
  }, [upgrades, debouncedTerm]);

  const clickUpgrades = sortedUpgrades.filter(
    (upgrade) => upgrade.category === "click",
  );
  const productionUpgrades = sortedUpgrades.filter(
    (upgrade) => upgrade.category === "production",
  );
  const incomeUpgrades = sortedUpgrades.filter(
    (upgrade) => upgrade.category === "income",
  );

  // Stable onBuy handler to avoid recreating functions on each tick
  const onBuyGlobal = useCallback(
    (upgradeId?: string) => {
      if (!upgradeId) return;
      dispatch({ type: "BUY_UPGRADE", payload: { upgradeId } });
      setFeedbackMessage("Achat envoyé.");
    },
    [dispatch],
  );

  const renderUpgradeCard = (upgrade: (typeof upgrades)[number]) => {
    const currentCost = getCurrentCost(upgrade);
    const canBuy = money >= currentCost;

    return (
      <UpgradeCard
        key={upgrade.id}
        id={upgrade.id}
        name={upgrade.name}
        description={upgrade.description}
        count={upgrade.count}
        cost={currentCost}
        kind={upgrade.category}
        gain={
          upgrade.category === "click"
            ? upgrade.clickValueGain
            : upgrade.category === "income"
              ? upgrade.incomePerSecond
              : upgrade.productionBoost
        }
        canBuy={canBuy}
        onBuy={onBuyGlobal}
      />
    );
  };

  const handleBuy = (upgradeId: string) => {
    const selectedUpgrade = upgrades.find(
      (upgrade) => upgrade.id === upgradeId,
    );

    if (!selectedUpgrade) {
      return;
    }

    const success = money >= getCurrentCost(selectedUpgrade);

    if (!success) {
      setFeedbackMessage(
        `Achat refusé pour ${selectedUpgrade.name}. Fonds insuffisants: ${formatMoney(money)}$.`,
      );
      return;
    }

    dispatch({ type: "BUY_UPGRADE", payload: { upgradeId } });

    const upgradeEffectText =
      selectedUpgrade.category === "click"
        ? `+${formatMoney(selectedUpgrade.clickValueGain)} clic`
        : selectedUpgrade.category === "income"
          ? `+${formatMoney(selectedUpgrade.incomePerSecond)} / sec`
          : `+${Math.round(selectedUpgrade.productionBoost * 100)}% production`;

    setFeedbackMessage(
      `Achat réussi: ${selectedUpgrade.name} (${upgradeEffectText})`,
    );
  };

  return (
    <div>
      <style>{`
        .shop-container {
          padding: 20px;
        }

        .shop-intro {
          margin: 0 0 18px;
          color: #64748b;
        }

        .shop-section {
          margin-top: 24px;
        }

        .shop-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .shop-section-header h2 {
          margin: 0;
          font-size: 18px;
          color: #0f172a;
        }

        .shop-section-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .shop-feedback {
          margin-top: 12px;
          color: #374151;
          font-size: 14px;
        }

        .shop-empty {
          padding: 16px;
          border: 1px dashed #cbd5e1;
          border-radius: 14px;
          color: #64748b;
          background: #f8fafc;
        }
      `}</style>

      <div className="shop-container">
        <GameHeader />
        <h1>Shop - Upgrades</h1>
        <p className="shop-intro">
          Achetez des upgrades de clic pour booster vos actions manuelles, ou
          des upgrades d'income/s pour faire tourner l'économie en continu.
        </p>

        <div style={{ margin: "12px 0" }}>
          <input
            aria-label="Recherche d'upgrades"
            placeholder="Rechercher un upgrade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 8,
              width: "100%",
              maxWidth: 420,
            }}
          />
        </div>

        <section className="shop-section">
          <div className="shop-section-header">
            <h2>Upgrades de clic</h2>
            <p>Augmentent la valeur de chaque clic.</p>
          </div>
          <div className="shop-grid">
            {clickUpgrades.length > 0 ? (
              clickUpgrades.map(renderUpgradeCard)
            ) : (
              <div className="shop-empty">
                Aucun upgrade de clic disponible.
              </div>
            )}
          </div>
        </section>

        <section className="shop-section">
          <div className="shop-section-header">
            <h2>Upgrades de production</h2>
            <p>Boostent toute la génération de monnaie.</p>
          </div>
          <div className="shop-grid">
            {productionUpgrades.length > 0 ? (
              productionUpgrades.map(renderUpgradeCard)
            ) : (
              <div className="shop-empty">
                Aucun upgrade de production disponible.
              </div>
            )}
          </div>
        </section>

        <section className="shop-section">
          <div className="shop-section-header">
            <h2>Upgrades d'income/s</h2>
            <p>Augmentent les revenus automatiques.</p>
          </div>
          <div className="shop-grid">
            {incomeUpgrades.length > 0 ? (
              incomeUpgrades.map(renderUpgradeCard)
            ) : (
              <div className="shop-empty">
                Aucun upgrade d'income/s disponible.
              </div>
            )}
          </div>
        </section>

        <div className="shop-feedback">{feedbackMessage}</div>
      </div>
    </div>
  );
}
