import { Explosion } from "./Explosion.js";

export class FireExplosion extends Explosion {
    constructor(game) {
        super(game);
        this.image = document.getElementById('explosions');
    }
}