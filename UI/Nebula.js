import { CelestialObjects } from "./CelestialObjects.js";

export class Nebula extends CelestialObjects {
    constructor(game) {
        super(game);
        this.image = document.getElementById('nebula');
        this.spriteWidth = 128;
        this.spriteHeight = 126;
        this.frameX = 0;
        this.frameY = 0;
    }

    resize() {
        this.width = (this.spriteWidth) * this.game.ratio;
        this.height = (this.spriteHeight) * this.game.ratio;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * (this.game.height * 2);
        this.frameX = Math.floor(Math.random() * 3);
        this.speedY = (Math.random() * - 0.2) * this.game.ratio;
    }
}