export class CelestialObjects {
    constructor(game) {
        this.game = game;
        this.width;
        this.height;
        this.x;
        this.y;
        this.frameX;
        this.frameY = 0;
        this.speedY;
        this.free = true;
    }

    resize() {
        this.width = (this.spriteWidth * this.sizeModifier) * this.game.ratio;
        this.height = (this.spriteHeight * this.sizeModifier) * this.game.ratio;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * (this.game.height * 2);
        this.frameX = Math.floor(Math.random() * 3);
        this.speedY = (Math.random() * - 0.2 - 0.2) * this.game.ratio;
    }

    update() {
        this.y -= this.speedY;
        if (this.y > this.game.height) {
            this.x = this.x = Math.random() * this.game.width;;
            this.y = -this.game.height;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
             this.x, this.y, this.width, this.height);
    }
}