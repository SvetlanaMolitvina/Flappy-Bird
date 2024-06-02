class Pipes {
    constructor({
        x,
        y,
        frames,
        spiteSheet,
        drawEngine,
        canvas,
        bottomLine,
        game,
    }) {
        this.x = x;
        this.y = y;
        this._index = 0.3;
        this._speed = 4;
        this._nextX = 0;
        this._canvas = canvas;
        this._frames = frames;
        this._frameIdx = 0;
        this._spriteSheet = spiteSheet;
        this._drawEngine = drawEngine;
        this._bottomLine = bottomLine;
        this._game = game;
        this._nextPipe = true;
    }

    draw() {
        this.update();

        this._drawEngine.drawImage({
            x: this._newX,
            y: this._upPipeY,
            spriteSheet: this._spriteSheet,
            image: this._frames[0],
            width: this._frames[0].width,
            height: this._frames[0].height,
        });

        this._drawEngine.drawImage({
            x: this._newX,
            y: this._downPipeY,
            spriteSheet: this._spriteSheet,
            image: this._frames[1],
            width: this._frames[1].width,
            height: this._frames[1].height,
        });

        this._drawEngine.drawImage({
            x: this._nextX,
            y: this._bottomLine.y,
            spriteSheet: this._spriteSheet,
            image: this._bottomLine.frames[0],
            width: this._bottomLine.frames[0].width,
            height: this._bottomLine.frames[0].height,
        });

        this._drawEngine.drawImage({
            x: this._newX,
            y: this._bottomLine.y,
            spriteSheet: this._spriteSheet,
            image: this._bottomLine.frames[0],
            width: this._bottomLine.frames[0].width,
            height: this._bottomLine.frames[0].height,
        });
    }

    update() {

        if (this._nextX > -2) {

            this.heightPipe();
            this._game.scoreCounter = true;
        }

        this._index += 0.3;
        this._nextX = -(
            (this._index * this._speed) %
            (this._game._canvas.width + 50)
        );
        this._newX = this._nextX + this._canvas.width;
        this._nextPipe = false;

        if (this._nextX  < -335) {
            this._nextPipe = true;
        }

        this._game.coords(
            this._upPipeY + this._frames[0].height,
            this._downPipeY,
            this._nextX
        );
    }

    heightPipe() {
        this._upPipeY = Math.floor(Math.random() * (-50 - -200) + -200);
        this._downPipeY =
            this._game._config.bird.height * 5 +
            this._upPipeY +
            this._frames[0].height;
    }
}