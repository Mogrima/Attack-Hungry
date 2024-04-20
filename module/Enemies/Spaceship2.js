import {Enemy} from './Enemy.js';

export class Spaceship2 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 48;
        this.spriteHeight = 22;
        this.width;
        this.height;
        this.image = document.getElementById('enemy2');

        this.lives = 3;
        this.maxLives = this.lives;
        this.score = this.lives;
    }
    
    start() {
        super.start();
        this.lives = this.maxLives;
        this.speedY = (Math.random() * -0.5 - 1.5) * this.game.ratio;
    }
}