import {createUseStyles} from 'react-jss';

const styles = {
    canvas: {
        width: '100vw',
        // dvh tracks the mobile browser's collapsing address bar; vh doesn't.
        height: '100dvh',
        fallbacks: {height: '100vh'},
        overflow: 'hidden',
        // Taps are jumps: no double-tap zoom, pinch or scroll on the game.
        touchAction: 'none',
        '& canvas': {
            // Canvas is inline by default and sits on the text baseline,
            // which adds a few px below it and causes scrollbars.
            display: 'block',
        },
        position: 'relative',
    }
};

export const useGameCanvasStyles = createUseStyles(styles);
