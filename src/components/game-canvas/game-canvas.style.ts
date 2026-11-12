import {createUseStyles} from 'react-jss';

const styles = {
    canvas: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        '& canvas': {
            // Canvas is inline by default and sits on the text baseline,
            // which adds a few px below it and causes scrollbars.
            display: 'block',
        },
        position: 'relative',
    }
};

export const useGameCanvasStyles = createUseStyles(styles);
