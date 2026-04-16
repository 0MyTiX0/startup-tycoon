import { useEffect, useState } from "react";
import { GAME_SAVE_KEY, useGameStore } from "../state/gameStore";

export default function Settings() {
  const { dispatch } = useGameStore();
  const [message, setMessage] = useState(
    "Ajuster les paramètres de votre jeu.",
  );
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const refreshLastSavedAt = () => {
    try {
      const rawSave = window.localStorage.getItem(GAME_SAVE_KEY);

      if (!rawSave) {
        setLastSavedAt(null);
        return;
      }

      const parsedSave: unknown = JSON.parse(rawSave);

      if (
        !parsedSave ||
        typeof parsedSave !== "object" ||
        !("savedAt" in parsedSave) ||
        typeof parsedSave.savedAt !== "number"
      ) {
        setLastSavedAt(null);
        return;
      }

      setLastSavedAt(parsedSave.savedAt);
    } catch {
      setLastSavedAt(null);
    }
  };

  useEffect(() => {
    refreshLastSavedAt();

    const intervalId = window.setInterval(refreshLastSavedAt, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleResetSave = () => {
    const confirmed = window.confirm(
      "Voulez-vous supprimer la sauvegarde et réinitialiser la partie ?",
    );

    if (!confirmed) {
      return;
    }

    try {
      window.localStorage.removeItem(GAME_SAVE_KEY);
      dispatch({ type: "RESET_GAME" });
      setMessage("Sauvegarde supprimée et partie réinitialisée.");

      // L'écriture du reset peut arriver juste après le dispatch via la persistance du store.
      window.setTimeout(refreshLastSavedAt, 50);
    } catch {
      setMessage("Impossible de supprimer la sauvegarde pour le moment.");
    }
  };

  return (
    <div>
      <h1>Parametres</h1>
      <p>{message}</p>
      <p>
        Last saved:{" "}
        {lastSavedAt
          ? new Date(lastSavedAt).toLocaleString("fr-FR")
          : "Aucune sauvegarde"}
      </p>

      <button
        onClick={handleResetSave}
        style={{
          marginTop: "16px",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          backgroundColor: "#dc2626",
          color: "white",
          fontWeight: 700,
        }}
      >
        Reset Save
      </button>
    </div>
  );
}
