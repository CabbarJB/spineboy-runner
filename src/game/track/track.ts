import {type Application, FillGradient, Graphics, type Texture, TilingSprite} from "pixi.js";

const TILE_HEIGHT = 200;
const HEIGHT_RATIO = 0.25;
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 200;

// Track takes a share of the screen height, so short (e.g. landscape phone)
// screens keep most of their space for the action.
export function getTrackHeight(screenHeight: number) {
    return Math.round(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, screenHeight * HEIGHT_RATIO)));
}

// Y of the track surface, where the player and mobs stand.
export function getGroundY(screenHeight: number) {
    return screenHeight - getTrackHeight(screenHeight);
}

export class Track {
    gradient = new FillGradient({
        type: 'linear',
        colorStops: [
            {offset: 0, color: '#4F4E4E'},
            {offset: 1, color: '#3F3F3F'},
        ]
    });
    // view = new Graphics().rect(0, 0, 10, 20).fill(this.gradient);
    private tile = new Graphics().rect(0, 0, 128, TILE_HEIGHT).fill(this.gradient);
    private readonly texture: Texture;
    public view: TilingSprite;

    constructor({screen, renderer }: Application) {

        // this.tile.rect(0, 1, 128, 3).fill('#000');
        // this.tile.circle(30, 18, 3).fill(0x666666);
        // this.tile.rect(80, 25, 14, 2).fill(0x777777);
        // this.tile.rect(50, 15, 14, 2).fill(0x777777);
        this.texture = renderer.generateTexture(this.tile);
        this.view = new TilingSprite({texture: this.texture});
        this.resize(screen.width, screen.height);
        this.tile.destroy();
    }

    resize(width: number, height: number) {
        const trackHeight = getTrackHeight(height);
        this.view.width = width;
        this.view.height = trackHeight;
        // Squash the gradient tile vertically so it still spans the whole track.
        this.view.tileScale.y = trackHeight / TILE_HEIGHT;
        this.view.y = height - trackHeight;
    }

    update (speed: number, dt: number) {
        this.view.tilePosition.x -= speed * dt
    }

}