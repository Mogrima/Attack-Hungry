import {Enemy} from './Enemy.js';

export class Spaceship4 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 26;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.image = document.getElementById('enemy4');

        this.lives = 10;
        this.score = this.lives;
    }
}