import {useStartScreenStyles} from "./start-screen.style.ts";

const StartScreen = ({onStart, loading}: { onStart: () => void, loading: boolean }) => {
    const {wrapper, start, loadingText} = useStartScreenStyles();

    return <div className={wrapper}>
        {loading
            ? <span className={loadingText}>LOADING...</span>
            : <span onClick={onStart} className={start}>START</span>}
    </div>;
}

export default StartScreen;
