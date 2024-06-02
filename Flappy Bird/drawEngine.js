class DrawEngine {
    constructor({ canvas }) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
    }
    drawImage({ x, y, spriteSheet, image, width, height }) {
        this._ctx.drawImage(
            spriteSheet,

            image.x,
            image.y,
            image.width,
            image.height,

            x,
            y,
            width,
            height
        );
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}