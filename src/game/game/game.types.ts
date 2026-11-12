export type GameState = "menu" | "playing" | "gameOver";

export interface GameEvents {
    onStateChange: (state: GameState) => void;
    onDistanceChange: (distance: number) => void;
    onCoinsChange: (coins: number) => void;
}