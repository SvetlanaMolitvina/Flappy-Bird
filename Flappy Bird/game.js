class Game {
  constructor() {
      this._config = new Config();
      this._canvas = document.getElementById("canvas");
      this._ctx = this._canvas.getContext("2d");
      this._canvas.width = this._config.canvas.width;
      this._canvas.height = this._config.canvas.height;
      this._spriteSheet;
      this._resourceLoader = new ResourceLoader();
      this._drawEngine = new DrawEngine({ canvas: this._canvas });
      this._playing = false;
      this.scoreCounter = true;
      this.oneStart = true;
  }

  async prepare() {
      this._spriteSheet = await this._resourceLoader.load({
          type: RESOURCE_TYPE.IMAGE,
          width: this._config.spritesheet.width,
          height: this._config.spritesheet.height,
          src: this._config.spritesheet.src,
      });
  }

  reset() {
      this._score = 0;
      this._background = new Background({
          x: this._config.background.x,
          y: this._config.background.y,
          image: this._config.background.frames,
          spiteSheet: this._spriteSheet,
          drawEngine: this._drawEngine,
          game: this,
      });
      this._pipes = new Pipes({
          frames: this._config.pipes.frames,
          spiteSheet: this._spriteSheet,
          drawEngine: this._drawEngine,
          canvas: this._config.canvas,
          bottomLine: this._config.bottomLine,
          game: this,
      });

      this._scoreTable = new ScoreTable({
          x: this._config.score.x,
          y: this._config.score.y,
          numbers: this._config.score.numbers,
          spiteSheet: this._spriteSheet,
          drawEngine: this._drawEngine,
          score: this._score,
          game: this,
      });

      this._bird = new Bird({
          x: this._config.bird.x,
          y: this._config.bird.y,
          width: this._config.bird.width,
          height: this._config.bird.height,
          frames: this._config.bird.frames,
          spiteSheet: this._spriteSheet,
          birdDrawEngine: this._drawEngine,
          game: this,
          gravity: this._config.gravity,
          flapSpeed: this._config.bird.flapSpeed,
      });
  }

  update(delta) {
      this._bird.updateWings(delta);
      this._bird.update(delta);
  }

  draw() {
      this._background.draw();
      this._pipes.draw();
      this._bird.draw();
      this._scoreTable.draw();
  }
  _loop() {
      const now = Date.now();
      const delta = now - this._lastUpdate;
      this.update(delta / 185.0);
      this.button(delta / 185.0);

      if (this._playing) {
          this._drawEngine.clear();
          this.draw();

          this._lastUpdate = now;
          requestAnimationFrame(this._loop.bind(this));
      } else {
          this._gameOver = new GameOver({
              x: this._config.gameOver.x,
              y: this._config.gameOver.y,
              frames: this._config.gameOver.frames,
              tableScore: this._config.score.tableScore,
              tableScoreNumber: this._config.score.tableScoreNumber,
              restart: this._config.restart,
              spiteSheet: this._spriteSheet,
              drawEngine: this._drawEngine,
              game: this,
          });
          this._gameOver.restartButton();

          this._gameOver.draw();
          this._scoreTable.drawScoreGameOver();

      }
  }

  start() {
      this._playing = true;
      this._lastUpdate = Date.now();
      this.reset();
      this._loop();
  }

  button() {
      document.addEventListener("click", () => {
          if (!this.oneStart) {
              this._bird.flap();

          }
          if (!this._playing && this.oneStart) {
              this.oneStart = false;
              this.start();

          }
  });

          document.addEventListener("touch", () => {

              if (!this.oneStart) {
                  this._bird.flap();
              }
              if (!this._playing && this.oneStart) {
                  this.oneStart = false;
                  this.start();
              }
          });
      
  }

  click(){
      
  }
  async prelaunch() {
      await this.prepare();
      this._background = new Background({
          x: this._config.background.x,
          y: this._config.background.y,
          image: this._config.background.frames,
          spiteSheet: this._spriteSheet,
          drawEngine: this._drawEngine,
          game: this,
      });

      this._prelaunch = new Prelaunch({
          x: this._config.prelaunch.x,
          y: this._config.prelaunch.y,
          image: this._config.prelaunch.frames,
          spiteSheet: this._spriteSheet,
          drawEngine: this._drawEngine,
          game: this,
      });


      this._background.draw();
      this._prelaunch.draw(); 
      this.button();
  }

  gameOver() {
      this._playing = false;
  }

  coordsBird(x, y) {
      (this.coordBirdX = x), (this.coordBirdY = y);
  }

  coords(upPipe, downPipe, nextX) {

      if (
          -nextX > this._config.bird.x + this._config.bird.width &&
          this.scoreCounter
      ) {            
          this._score += 1;
          this._scoreTable.update(this._score);
          this._scoreTable.localMemory(this._score);
          this.scoreCounter = false;
      } 

      if (
          -nextX > this.coordBirdX &&
          -nextX - 55 < this.coordBirdX + this._config.bird.width
      ) {
          if (this.coordBirdY < upPipe) {
              this.gameOver();
          }

          if (this.coordBirdY + this._config.bird.height > downPipe) {
              this.gameOver();
          }
      } else {
      }
  }
}

let game = new Game();
game.prelaunch();