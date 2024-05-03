import {Enemy} from './Enemy.js';

export class Spaceship4 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 48;
        this.spriteHeight = 26;
        this.width;
        this.height;
        this.image = document.getElementById('enemy4');

        this.lives = 2;
        this.maxLives = this.lives;
        this.score = this.lives * 10;
    }

    start() {
        super.start();
        this.lives = this.maxLives;
        this.speedY = (Math.random() * -0.1 - 1) * this.game.ratio;
    }
}