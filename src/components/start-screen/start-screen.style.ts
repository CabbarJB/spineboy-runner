import {createUseStyles} from 'react-jss';

const styles = {
    wrapper: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
        zIndex: 1,
        color: '#fff',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backdropFilter: 'blur(8px)',
        // WebkitBackdropFilter: 'blur(8px)',
    },
    start: {
        fontSize: '90px',
        // Transforms don't apply to plain inline elements.
        display: 'inline-block',
        color: '#ffb000',
        textShadow: '6px 6px 0 #c2410c',
        transform: 'rotate(-8deg)',
        animation: '$heartbeat 3s ease-in-out infinite',
        cursor: 'pointer',
    },
    // Double "lub-dub" pulse, then a rest. The tilt is repeated in every frame
    // because the animated transform replaces the static one.
    '@keyframes heartbeat': {
        '0%': {transform: 'rotate(-8deg) scale(1)'},
        // '14%': {transform: 'rotate(-8deg) scale(1.1)'},
        '25%': {transform: 'rotate(-8deg) scale(1.1)'},
        '50%': {transform: 'rotate(-8deg) scale(1)'},
        '75%': {transform: 'rotate(-8deg) scale(1.1)'},
        '100%': {transform: 'rotate(-8deg) scale(1)'},
    },
};

export const useStartScreenStyles = createUseStyles(styles);
