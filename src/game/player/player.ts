import {Container} from "pixi.js";
import {Spine} from "@esotericsoftware/spine-pixi-v8";
import type {Hitbox} from "../functions/collision.ts";

const GRAVITY = 1;
const JUMP_VELOCITY = -20;

const PHYSICS_AIR_TIME_SECONDS = (2 * Math.abs(JUMP_VELOCITY) / GRAVITY) / 60;
const JUMP_ANIM_AIR_TIME_SECONDS = 1.2;

export class Player {
    view = new Container();
    private spine = Spine.from({skeleton: "spineboyData", atlas: "spineboyAtlas", scale: 0.25});
    private frontFoot = this.spine.skeleton.findBone("front-foot")!;
    private rearFoot = this.spine.skeleton.findBone("rear-foot")!;

    private vy = 0;
    private startingPos = 0;
    private onGround = true;
    private jumping = false;
    private restFootY = 0;

    constructor(groundY: number) {
        this.view.addChild(this.spine);
        this.view.x = 250;
        this.startingPos = groundY - 200;
        this.view.y = groundY - 200;
        this.spine.state.data.defaultMix = 0.2;

        this.spine.afterUpdateWorldTransforms = () => {
            if (!this.jumping) {
                this.spine.y = 0;
                return;
            }
            this.spine.y = this.restFootY - this.lowestFootY();
        };

        this.idle();
    }

    get hitbox(): Hitbox {
        return {
            x: this.view.x - 25,       // centered on his feet
            y: this.view.y - 120,      // from his feet upward
            width: 50,
            height: 120,
        }
    }

    private lowestFootY() {
        return Math.max(this.frontFoot.worldY, this.rearFoot.worldY);
    }

    update(dt: number) {
        const nextPos = this.view.y + this.vy * dt;
        if (nextPos <= this.startingPos) {
            this.vy += GRAVITY * dt;
            this.view.y = nextPos;
        } else {
            this.view.y = this.startingPos;
            this.vy = 0;
            if (!this.onGround) {
                this.onGround = true;
                this.run();
            }
        }
    }

    idle() {
        this.jumping = false;
        this.spine.state.setAnimation(0, "idle", true);
    }

    run() {
        this.jumping = false;
        this.spine.state.setAnimation(0, "run", true);
    }

    jump() {
        if (!this.onGround)
            return;
        this.vy = JUMP_VELOCITY;
        this.onGround = false;

        this.restFootY = this.lowestFootY();
        this.jumping = true;
        const entry = this.spine.state.setAnimation(0, "jump", false);
        entry.timeScale = JUMP_ANIM_AIR_TIME_SECONDS / PHYSICS_AIR_TIME_SECONDS;
    }

    die() {
        this.jumping = false;
        this.spine.state.setAnimation(0, "death", false);
    }
}
