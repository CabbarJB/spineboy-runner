// The game was tuned on a ~1600x900 desktop screen. On smaller screens
// (landscape phones, tablets) everything in the world — character sizes,
// positions, speed and jump physics — is multiplied by this one factor, so
// the game plays the same, just smaller.
const REFERENCE_WIDTH = 1600;
const REFERENCE_HEIGHT = 900;
const MIN_SCALE = 0.4;
const MAX_SCALE = 1;

export function getWorldScale(screenWidth: number, screenHeight: number) {
    const scale = Math.min(screenWidth / REFERENCE_WIDTH, screenHeight / REFERENCE_HEIGHT);
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}
