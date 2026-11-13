import {type Application, Texture, TilingSprite} from "pixi.js";

// How fast the background moves relative to the track. < 1 makes it feel
// further away, which is what sells the parallax.
const PARALLAX_FACTOR = 0.3;

export class Background {

    public view: TilingSprite;

    constructor({screen}: Application) {
        // The sprite itself covers the screen; the texture repeats inside it.
        this.view = new TilingSprite({texture: Texture.from('bgForest')});
        this.view.tilePosition.set(0, -100);
        this.resize(screen.width, screen.height);
    }

    resize(width: number, height: number) {
        this.view.width = width;
        this.view.height = height;
        // Scale the tile so one copy of the image is exactly screen-high,
        // then it repeats horizontally.
        this.view.tileScale.set(height / this.view.texture.height);
    }

    update(speed: number, dt: number) {
        this.view.tilePosition.x -= speed * dt * PARALLAX_FACTOR;
    }

}
