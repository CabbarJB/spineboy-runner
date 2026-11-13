import {createUseStyles} from 'react-jss';

const styles = {
    wrapper: {
        position: 'absolute',
        // Pin to the container; without offsets it sits at its in-flow spot,
        // which is below the Pixi canvas once that has been appended.
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(24px, 7vh, 64px)',
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
        zIndex: 1,
        color: '#fff',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        // backdropFilter: 'blur(8px)',
        // WebkitBackdropFilter: 'blur(8px)',
    },
    title: {
        // Shrinks on narrow or short screens so the 9 characters stay on one line.
        fontSize: 'clamp(32px, min(9vw, 13vh), 90px)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        color: '#ff5a1f',
        textShadow: '6px 6px 0 #7f1d1d',
        transform: 'rotate(-8deg)',
        animation: '$slam 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both',
    },
    retry: {
        fontSize: 'clamp(16px, min(3vw, 5vh), 32px)',
        display: 'inline-block',
        color: '#ffb000',
        textShadow: '4px 4px 0 #c2410c',
        cursor: 'pointer',
        // Old-school arcade blink: hard on/off, no fade. Starts after the title lands.
        animation: '$blink 1s steps(1) 0.5s infinite',
    },
    // Title drops in from 3x, overshoots slightly, and settles at its tilt.
    '@keyframes slam': {
        '0%': {transform: 'rotate(-8deg) scale(3)', opacity: 0},
        '100%': {transform: 'rotate(-8deg) scale(1)', opacity: 1},
    },
    '@keyframes blink': {
        '0%': {opacity: 1},
        '50%': {opacity: 0},
    },
};

export const useGameOverScreenStyles = createUseStyles(styles);
