import {type Application, FillGradient, Graphics, type Texture, TilingSprite} from "pixi.js";

export class Track {
    gradient = new FillGradient({
        type: 'linear',
        colorStops: [
            {offset: 0, color: '#4F4E4E'},
            {offset: 1, color: '#3F3F3F'},
        ]
    });
    // view = new Graphics().rect(0, 0, 10, 20).fill(this.gradient);
    private tile = new Graphics().rect(0, 0, 128, 200).fill(this.gradient);
    private readonly texture: Texture;
    public view: TilingSprite;

    constructor({screen, renderer }: Application) {

        // this.tile.rect(0, 1, 128, 3).fill('#000');
        // this.tile.circle(30, 18, 3).fill(0x666666);
        // this.tile.rect(80, 25, 14, 2).fill(0x777777);
        // this.tile.rect(50, 15, 14, 2).fill(0x777777);
        this.texture = renderer.generateTexture(this.tile);
        this.view = new TilingSprite({
            texture: this.texture,
            width: screen.width,
            height: 200,
        });
        this.view.width = screen.width;
        this.view.y = screen.height - this.view.height;
        this.tile.destroy();
    }

    update (speed: number, dt: number) {
        this.view.tilePosition.x -= speed * dt
    }

}