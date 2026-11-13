export type GameState = "menu" | "playing" | "gameOver";

export interface GameEvents {
    // Fired once assets are loaded and the scene is built; start() is a no-op before this.
    onReady: () => void;
    onStateChange: (state: GameState) => void;
    onDistanceChange: (distance: number) => void;
    onCoinsChange: (coins: number) => void;
}