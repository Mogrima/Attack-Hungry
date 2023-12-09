export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 13;
        this.speed = 3;
        this.markedForDeletion = false;
    }
  
    update() {
        this.y -= this.speed;
        if (this.y < this.game.height * 0.1) this.markedForDeletion = true;
    }
  
    draw(context) {
        context.fillStyle = '#120a8f';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}