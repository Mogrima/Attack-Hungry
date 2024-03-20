export class Projectile {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.spriteWidth = 10;
        this.spriteHeight = 68;
        this.width;
        this.height;
        this.speed;

        this.image = document.getElementById('projectiles');
        this.frameY = 9;
        this.frameX = 0;
        this.maxFrame = 9;
        this.free = true;
    }

    start(x, y) {
        this.free = false;
        this.x = x;
        this.y = y;
    }

    reset() {
        this.free = true;
    }

    resize() {
        this.free = true;
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.speed = 3 * this.game.ratio;
    }

    update() {
        if (!this.free) {
            this.y -= this.speed;
            if (this.y < this.game.height * 0.1) this.reset();

            if (this.frameY > 0) {
                this.frameY--;
            } else {
                this.frameY = this.maxFrame;
            }
        }
    }

    draw() {
        if (!this.free) {
           
            // this.game.ctx.fillStyle = '#120a8f';
            // this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.game.ctx.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
                this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }
}