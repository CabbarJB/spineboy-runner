import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Game, GameStates} from "../../game/game/game.ts";
import {useGameCanvasStyles} from "./game-canvas.style.ts";
import StartScreen from "../start-screen/start-screen.tsx";
import GameOverScreen from "../game-over-screen/game-over-screen.tsx";
import type {GameState} from "../../game/game/game.types.ts";
import ScoreTab from "../score-tab/score-tab.tsx";
import RotateScreen from "../rotate-screen/rotate-screen.tsx";
import {needsRotation, useNeedsRotation} from "../../hooks/use-needs-rotation.ts";
import FullscreenButton from "../fullscreen-button/fullscreen-button.tsx";
import {fullscreenSupported, useFullscreen} from "../../hooks/use-fullscreen.ts";

export function GameCanvas() {
    const {canvas} = useGameCanvasStyles();
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Game | null>(null);

    const [gameState, setGameState] = useState<GameState>("menu");
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const [ready, setReady] = useState(false);
    const isPortrait = useNeedsRotation();
    const {isFullscreen, toggle: toggleFullscreen} = useFullscreen(containerRef);

    useEffect(() => {
        gameRef.current?.setBlocked(isPortrait);
    }, [isPortrait]);

    useEffect(() => {
        const game = new Game({
            onReady: () => setReady(true),
            onStateChange: setGameState,
            onDistanceChange: setScore,
            onCoinsChange: setCoins,
        });
        gameRef.current = game;
        // Read the orientation directly: this effect runs once, so the
        // hook value captured here could go stale.
        game.setBlocked(needsRotation());
        game.initialize(containerRef.current!);
        return () => {
            game.destroy();
            gameRef.current = null;
            setReady(false);
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
                return <StartScreen onStart={onStart} loading={!ready}/>
            case GameStates.playing:
                return null
            case GameStates.gameOver:
                return <GameOverScreen onRestart={onRestart}/>
            default:
                return null;
        }
    }, [gameState, onStart, onRestart, ready]);

    return <div ref={containerRef} className={canvas}>
        <ScoreTab distance={score} coins={coins}/>
        {visibleScreen}
        {isPortrait && <RotateScreen/>}
        {fullscreenSupported &&
            <FullscreenButton isFullscreen={isFullscreen} onToggle={toggleFullscreen}/>}
    </div>;
}
