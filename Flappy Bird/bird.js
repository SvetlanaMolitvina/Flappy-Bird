class Bird {
  constructor({
      x,
      y,
      width,
      height,
      frames,
      spiteSheet,
      birdDrawEngine,
      game,
      gravity,
      flapSpeed,
  }) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = 0;
      this.falling = false;

      this._gravity = gravity;
      this._frames = frames;
      this._frameIdx = 0;
      this._spriteSheet = spiteSheet;
      this._drawEngine = birdDrawEngine;
      this._game = game;
      this._flapSpeed = flapSpeed;
  }

  draw() {

      this._drawEngine.drawImage({
          spriteSheet: this._spriteSheet,
          image: this._frames[this._frameIdx],
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
      });
      this._game.coordsBird(this.x,this.y)
  }

  update(delta) {
      this.speed += this._gravity * delta;

      this.y += this.speed * delta;

      if (this.y < 0) {
          this.y = 0;
      }

      if (this.y >= this._game._canvas.height - this.height) {
          this._game.gameOver();
      }
  }

  updateWings(delta) {
      if (this.speed <= 0) {
          this._frameIdx = (this._frameIdx + Math.ceil(delta)) % 4;
      } else {
          this._frameIdx = 0;
      }
  }

  flap() {
      this.speed = -this._flapSpeed;
  }
}