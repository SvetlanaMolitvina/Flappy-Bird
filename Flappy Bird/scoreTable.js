class ScoreTable {
    constructor({ x, y, numbers, spiteSheet, drawEngine, game }) {
        this._x = x;
        this._y = y;

        this._numbers = numbers;
        this._frameIdx = 0;
        this._score = 0;
        this._spriteSheet = spiteSheet;
        this._drawEngine = drawEngine;
        this._game = game;
        this._arrScore = [this._score];
        this._arrBestScore = [];
    }
    draw() {

        this._drawEngine.drawImage({
            spriteSheet: this._spriteSheet,
            image: this._numbers[this._arrScore[0]],
            x: this._x,
            y: this._y,
            width: this._numbers[this._arrScore[0]].width,
            height: this._numbers[this._arrScore[0]].height,
        });
        if (this._score > 9) {
            this._drawEngine.drawImage({
                spriteSheet: this._spriteSheet,
                image: this._numbers[this._arrScore[1]],
                x: 157,
                y: this._y,
                width: this._numbers[this._arrScore[1]].width,
                height: this._numbers[this._arrScore[1]].height,
            });
        }
    }

    localMemory(score) {
        this._score = score;
        if (this._score > localStorage.getItem("score")) {
            localStorage.setItem("score", this._score);
        }
    }

    update(score) {
        this._arrScore = ("" + score).split("");
    }

    drawScoreGameOver() {
        if (localStorage.getItem("score") === null) {
            this._arrBestScore = this._arrScore;
        } else {
            this._arrBestScore = ("" + localStorage.getItem("score")).split("");
        }

        this._drawEngine.drawImage({
            x: 210,
            y: 187,
            spriteSheet: this._spriteSheet,
            image: this._numbers[this._arrScore[0]],
            width: 12,
            height: 18,
        });
        if (this._score > 9) {
            this._drawEngine.drawImage({
                x: 220,
                y: 187,
                spriteSheet: this._spriteSheet,
                image: this._numbers[this._arrScore[1]],
                width: 12,
                height: 18,
            });
        }

        this._drawEngine.drawImage({
            x: 210,
            y: 230,
            spriteSheet: this._spriteSheet,
            image: this._numbers[this._arrBestScore[0]],
            width: 12,
            height: 18,
        });
        if (this._arrBestScore[1]) {
            this._drawEngine.drawImage({
                x: 220,
                y: 230,
                spriteSheet: this._spriteSheet,
                image: this._numbers[this._arrBestScore[1]],
                width: 12,
                height: 18,
            });
        }
    }
}