import {Enemy} from './Enemy.js';

export class Spaceship3 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 29;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.image = document.getElementById('enemy3');

        this.lives = 3;
        this.score = this.lives;
        this.maxFrame = 6;
    }
}