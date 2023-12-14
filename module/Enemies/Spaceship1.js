import {Enemy} from './Enemy.js';

export class Spaceship1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 29;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.image = document.getElementById('enemy1');

        this.lives = 1;
        this.score = this.lives;
    }
}