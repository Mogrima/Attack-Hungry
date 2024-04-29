import { Explosion } from "./Explosion.js";

export class SmokeExplosion extends Explosion {
    constructor(game) {
        super(game);
        this.x;
        this.y;
        this.image = document.getElementById('smokeExplosion');
        this.frameX;
        this.frameY;
        this.maxFrame = 5;
        this.spriteSize = 200;
        this.size = (this.spriteSize * 1.5) * this.game.ratio;
        this.free = true;
    }

    start(x, y) {
        super.start(x, y)
        this.frameX = 0;
        this.frameY = 0;
    }
}