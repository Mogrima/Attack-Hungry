export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 68;
        this.speed = 3;
        this.markedForDeletion = false;

        this.image = document.getElementById('projectiles');
        this.frameY = 9;
        this.frameX = 0;
        this.maxFrame = 9;
    }
  
    update() {
        this.y -= this.speed;
        if (this.y < this.game.height * 0.1) this.markedForDeletion = true;

        if(this.frameY > 0) {
            this.frameY--;
        } else {
            this.frameY = this.maxFrame;
        }
    }
  
    draw(context) {
        // context.fillStyle = '#120a8f';
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}