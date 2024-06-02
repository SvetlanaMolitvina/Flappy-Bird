class GameOver {
    constructor({
        x,
        y,
        frames,
        tableScore,
        tableScoreNumber,
        restart,
        spiteSheet,
        drawEngine,
        game,
    }) {
        this._x = x;
        this._y = y;

        this._frames = frames;
        this._tableScore = tableScore;
        this._tableScoreNumber = tableScoreNumber;
        this._restart = restart;
        this._frameIdx = 0;

        this._spriteSheet = spiteSheet;
        this._drawEngine = drawEngine;
        this._game = game;
    }
    draw() {
        this._drawEngine.drawImage({
            x: this._x,
            y: this._y,
            spriteSheet: this._spriteSheet,
            image: this._frames[0],
            width: this._frames[0].width,
            height: this._frames[0].height,
        });

        this._drawEngine.drawImage({
            x: 30,
            y: 150,
            spriteSheet: this._spriteSheet,
            image: this._tableScore[0],
            width: this._tableScore[0].width,
            height: this._tableScore[0].height,
        });

        this._drawEngine.drawImage({
            x: this._restart.x,
            y: this._restart.y,
            spriteSheet: this._spriteSheet,
            image: this._restart.frames[0],
            width: this._restart.frames[0].width,
            height: this._restart.frames[0].height,
        });
    }
    restart() {
        location.reload();
    }

    restartButton() {
        this.coordsCanvas = this._game._canvas.getBoundingClientRect();
        this._leftCoords =
        this.coordsCanvas.left +
        this.coordsCanvas.width / 2 -
        this._restart.frames[0].width / 2;
        this._rightCoords =
        this.coordsCanvas.left +
        this.coordsCanvas.width / 2 +
        this._restart.frames[0].width / 2;
        this._topCoords = this.coordsCanvas.top + this._restart.y;
        this._bottomCoords =
        this.coordsCanvas.top +
        this._restart.y +
        this._restart.frames[0].height;

        document.addEventListener("click", (e) => {
            if (
                e.pageX > this._leftCoords &&
                e.pageX < this._rightCoords &&
                e.pageY > this._topCoords &&
                e.pageY < this._bottomCoords &&
                !this._game._playing
            ) {
                this.restart();
            }
        });
    }
}