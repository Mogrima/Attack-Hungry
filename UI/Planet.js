export class Planet {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('bg_objects');
        this.spriteSize = 64;
        this.size;
        this.x;
        this.y;
        this.frameX;
        this.frameY;
        this.speedY;
        this.free = true;
    }

    resize() {
        this.size = this.spriteSize * this.game.ratio;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * (this.game.height * 2);
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
        this.speedY = (Math.random() * - 2 - 1) * this.game.ratio;
    }

    update() {
        this.y -= this.speedY;
        if (this.y > this.game.height) {
            this.x = this.x = Math.random() * this.game.width;;
            this.y = -this.game.height;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
            this.spriteSize, this.spriteSize,
             this.x, this.y, this.size, this.size);
    }
}