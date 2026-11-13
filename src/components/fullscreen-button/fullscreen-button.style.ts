import {createUseStyles} from 'react-jss';

const styles = {
    button: {
        position: 'absolute',
        top: 'clamp(8px, 2.5vh, 24px)',
        left: 'clamp(8px, 2.5vh, 24px)',
        // Above the rotate overlay too: on Android, going fullscreen from
        // portrait locks the phone to landscape, which clears that overlay.
        zIndex: 4,
        width: 'clamp(36px, 6vh, 56px)',
        height: 'clamp(36px, 6vh, 56px)',
        padding: 'clamp(6px, 1vh, 10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '4px solid #ffb000',
        boxShadow: '4px 4px 0 #c2410c',
        color: '#ffb000',
        cursor: 'pointer',
        touchAction: 'manipulation',
        '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '2px 2px 0 #c2410c',
        },
        '& svg': {
            width: '100%',
            height: '100%',
        },
    },
};

export const useFullscreenButtonStyles = createUseStyles(styles);
