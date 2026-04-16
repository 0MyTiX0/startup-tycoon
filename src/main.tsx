import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GameStoreProvider } from "./state/gameStore";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <GameStoreProvider>
      <App />
    </GameStoreProvider>
  </StrictMode>,
);
