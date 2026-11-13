import {type Rectangle} from "pixi.js";
import type {Hitbox} from "../functions/collision.ts";
import {Spine} from "@esotericsoftware/spine-pixi-v8";
import {randomBetween} from "../../helpers/helpers.ts";
import {getGroundY} from "../track/track.ts";
export class Obstacle {
    view = Spine.from({ skeleton: "mobData", atlas: "mobAtlas", scale: 0.15 })
    private mobIndex = randomBetween(1,4);
    // Distance above the track surface at scale 1, fixed at spawn so resizes
    // don't make the mob drift as its animated bounds change.
    private readonly groundOffset: number;
    private scale = 1;

    constructor(screen: Rectangle, scale: number) {
        this.view.x = screen.width;
        this.groundOffset = this.view.height;
        this.resize(screen.height, scale);
        this.view.skeleton.setSkinByName(this.view.skeleton.data.skins[this.mobIndex].name);
        this.view.skeleton.setSlotsToSetupPose();
        this.view.state.setAnimation(1, "idle", true);
        console.log(this.view.skeleton.data.width, this.view.skeleton.data.height)
        this.view.label =  `mob-${crypto.randomUUID()}`
        console.log(this.view.skeleton.data.skins)
    }

    get hitbox(): Hitbox {
        const MOBS: {[key: number]: {w: number, h: number}} = {
            1: { w: 90, h: 100 },
            2: { w: 80, h: 90 },
            3: { w: 75, h: 85 },
            4: { w: 105, h: 100 },
        };
        const w = MOBS[this.mobIndex].w * this.scale, h = MOBS[this.mobIndex].h * this.scale;
        return {
            x: this.view.x - w / 2,
            y: this.view.y - h,
            width: w,
            height: h,
        };
    }

    resize(height: number, scale: number) {
        this.scale = scale;
        this.view.scale.set(scale);
        this.view.y = getGroundY(height) - this.groundOffset * scale;
    }

    update(dt: number, speed: number) {
        this.view.x -= speed * dt
    }

    get isOffScreen() {
        return this.view.x + this.view.width < 0;
    }

}
