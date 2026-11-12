import {createUseStyles} from 'react-jss';

const styles = {
    wrapper: {
        position: 'absolute',
        top: '24px',
        right: '24px',
        // Above the start / game-over overlays.
        zIndex: 2,
        // Two rows: label on the left, value right-aligned on the right.
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        columnGap: '24px',
        rowGap: '16px',
        padding: '16px 20px',
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '4px solid #ffb000',
        boxShadow: '6px 6px 0 #c2410c',
        // HUD only: let clicks/taps fall through to the game canvas (jump).
        pointerEvents: 'none',
        userSelect: 'none',
    },
    label: {
        fontSize: '14px',
        color: '#ffb000',
        textShadow: '2px 2px 0 #c2410c',
    },
    value: {
        fontSize: '28px',
        textAlign: 'right',
        color: '#fff',
        textShadow: '3px 3px 0 #c2410c',
        // Pixel font is fixed-width per glyph; this keeps digits from jittering.
        fontVariantNumeric: 'tabular-nums',
    },
};

export const useScoreTabStyles = createUseStyles(styles);
