import {Enemy} from './Enemy.js';

export class Spaceship4 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 26;
        this.image = document.getElementById('enemy4');

        this.lives = 2;
        this.maxLives = this.lives;
        this.score = this.lives;
    }

    start() {
        super.start();
        this.lives = this.maxLives;
    }
}