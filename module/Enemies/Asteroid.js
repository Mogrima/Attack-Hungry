import {Enemy} from './Enemy.js';

export class Asteroid extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 80;
        this.spriteHeight = 80;
        this.width;
        this.height;
        this.image = document.getElementById('asteroid');

        this.lives = 1;
        this.maxLives = this.lives;
        this.score = this.lives;

        this.maxFrame = 0;
        this.countParticles = 0;
        this.sizeModifier = 1;
    }

    start() {
        super.start();
        this.frameY = Math.floor(Math.random() * 4);
        this.speedX = 0;
        this.speedY = -2;
        this.lives = this.maxLives;
    }

    update() {
        if (!this.free) {
            super.update();
            if (this.lives < 1) {
                const explosion = this.game.getExplosion();
                if (explosion) explosion.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
            }
        }
    }
}