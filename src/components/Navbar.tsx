import { MouseEvent } from "react";
import { useGameStore } from "../state/gameStore";
import { formatMoney } from "../utils/formatNumber";

interface NavbarProps {
  onNavigate: (path: string, event: MouseEvent<HTMLAnchorElement>) => void;
  currentPath: string;
}

export default function Navbar({ onNavigate, currentPath }: NavbarProps) {
  const {
    state: { money, incomePerSecond },
  } = useGameStore();

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
            color: #374151;
            font-size: 14px;
            white-space: nowrap;
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
          Money: ${formatMoney(money)} | Income/sec: $
          {formatMoney(incomePerSecond)}
        </div>
      </nav>
    </>
  );
}
