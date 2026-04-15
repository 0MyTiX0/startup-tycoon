import React from "react";
import GameHeader from "../components/GameHeader";

export default function Stats() {
  return (
    <div>
      <GameHeader amount={0} />
      <h1>Stats</h1>
      <p>Regarder les statistiques de votre jeu.</p>
    </div>
  );
}
