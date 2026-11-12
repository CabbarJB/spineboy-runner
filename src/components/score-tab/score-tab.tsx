import {useScoreTabStyles} from "./score-tab.style.ts";

type ScoreTabProps = {
    distance: number;
    coins: number;
};

// Zero-padded like an arcade counter: 42 -> "000042".
const pad = (n: number, digits: number) => String(Math.floor(n)).padStart(digits, "0");

const ScoreTab = ({distance, coins}: ScoreTabProps) => {
    const {wrapper, label, value} = useScoreTabStyles();

    return <div className={wrapper}>
        <span className={label}>DISTANCE</span>
        <span className={value}>{pad(distance, 6)}</span>
        <span className={label}>COINS</span>
        <span className={value}>{pad(coins, 3)}</span>
    </div>;
}

export default ScoreTab;
