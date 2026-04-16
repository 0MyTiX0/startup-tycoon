import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import Upgrades, { type Upgrade } from "../data/dataUpgrades";

export interface GameState {
  money: number;
  clickValue: number;
  incomePerSecond: number;
  upgrades: Upgrade[];
  totalClicks: number;
  totalEarned: number;
}

export type GameAction =
  | { type: "CLICK" }
  | { type: "TICK" }
  | { type: "BUY_UPGRADE"; payload: { upgradeId: string } }
  | { type: "RESET_GAME" };

export const createInitialGameState = (): GameState => ({
  money: 0,
  clickValue: 1,
  incomePerSecond: 0,
  upgrades: Upgrades.map((upgrade) => ({ ...upgrade })),
  totalClicks: 0,
  totalEarned: 0,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "CLICK":
      return {
        ...state,
        money: state.money + state.clickValue,
        totalClicks: state.totalClicks + 1,
      };
    case "TICK":
      return {
        ...state,
        money: state.money + state.incomePerSecond,
        totalEarned: state.totalEarned + state.incomePerSecond,
      };
    case "BUY_UPGRADE": {
      const selectedUpgrade = state.upgrades.find(
        (upgrade) => upgrade.id === action.payload.upgradeId,
      );

      if (!selectedUpgrade) {
        return state;
      }

      const currentCost = Math.round(
        selectedUpgrade.initialCost * Math.pow(1.15, selectedUpgrade.count),
      );

      if (state.money < currentCost) {
        return state;
      }

      return {
        ...state,
        money: state.money - currentCost,
        clickValue:
          selectedUpgrade.category === "click"
            ? state.clickValue + selectedUpgrade.clickValueGain
            : state.clickValue,
        incomePerSecond:
          selectedUpgrade.category === "income"
            ? state.incomePerSecond + selectedUpgrade.incomePerSecond
            : state.incomePerSecond,
        upgrades: state.upgrades.map((upgrade) =>
          upgrade.id === action.payload.upgradeId
            ? { ...upgrade, count: upgrade.count + 1 }
            : upgrade,
        ),
      };
    }
    case "RESET_GAME":
      return createInitialGameState();
    default:
      return state;
  }
};

type GameStoreContextValue = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

const GameStoreContext = createContext<GameStoreContextValue | null>(null);

export function GameStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GameStoreContext.Provider value={value}>
      {children}
    </GameStoreContext.Provider>
  );
}

export function useGameStore() {
  const context = useContext(GameStoreContext);

  if (!context) {
    throw new Error("useGameStore must be used inside GameStoreProvider");
  }

  return context;
}
