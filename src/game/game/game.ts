import {Application, Container} from "pixi.js";
import {Player,} from "../player/player.ts";
import {getGroundY, Track} from "../track/track.ts";
import {Obstacle} from "../obstacle/obstacle.ts";
import {isColliding} from "../functions/collision.ts";
import type {GameEvents, GameState} from "./game.types.ts";
import {loadAssets} from "../game-assets/game-assets.ts";
import {Background} from "../background/background.ts";
import {randomBetween} from "../../helpers/helpers.ts";

export enum GameStates {
    menu = "menu",
    playing = "playing",
    gameOver = "gameOver",
}


export class Game {
    private app = new Application();
    private initialized = false;
    private destroyed = false;
    // True while the device is in portrait and must be rotated first.
    private blocked = false;

    private state: GameState = "menu";
    private events: GameEvents;
    private distance: number = 0;
    // private coins: number = 0;

    private bgLayer = new Container();
    private worldLayer = new Container();
    private player!: Player;
    private track!: Track;
    private background!: Background;
    private readonly OBSTACLE_SPEED = 10;
    private obstacles: Obstacle[] = [];
    private spawnTimer = 0;
    private nextSpawn = 100;

    constructor(events: GameEvents) {
        this.events = events;

    }

    async initialize(container: HTMLElement) {

        await this.app.init({resizeTo: container});
        await loadAssets();
        if (this.destroyed) {
            this.app.destroy(true, {children: true});
            return;
        }

        if (import.meta.env.DEV) {
            (globalThis as any).__PIXI_APP__ = this.app;
            (globalThis as any).__PIXI_DEVTOOLS__ = {app: this.app};
            (globalThis as any).game = this;
        }

        // initDevtools({app: this.app}).then((r)=>{
        //     console.log(r)
        // })
        container.appendChild(this.app.canvas);

        this.player = new Player(getGroundY(this.app.screen.height))
        this.track = new Track(this.app);
        this.background = new Background(this.app);

        this.bgLayer.addChild(this.background.view);
        this.worldLayer.addChild(this.player.view);
        this.worldLayer.addChild(this.track.view)
        this.app.stage.addChild(this.bgLayer, this.worldLayer);


        this.app.stage.eventMode = "static";
        this.app.stage.hitArea = this.app.screen;

        const changeGameState = ()=> {
            if (this.blocked || !this.initialized) return;

            switch (this.state) {
                case GameStates.menu:
                    this.start();
                    break;
                case GameStates.playing:
                    this.player.jump();
                    break;
                case GameStates.gameOver:
                    this.restart();
                    break;
            }
        }
        const onPointerDown = () => {
            changeGameState()
        }

        const onKeyDown = (e: KeyboardEvent) => {
            console.log(e.code)
            if (e.code === 'KeyP') {
                this.app.ticker[this.app.ticker.started ? 'stop' : 'start']()
                return;
            }
            if (e.code === 'Space'){
                changeGameState()
            }
        }


        this.app.stage.on("pointerdown", onPointerDown);

        window.addEventListener('keydown', onKeyDown);

        // resizeTo resizes the canvas, but every object positions itself from
        // the screen size it was created with, so re-lay them out.
        this.app.renderer.on("resize", this.onResize);

        this.app.ticker.add((ticker) => {
            this.update(ticker.deltaTime)
        });

        // Only now are player/track/background built, so input and start() are safe.
        this.initialized = true;
        if (this.blocked) this.app.ticker.stop();
        this.events.onReady();
    }

    // Freeze the game (and ignore input) while the rotate overlay is up.
    // Can be called before initialize() finishes; it's applied at the end.
    setBlocked(blocked: boolean) {
        this.blocked = blocked;
        if (!this.initialized) return;
        if (blocked) this.app.ticker.stop();
        else this.app.ticker.start();
    }

    private onResize = (width: number, height: number) => {
        this.background.resize(width, height);
        this.track.resize(width, height);
        this.player.resize(getGroundY(height));
        this.obstacles.forEach(obstacle => obstacle.resize(height));
    };

    spawnObstacle() {
        const obstacle = new Obstacle(this.app.screen);
        this.app.stage.addChild(obstacle.view);
        this.obstacles.push(obstacle);
    }

    update(dt: number) {
        if (this.state !== "playing") return;

        this.player.update(dt);
        this.track.update(this.OBSTACLE_SPEED, dt);
        this.background.update(this.OBSTACLE_SPEED, dt);

        if (this.spawnTimer < this.nextSpawn) {
            this.spawnTimer += dt;
        } else {
            this.spawnObstacle();
            this.spawnTimer = 0;
            this.nextSpawn = randomBetween(50, 120);
        }

        this.obstacles.forEach(obstacle => {
            obstacle.update(dt, this.OBSTACLE_SPEED)
            if (obstacle.isOffScreen) {
                obstacle.view.destroy();
                this.obstacles.shift();
            }
        })

        if (this.obstacles.some(o => isColliding(this.player.hitbox, o.hitbox))) {
            console.log(this.obstacles[0].view.skeleton.data.animations);
            this.obstacles[0].view.state.setAnimation(1, "attack", false);
            this.gameOver();

            console.log('game over')
        }

        this.setDistance(dt);
    }

    setState(state: GameState) {
        this.state = state;
        switch (state) {
            case GameStates.playing:
                this.player.run();
                break;
            case GameStates.gameOver:
                this.player.die();
                break;
            case GameStates.menu:
                this.player.idle();
                break;
            default:
                break;
        }
        this.events.onStateChange(state);
    }

    setDistance(dt: number) {
        this.distance += dt
        this.events.onDistanceChange(Math.floor(this.distance / 5));
    }

    // setCoins(coins: number) {
    //     this.coins = coins;
    // }

    start() {
        if (!this.initialized || this.state !== GameStates.menu) return;
        this.setState(GameStates.playing)
    }

    restart() {
        if (!this.initialized || this.state !== GameStates.gameOver) return;
        this.resetGame();
        this.setState(GameStates.playing);
    }

    resetGame() {
        this.obstacles.forEach(obstacle => {
            obstacle.view.destroy();
        });
        this.obstacles = [];
        this.distance = -1;
        // this.coins = 0;
        this.spawnTimer = 0;
        this.nextSpawn = 100;
    }

    gameOver() {
        this.setState(GameStates.gameOver)
    }

    destroy() {
        this.destroyed = true;
        if (import.meta.env.DEV) {
            const g = globalThis as any;
            if (g.__PIXI_APP__ === this.app) delete g.__PIXI_APP__;
            if (g.__PIXI_DEVTOOLS__?.app === this.app) delete g.__PIXI_DEVTOOLS__;
            if (g.game === this) delete g.game;
        }

        if (this.initialized) this.app.destroy(true, {children: true});

    }


}
