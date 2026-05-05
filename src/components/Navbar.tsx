import { MouseEvent } from "react";
import { useGameStore } from "../state/gameStore";
import { formatMoney } from "../utils/formatNumber";

interface NavbarProps {
  onNavigate: (path: string, event: MouseEvent<HTMLAnchorElement>) => void;
  currentPath: string;
}

export default function Navbar({ onNavigate, currentPath }: NavbarProps) {
  const {
    state: { money, clickValue, incomePerSecond, productionMultiplier },
  } = useGameStore();

  const DEBUG_RENDERS =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("renderLogs") === "1";

  if (DEBUG_RENDERS) {
    console.count("Navbar render");
  }

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      <style>
        {`
          .navbar {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }

          .navbar-links {
            display: flex;
            align-items: center;
          }

          .navbar-stats {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            color: #0f172a;
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
          }

          .navbar-stat {
            padding: 6px 10px;
            border-radius: 999px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
          }

          .navbar-stat.primary {
            background: #dbeafe;
            border-color: #93c5fd;
            color: #1d4ed8;
          }

          .navbar-stat.success {
            background: #dcfce7;
            border-color: #86efac;
            color: #166534;
          }

          .navbar-stat.warning {
            background: #ede9fe;
            border-color: #c4b5fd;
            color: #6d28d9;
          }

          .navbar a {
            margin: 0 10px;
            text-decoration: none;
            color: #333;
          }

          .navbar a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <nav className="navbar">
        <div className="navbar-links">
          <a href="/game" onClick={(e) => onNavigate("/game", e)}>
            Jeu
          </a>

          <a href="/shop" onClick={(e) => onNavigate("/shop", e)}>
            Boutique
          </a>

          <a href="/stats" onClick={(e) => onNavigate("/stats", e)}>
            Stats
          </a>

          <a href="/settings" onClick={(e) => onNavigate("/settings", e)}>
            Parametres
          </a>
        </div>

        <div className="navbar-stats">
          <span className="navbar-stat primary">
            Money: ${formatMoney(money)}
          </span>
          <span className="navbar-stat">Click: +{formatMoney(clickValue)}</span>
          <span className="navbar-stat success">
            Income/sec: +{formatMoney(incomePerSecond)}
          </span>
          <span className="navbar-stat warning">
            Prod x{productionMultiplier.toFixed(2)}
          </span>
        </div>
      </nav>
    </>
  );
}
