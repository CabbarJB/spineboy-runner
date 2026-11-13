import {createUseStyles} from 'react-jss';

const styles = {
    wrapper: {
        position: 'absolute',
        // Sizes shrink with screen height so the HUD stays small on phones.
        top: 'clamp(8px, 2.5vh, 24px)',
        right: 'clamp(8px, 2.5vh, 24px)',
        // Above the start / game-over overlays.
        zIndex: 2,
        // Two rows: label on the left, value right-aligned on the right.
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        columnGap: 'clamp(10px, 2.5vh, 24px)',
        rowGap: 'clamp(6px, 1.6vh, 16px)',
        padding: 'clamp(6px, 1.6vh, 16px) clamp(8px, 2vh, 20px)',
        fontFamily: '"Press Start 2P", system-ui, sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '4px solid #ffb000',
        boxShadow: '6px 6px 0 #c2410c',
        // HUD only: let clicks/taps fall through to the game canvas (jump).
        pointerEvents: 'none',
        userSelect: 'none',
    },
    label: {
        fontSize: 'clamp(8px, 1.5vh, 14px)',
        color: '#ffb000',
        textShadow: '2px 2px 0 #c2410c',
    },
    value: {
        fontSize: 'clamp(14px, 3vh, 28px)',
        textAlign: 'right',
        color: '#fff',
        textShadow: '3px 3px 0 #c2410c',
        // Pixel font is fixed-width per glyph; this keeps digits from jittering.
        fontVariantNumeric: 'tabular-nums',
    },
};

export const useScoreTabStyles = createUseStyles(styles);
