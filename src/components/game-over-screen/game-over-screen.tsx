import {useGameOverScreenStyles} from "./game-over-screen.style.ts";

const GameOverScreen = ({onRestart}: { onRestart: () => void }) => {
    const {wrapper, title, retry} = useGameOverScreenStyles();

    return <div className={wrapper}>
        <span className={title}>GAME OVER</span>
        <span className={retry} onClick={onRestart}>RETRY</span>
    </div>;
}

export default GameOverScreen;
