import {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from "react";
import Upgrades, { type Upgrade } from "../data/dataUpgrades";

export const GAME_SAVE_KEY = "startup-tycoon-save";
export const GAME_SAVE_VERSION = 1;
const SAVE_THROTTLE_MS = 2000;

export interface GameState {
  money: number;
  clickValue: number;
  incomePerSecond: number;
  productionMultiplier: number;
  upgrades: Upgrade[];
  totalClicks: number;
  totalEarned: number;
}

export interface GameSaveData {
  version: typeof GAME_SAVE_VERSION;
  savedAt: number;
  state: GameState;
}

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isUpgradeCategory = (value: unknown): value is Upgrade["category"] =>
  value === "click" || value === "income" || value === "production";

const isUpgrade = (value: unknown): value is Upgrade => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Upgrade;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    isUpgradeCategory(candidate.category) &&
    isNumber(candidate.initialCost) &&
    isNumber(candidate.incomePerSecond) &&
    isNumber(candidate.clickValueGain) &&
    (candidate.productionBoost === undefined ||
      isNumber(candidate.productionBoost)) &&
    isNumber(candidate.count) &&
    typeof candidate.description === "string"
  );
};

const isGameState = (value: unknown): value is GameState => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as GameState;

  return (
    isNumber(candidate.money) &&
    isNumber(candidate.clickValue) &&
    isNumber(candidate.incomePerSecond) &&
    (candidate.productionMultiplier === undefined ||
      isNumber(candidate.productionMultiplier)) &&
    Array.isArray(candidate.upgrades) &&
    candidate.upgrades.every(isUpgrade) &&
    isNumber(candidate.totalClicks) &&
    isNumber(candidate.totalEarned)
  );
};

export type GameAction =
  | { type: "CLICK" }
  | { type: "TICK" }
  | { type: "BUY_UPGRADE"; payload: { upgradeId: string } }
  | { type: "RESET_GAME" };

export const createInitialGameState = (): GameState => ({
  money: 0,
  clickValue: 1,
  incomePerSecond: 0,
  productionMultiplier: 1,
  upgrades: Upgrades.map((upgrade) => ({ ...upgrade })),
  totalClicks: 0,
  totalEarned: 0,
});

const normalizeLoadedGameState = (state: GameState): GameState => ({
  ...createInitialGameState(),
  ...state,
  productionMultiplier: isNumber(state.productionMultiplier)
    ? state.productionMultiplier
    : 1,
  upgrades: Upgrades.map((catalogUpgrade) => {
    const savedUpgrade = state.upgrades.find(
      (upgrade) => upgrade.id === catalogUpgrade.id,
    );

    if (!savedUpgrade) {
      return { ...catalogUpgrade };
    }

    return {
      ...catalogUpgrade,
      count: isNumber(savedUpgrade.count) ? savedUpgrade.count : 0,
      initialCost: isNumber(savedUpgrade.initialCost)
        ? savedUpgrade.initialCost
        : catalogUpgrade.initialCost,
      incomePerSecond: isNumber(savedUpgrade.incomePerSecond)
        ? savedUpgrade.incomePerSecond
        : catalogUpgrade.incomePerSecond,
      clickValueGain: isNumber(savedUpgrade.clickValueGain)
        ? savedUpgrade.clickValueGain
        : catalogUpgrade.clickValueGain,
      productionBoost: isNumber(savedUpgrade.productionBoost)
        ? savedUpgrade.productionBoost
        : catalogUpgrade.productionBoost,
      description: savedUpgrade.description || catalogUpgrade.description,
    };
  }),
});

export const createGameSaveData = (state: GameState): GameSaveData => ({
  version: GAME_SAVE_VERSION,
  savedAt: Date.now(),
  state,
});

export const serializeGameSave = (state: GameState): string =>
  JSON.stringify(createGameSaveData(state));

export const saveGameStateToStorage = (state: GameState): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(GAME_SAVE_KEY, serializeGameSave(state));
    return true;
  } catch {
    return false;
  }
};

export const isGameSaveData = (value: unknown): value is GameSaveData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as GameSaveData;

  return (
    candidate.version === GAME_SAVE_VERSION &&
    typeof candidate.savedAt === "number" &&
    isGameState(candidate.state)
  );
};

export const loadGameStateFromStorage = (): GameState => {
  if (typeof window === "undefined") {
    return createInitialGameState();
  }

  try {
    const rawSave = window.localStorage.getItem(GAME_SAVE_KEY);

    if (!rawSave) {
      return createInitialGameState();
    }

    const parsedSave: unknown = JSON.parse(rawSave);

    if (!isGameSaveData(parsedSave)) {
      return createInitialGameState();
    }

    return normalizeLoadedGameState(parsedSave.state);
  } catch {
    return createInitialGameState();
  }
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "CLICK":
      return {
        ...state,
        money: state.money + state.clickValue * state.productionMultiplier,
        totalClicks: state.totalClicks + 1,
      };
    case "TICK":
      return {
        ...state,
        money: state.money + state.incomePerSecond * state.productionMultiplier,
        totalEarned:
          state.totalEarned +
          state.incomePerSecond * state.productionMultiplier,
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
        productionMultiplier:
          selectedUpgrade.category === "production"
            ? state.productionMultiplier + selectedUpgrade.productionBoost
            : state.productionMultiplier,
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
  const [state, nativeDispatch] = useReducer(gameReducer, undefined, () =>
    loadGameStateFromStorage(),
  );

  const lastSavedAtRef = useRef(0);
  const pendingSaveTimeoutRef = useRef<number | null>(null);
  const lastActionTypeRef = useRef<GameAction["type"] | null>(null);

  const dispatch: Dispatch<GameAction> = (action) => {
    lastActionTypeRef.current = action.type;
    nativeDispatch(action);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (lastSavedAtRef.current === 0) {
      lastSavedAtRef.current = Date.now();
      return;
    }

    const saveNow = () => {
      if (pendingSaveTimeoutRef.current !== null) {
        window.clearTimeout(pendingSaveTimeoutRef.current);
        pendingSaveTimeoutRef.current = null;
      }

      if (saveGameStateToStorage(state)) {
        lastSavedAtRef.current = Date.now();
      }

      lastActionTypeRef.current = null;
    };

    const isImportantAction =
      lastActionTypeRef.current === "BUY_UPGRADE" ||
      lastActionTypeRef.current === "RESET_GAME";

    if (isImportantAction) {
      saveNow();
      return;
    }

    const elapsedSinceLastSave = Date.now() - lastSavedAtRef.current;

    if (elapsedSinceLastSave >= SAVE_THROTTLE_MS) {
      saveNow();
      return;
    }

    if (pendingSaveTimeoutRef.current !== null) {
      window.clearTimeout(pendingSaveTimeoutRef.current);
    }

    pendingSaveTimeoutRef.current = window.setTimeout(() => {
      if (saveGameStateToStorage(state)) {
        lastSavedAtRef.current = Date.now();
      }

      pendingSaveTimeoutRef.current = null;
      lastActionTypeRef.current = null;
    }, SAVE_THROTTLE_MS - elapsedSinceLastSave);
  }, [state]);

  useEffect(
    () => () => {
      if (pendingSaveTimeoutRef.current !== null) {
        window.clearTimeout(pendingSaveTimeoutRef.current);
        pendingSaveTimeoutRef.current = null;
      }
    },
    [],
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
