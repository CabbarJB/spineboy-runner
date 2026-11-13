import {useRotateScreenStyles} from "./rotate-screen.style.ts";

const RotateScreen = () => {
    const {wrapper, phone, title, hint} = useRotateScreenStyles();

    return <div className={wrapper}>
        <div className={phone}/>
        <span className={title}>ROTATE YOUR PHONE</span>
        <span className={hint}>This game is played in landscape mode</span>
    </div>;
}

export default RotateScreen;
