import { CelestialObjects } from "./CelestialObjects.js";

export class Glare extends CelestialObjects {
    constructor(game) {
        super(game);
        this.image = document.getElementById('glare');
        this.spriteWidth = 33;
        this.spriteHeight = 32;
        this.sizeModifier = 1;
        this.frameY = 0;
    }

    resize() {
        this.width = (this.spriteWidth * this.sizeModifier) * this.game.ratio;
        this.height = (this.spriteHeight * this.sizeModifier) * this.game.ratio;
        this.x = Math.random() * this.game.width;
        this.y = Math.random() * (this.game.height * 2);
        this.frameX = Math.floor(Math.random() * 3);
        this.speedY = (Math.random() * - 0.2 - 0.2) * this.game.ratio;
    }
}