import {useSyncExternalStore} from "react";

// Only touch devices (phones/tablets) are asked to rotate; a narrow desktop
// browser window should still be playable.
const query = "(orientation: portrait) and (pointer: coarse)";

function subscribe(onChange: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
}

export function needsRotation() {
    return window.matchMedia(query).matches;
}

export function useNeedsRotation() {
    return useSyncExternalStore(subscribe, needsRotation);
}
