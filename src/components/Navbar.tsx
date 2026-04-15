import { MouseEvent } from "react";

interface NavbarProps {
  onNavigate: (path: string, event: MouseEvent<HTMLAnchorElement>) => void;
  currentPath: string;
}

export default function Navbar({ onNavigate, currentPath }: NavbarProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <style>
        {`
          a {
            margin: 0 10px;
            text-decoration: none;
            color: #333;
          }
        `}
      </style>
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
    </nav>
  );
}
