import {Enemy} from './Enemy.js';

export class Spaceship1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 29;
        this.image = document.getElementById('enemy1');

        this.lives = 1;
        this.maxLives = this.lives;
        this.score = this.lives;
    }

    start() {
        super.start();
        this.speedY = Math.random() * -1.5 - 0.5;
        this.lives = this.maxLives;
    }
}