import {Player} from './Player.js';
import {InputHandler} from './InputHandler.js';
import {UI} from '../UI/UI.js';
import {Spaceship1} from './Enemies/Spaceship1.js';
import {Spaceship2} from './Enemies/Spaceship2.js';
import {Spaceship3} from './Enemies/Spaceship3.js';
import {Spaceship4} from './Enemies/Spaceship4.js';
import {Background} from '../UI/Background.js';

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);

        this.keys = [];
        this.input = new InputHandler(this);

        this.ammo = 20;

        this.ammoInterval = 500;
        this.maxAmmo = 50;
        this.ammoTimer = 0;

        this.hungry = 0;

        this.hungryInterval = 1000;
        this.maxHungry = 50;
        this.hungryTimer = 0;

        this.ui = new UI(this);

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 30;

        this.gameTime = 0;
        this.timeLimit = 40 * 1000;

        this.speed = 13;
        this.background = new Background(this);

        this.debug = true;

        this.particles = [];

        this.direction = [];

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;
        
    }

    update(deltaTime) {
        this.handleSpriteTimer(deltaTime);
        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;

        this.player.update();
        this.background.update();

        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        if (this.hungryTimer > this.hungryInterval) {
            if (this.hungry < this.maxHungry) this.hungry++;
            this.hungryTimer = 0;
        } else {
            this.hungryTimer += deltaTime;
        }

        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
        

        this.enemies.forEach(enemy => {
            enemy.update();
        });

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    handleSpriteTimer(deltaTime) {
        if (this.spriteTimer < this.spriteInterval) {
            this.spriteTimer += deltaTime;
            this.spriteUpdate = false;
        } else {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        }
    }

    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.3) this.enemies.push(new Spaceship1(this))
        else if (randomize < 0.5 && randomize > 0.3) this.enemies.push(new Spaceship2(this))
        else if (randomize < 0.8 && randomize > 0.5) this.enemies.push(new Spaceship3(this))
        else this.enemies.push(new Spaceship4(this));
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect2.x < rect1.x + rect1.width &&
            rect1.y < rect2.y + rect2.height &&
            rect2.y < rect1.y + rect1.height)
    }

    isWin() {
        return this.score >= this.winningScore;
    }

    draw(context) {
        this.background.draw(context);
        this.ui.draw(context);
        this.player.draw(context);
        this.particles.forEach(particle => particle.draw(context));
        this.enemies.forEach(enemy => enemy.draw(context));

    }
}