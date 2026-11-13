import {createUseStyles} from 'react-jss';

const styles = {
    wrapper: {
        position: 'absolute',
        inset: 0,
        // Above the score tab and start / game-over overlays.
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '24px',
        textAlign: 'center',
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        userSelect: 'none',
        // Swallow taps so they never reach the game canvas underneath.
        touchAction: 'none',
    },
    phone: {
        width: '60px',
        height: '100px',
        border: '6px solid #ffb000',
        borderRadius: '10px',
        boxShadow: '6px 6px 0 #c2410c',
        animation: '$rotate 2s ease-in-out infinite',
    },
    title: {
        fontSize: '20px',
        lineHeight: 1.6,
        color: '#ffb000',
        textShadow: '3px 3px 0 #c2410c',
    },
    hint: {
        fontSize: '12px',
        lineHeight: 1.8,
    },
    '@keyframes rotate': {
        '0%, 20%': {transform: 'rotate(0deg)'},
        '50%, 80%': {transform: 'rotate(-90deg)'},
        '100%': {transform: 'rotate(0deg)'},
    },
};

export const useRotateScreenStyles = createUseStyles(styles);
