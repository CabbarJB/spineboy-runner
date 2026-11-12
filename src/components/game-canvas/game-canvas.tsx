import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Game, GameStates} from "../../game/game/game.ts";
import {useGameCanvasStyles} from "./game-canvas.style.ts";
import StartScreen from "../start-screen/start-screen.tsx";
import GameOverScreen from "../game-over-screen/game-over-screen.tsx";
import type {GameState} from "../../game/game/game.types.ts";
import ScoreTab from "../score-tab/score-tab.tsx";

export function GameCanvas() {
    const {canvas} = useGameCanvasStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Game | null>(null);

    const [gameState, setGameState] = useState<GameState>("menu");
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    useEffect(() => {
        const game = new Game({
            onStateChange: setGameState,
            onDistanceChange: setScore,
            onCoinsChange: setCoins,
        });
        gameRef.current = game;
        game.initialize(containerRef.current!);
        return () => {
            game.destroy();
            gameRef.current = null;
        };
    }, []);

    const onStart = useCallback(() => {
        gameRef.current?.start();
    }, []);

    const onRestart = useCallback(()=>{
        gameRef.current?.restart();
    }, [])


    const visibleScreen = useMemo(()=>{
        switch (gameState){
            case GameStates.menu:
                return <StartScreen onStart={onStart}/>
            case GameStates.playing:
                return null
            case GameStates.gameOver:
                return <GameOverScreen onRestart={onRestart}/>
            default:
                return null;
        }
    }, [gameState, onStart]);
    useEffect(() => {
        console.log(gameState)
        console.log(visibleScreen);
    }, [gameState, visibleScreen]);
    return <div ref={containerRef} className={canvas}>
        <ScoreTab distance={score} coins={coins}/>
        {visibleScreen}
    </div>;
}