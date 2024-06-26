import {Enemy} from './Enemy.js';

export class Spaceship1 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 48;
        this.spriteHeight = 29;
        this.width;
        this.height;
        this.image = document.getElementById('enemy1');

        this.lives = 1;
        this.maxLives = this.lives;
        this.score = this.lives * 10;
    }

    start() {
        super.start();
        this.speedY = (Math.random() * -1.5 - 0.5) * this.game.ratio;
        this.lives = this.maxLives;
    }
}