import { useState, useEffect, MouseEvent, ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Game from "./pages/Game";
import Shop from "./pages/shop";
import Stats from "./pages/stats";
import Settings from "./pages/settings";
import NotFound from "./pages/notFound";
import Upgrades, { type Upgrade } from "./data/dataUpgrades";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname,
  );
  const [money, setMoney] = useState(0);
  const [incomePerSecond, setIncomePerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() =>
    Upgrades.map((upgrade) => ({ ...upgrade })),
  );

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMoney((currentMoney) => currentMoney + incomePerSecond);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [incomePerSecond]);

  const getCurrentCost = (upgrade: Upgrade) =>
    Math.round(upgrade.initialCost * Math.pow(1.15, upgrade.count));

  const handleCollect = () => {
    setMoney((currentMoney) => currentMoney + 1);
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const selectedUpgrade = upgrades.find(
      (upgrade) => upgrade.id === upgradeId,
    );

    if (!selectedUpgrade) {
      return false;
    }

    const currentCost = getCurrentCost(selectedUpgrade);

    if (money < currentCost) {
      return false;
    }

    setMoney((currentMoney) => currentMoney - currentCost);
    setIncomePerSecond(
      (currentIncome) => currentIncome + selectedUpgrade.incomePerSecond,
    );
    setUpgrades((currentUpgrades) =>
      currentUpgrades.map((upgrade) =>
        upgrade.id === upgradeId
          ? { ...upgrade, count: upgrade.count + 1 }
          : upgrade,
      ),
    );

    return true;
  };

  const navigate = (path: string, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  let Component: ReactNode;
  switch (currentPath) {
    case "/":
    case "/game":
      Component = (
        <Game
          money={money}
          incomePerSecond={incomePerSecond}
          onCollect={handleCollect}
        />
      );
      break;
    case "/shop":
      Component = (
        <Shop
          money={money}
          incomePerSecond={incomePerSecond}
          upgrades={upgrades}
          onBuyUpgrade={handleBuyUpgrade}
        />
      );
      break;
    case "/stats":
      Component = (
        <Stats
          money={money}
          incomePerSecond={incomePerSecond}
          upgrades={upgrades}
        />
      );
      break;
    case "/settings":
      Component = <Settings />;
      break;
    default:
      Component = <NotFound />;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      <main style={{ flex: 1, padding: "20px" }}>{Component}</main>

      <Footer />
    </div>
  );
}
