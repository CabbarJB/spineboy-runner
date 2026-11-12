import {Application, Container} from "pixi.js";
import {Player,} from "../player/player.ts";
import {Track} from "../track/track.ts";
import {Obstacle} from "../obstacle/obstacle.ts";
import {isColliding} from "../functions/collision.ts";
import type {GameEvents, GameState} from "./game.types.ts";
import {loadAssets} from "../game-assets/game-assets.ts";
import {Background} from "../background/background.ts";

export enum GameStates {
    menu = "menu",
    playing = "playing",
    gameOver = "gameOver",
}

function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export class Game {
    private app = new Application();
    private initialized = false;
    private destroyed = false;

    private state: GameState = "menu";
    private events: GameEvents;
    private distance: number = 0;
    private coins: number = 0;

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
        this.initialized = true;
        container.appendChild(this.app.canvas);

        this.player = new Player(this.app.screen.height)
        this.track = new Track(this.app);
        this.background = new Background(this.app);

        this.bgLayer.addChild(this.background.view);
        this.worldLayer.addChild(this.player.view);
        this.worldLayer.addChild(this.track.view)
        this.app.stage.addChild(this.bgLayer, this.worldLayer);


        this.app.stage.eventMode = "static";
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on("pointerdown", () => {
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
        });

        this.app.ticker.add((ticker) => {
            this.update(ticker.deltaTime)
        });
    }

    spawnObstacle() {
        const obstacle = new Obstacle(this.app.screen);
        this.app.stage.addChild(obstacle.view);
        this.obstacles.push(obstacle);
    }

    update(dt: number) {
        if (this.state !== "playing") return;

        this.player.update(dt);
        this.track.update(this.OBSTACLE_SPEED ,dt);
        this.background.update(this.OBSTACLE_SPEED ,dt);

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

        if (this.obstacles.some(o => isColliding(this.player.hitbox, o.view))) {
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
        console.log(this.distance);
        this.events.onDistanceChange(Math.floor(this.distance / 5));
    }

    setCoins(coins: number) {
        this.coins = coins;
    }

    start() {
        if (this.state !== GameStates.menu) return;
        this.setState(GameStates.playing)
    }

    restart() {
        if (this.state !== GameStates.gameOver) return;
        this.resetGame();
        this.setState(GameStates.playing);
    }

    resetGame() {
        this.obstacles.forEach(obstacle => {
            obstacle.view.destroy();
        });
        this.obstacles = [];
        this.distance = -1;
        this.coins = 0;
        this.spawnTimer = 0;
        this.nextSpawn = 100;
    }

    gameOver() {
        // this.app.ticker.stop();
        // this.player.view.tint = 0x888888;
        this.setState(GameStates.gameOver)
    }

    destroy() {
        this.destroyed = true;
        if (this.initialized) this.app.destroy(true, {children: true});
    }


}