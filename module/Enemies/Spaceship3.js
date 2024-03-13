import {Enemy} from './Enemy.js';

export class Spaceship3 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 29;
        this.image = document.getElementById('enemy3');

        this.lives = 3;
        this.maxLives = this.lives;
        this.score = this.lives;
        this.maxFrame = 6;
    }

    start() {
        super.start();
        this.lives = this.maxLives;
    }
}