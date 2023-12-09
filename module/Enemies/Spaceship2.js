import {Enemy} from './Enemy.js';

export class Spaceship2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 22;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.image = document.getElementById('enemy2');

        this.lives = 10;
        this.score = this.lives;
    }
}