import type {MouseEvent} from "react";
import {useFullscreenButtonStyles} from "./fullscreen-button.style.ts";

type FullscreenButtonProps = {
    isFullscreen: boolean;
    onToggle: () => void;
};

// Pixel-style corner brackets: pointing out to enter, pointing in to exit.
const enterIcon = "M2 2h6v2H4v4H2zM16 2h6v6h-2V4h-4zM2 16h2v4h4v2H2zM20 16h2v6h-6v-2h4z";
const exitIcon = "M6 2h2v6H2V6h4zM16 2h2v4h4v2h-6zM2 16h6v6H6v-4H2zM16 16h6v2h-4v4h-2z";

const FullscreenButton = ({isFullscreen, onToggle}: FullscreenButtonProps) => {
    const {button} = useFullscreenButtonStyles();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        onToggle();
        // Drop focus, or the next Space press would toggle fullscreen again
        // instead of only making the player jump.
        e.currentTarget.blur();
    };

    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

    return <button type="button" className={button} onClick={onClick} aria-label={label} title={label}>
        <svg viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
            <path d={isFullscreen ? exitIcon : enterIcon}/>
        </svg>
    </button>;
}

export default FullscreenButton;
