import {Graphics, type Rectangle} from "pixi.js";
import type {Hitbox} from "../functions/collision.ts";

export class Obstacle {
    view = new Graphics().rect(0, 0, 30, 50).fill('#000');

    constructor(screen: Rectangle) {
        this.view.x = screen.width;
        this.view.y = screen.height - this.view.height - 200;
    }

    get hitbox(): Hitbox {
        return {
            x: this.view.x,       // centered on his feet
            y: this.view.y,      // from his feet upward
            width: 30,
            height: 50,
        }
    }
    update(dt: number, speed: number) {
        this.view.x -= speed * dt
    }

    get isOffScreen() {
        return this.view.x + this.view.width < 0;
    }

}