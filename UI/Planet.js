import { CelestialObjects } from "./CelestialObjects.js";

export class Planet extends CelestialObjects {
    constructor(game) {
        super(game);
        this.image = document.getElementById('bg_objects');
        this.spriteSize = 64;
        this.size;
    }

    resize() {
        this.size = this.spriteSize * this.game.ratio;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * (this.game.height * 2);
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
        this.speedY = (Math.random() * - 0.5 - 0.5) * this.game.ratio;
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
            this.spriteSize, this.spriteSize,
             this.x, this.y, this.size, this.size);
    }
}