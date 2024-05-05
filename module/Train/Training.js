export class Training {
    constructor(game) {
        this.game = game;
        this.widthRatio = this.game.width / this.game.baseWidth;
        this.fontFamily = 'Unica One';
        this.fontSize = Math.ceil(35 * this.widthRatio);
        this.spriteSize = 100;
        this.size;
        this.sizeModifier = 1.5;
        this.width = this.spriteSize;
        this.height = this.spriteSize;
        this.x;
        this.y;
        this.maxX;
        this.step;
    }

    resize() {
        this.size = (this.spriteSize * this.sizeModifier) * this.game.ratio;
        this.x = this.game.player.x + this.size;
        this.y = this.game.player.y - this.size * 0.5;
        this.step = 200 * this.game.ratio;
        this.maxX = this.x + this.step;
        
    }

    remove() {
      this.game.training.delete(this);
  }

    update() {
      this.x += 1;
      if (this.x > this.maxX) this.x -= this.step;

      if (this.game.keys.has('ArrowRight')) this.remove();

    }

    draw() {
      this.game.ctx.save();
      this.game.ctx.fillStyle = 'white';
      if (this.game.debug) this.game.ctx.strokeRect(this.x, this.y, this.size, this.size);
      this.game.ctx.font = this.fontSize + 'px ' + this.fontFamily;
      this.game.ctx.fillText('Press Arrow Right to move right', this.x, this.y - 5);
      this.game.ctx.restore();
      this.game.ctx.drawImage(this.image,
          0, 0, this.spriteSize, this.spriteSize, 
          this.x, this.y,
          this.size, this.size);
    }
}