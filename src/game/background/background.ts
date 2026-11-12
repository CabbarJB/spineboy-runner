import {type Application, Texture, TilingSprite} from "pixi.js";

// How fast the background moves relative to the track. < 1 makes it feel
// further away, which is what sells the parallax.
const PARALLAX_FACTOR = 0.3;

export class Background {

    public view: TilingSprite;

    constructor({screen}: Application) {
        const texture = Texture.from('bgForest');

        // The sprite itself covers the screen; the texture repeats inside it.
        this.view = new TilingSprite({
            texture,
            width: screen.width,
            height: screen.height,
        });

        // Scale the tile so one copy of the image is exactly screen-high,
        // then it repeats horizontally.
        const scale = screen.height / texture.height;
        this.view.tileScale.set(scale);
        this.view.tilePosition.set(0, -100);
    }

    update(speed: number, dt: number) {
        this.view.tilePosition.x -= speed * dt * PARALLAX_FACTOR;
    }

}
