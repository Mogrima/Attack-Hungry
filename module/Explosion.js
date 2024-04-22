export class Explosion {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.image = document.getElementById('explosions');
        this.frameX;
        this.frameY;
        this.maxFrame = 5;
        this.spriteSize = 80;
        this.size = (this.spriteSize * 1.5) * this.game.ratio;
        this.width = this.size;
        this.height = this.size;
        this.free = true;
    }

    start(x, y) {
        this.free = false;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
    }

    reset() {
        this.free = true;
    }

    update() {
        if (!this.free) {
            // анимация будет прокручиваться вместе с движением игрового мира
            if (this.game.spriteUpdate) {
                this.frameX++;
            }

            if (this.frameX > this.maxFrame) this.reset();
        }
    }

    draw() {
        if (!this.free) {
            this.game.ctx.drawImage(this.image,
                this.spriteSize * this.frameX, this.spriteSize * this.frameY,
                this.spriteSize, this.spriteSize, this.x, this.y,
                this.size, this.size);
        }
    }
}