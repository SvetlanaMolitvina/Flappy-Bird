class Background {
    constructor({ x,y, image, spiteSheet, drawEngine, game }) {
        
        this._x = x;
        this._y = y;
        this._image = image

        this._spriteSheet = spiteSheet;
        this._drawEngine = drawEngine;

        this._game = game
    }

    draw() {
        this._drawEngine.drawImage({
            x: this._x,
            y: this._y,
            spriteSheet: this._spriteSheet,
            image: this._image[0],
            width: this._image[0].width,
            height: this._image[0].height
        });
    }
}