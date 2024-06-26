import {Enemy} from './Enemy.js';

export class Spaceship3 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 48;
        this.spriteHeight = 29;
        this.width;
        this.height;
        this.image = document.getElementById('enemy3');

        this.lives = 3;
        this.maxLives = this.lives;
        this.score = this.lives * 10;
        this.maxFrame = 6;
    }

    start() {
        super.start();
        this.lives = this.maxLives;
        this.speedY = (Math.random() * -1.5 - 1.5) * this.game.ratio;
    }
}