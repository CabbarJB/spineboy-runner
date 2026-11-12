import {useStartScreenStyles} from "./start-screen.style.ts";

const StartScreen = ({onStart}: { onStart: () => void }) => {
    const {wrapper, start} = useStartScreenStyles();

    return <div className={wrapper}>
        <span onClick={onStart} className={start}>START</span>
    </div>;
}

export default StartScreen;