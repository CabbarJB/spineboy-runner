import {type RefObject, useCallback, useSyncExternalStore} from "react";

// Older Safari (iPadOS < 16.4) only has the webkit-prefixed API.
type WebkitDocument = Document & {
    webkitFullscreenEnabled?: boolean;
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
};
type WebkitElement = HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
};
// lock() exists in browsers but isn't in TypeScript's DOM types.
type LockableOrientation = ScreenOrientation & {
    lock?: (orientation: "landscape") => Promise<void>;
};

const doc = document as WebkitDocument;

// iPhone Safari has no element fullscreen at all; hide the button there.
export const fullscreenSupported = Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);

function subscribe(onChange: () => void) {
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
        document.removeEventListener("fullscreenchange", onChange);
        document.removeEventListener("webkitfullscreenchange", onChange);
    };
}

function getSnapshot() {
    return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
}

export function useFullscreen(ref: RefObject<HTMLElement | null>) {
    const isFullscreen = useSyncExternalStore(subscribe, getSnapshot);

    const toggle = useCallback(async () => {
        try {
            if (getSnapshot()) {
                await (document.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
                return;
            }
            const el = ref.current as WebkitElement | null;
            if (!el) return;
            await (el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.());
            // Phones: pin to landscape. Only allowed in fullscreen, and
            // unsupported on desktop/iOS, so failure is expected and ignored.
            await (screen.orientation as LockableOrientation | undefined)?.lock?.("landscape");
        } catch {
            // Denied or unsupported; the game still works windowed.
        }
    }, [ref]);

    return {isFullscreen, toggle};
}
