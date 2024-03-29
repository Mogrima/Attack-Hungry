import {Player} from './Player.js';
import {InputHandler} from './InputHandler.js';
import {UI} from '../UI/UI.js';
import {Spaceship1} from './Enemies/Spaceship1.js';
import {Spaceship2} from './Enemies/Spaceship2.js';
import {Spaceship3} from './Enemies/Spaceship3.js';
import {Spaceship4} from './Enemies/Spaceship4.js';
import { Particle } from './Particle.js';
import { Space } from '../UI/Space.js';

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 1768;
        this.baseWidth = 1768;
        this.ratio = this.width / this.baseWidth;
        
        this.player = new Player(this);

        this.keys = new Set();
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

        this.enemyPool = [];
        this.numberOfenemies = 50;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 30;

        this.gameTime = 0;
        this.timeLimit = 40 * 1000;

        this.speed = 13;
        this.space = new Space(this);

        this.debug = true;

        this.particlePool = [];
        this.numberOfParticle = 50;

        this.direction = new Set();

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth,
                e.currentTarget.innerHeight);
        });
        
    }

    update(deltaTime) {
        this.handleSpriteTimer(deltaTime);
        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;
        this.space.update();

        this.player.update();

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

        this.particlePool.forEach(particle => particle.update());

        this.handleEnemies(deltaTime);

        this.enemyPool.forEach(enemy => {
            enemy.update();
        });
        
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ratio = this.width / this.baseWidth;
        this.speed = 3 * this.ratio;
        this.score = 0;
        this.gameOver = false;
        this.gameTime = 0;
        this.space.resize();
        this.player.resize();
        this.createEnemyPool();
        this.enemyPool.forEach(enemy => {
            enemy.resize();
        });
        this.createParticlePool();
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

    createEnemyPool() {
        this.enemyPool = [];
        for (let i = 0; i < this.numberOfenemies; i++) {
            const randomNumber = Math.random();
            if (randomNumber < 0.3) {
                this.enemyPool.push(new Spaceship1(this));
            } else if (randomNumber < 0.5) {
                this.enemyPool.push(new Spaceship2(this));
            } else if (randomNumber < 0.8) {
                this.enemyPool.push(new Spaceship3(this));
            } else {
                this.enemyPool.push(new Spaceship4(this));
            }
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemyPool.length; i++) {
            if (this.enemyPool[i].free) return this.enemyPool[i];
        }
    }

    handleEnemies(deltaTime) {
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.enemyTimer = 0;
            const enemy = this.getEnemy();
            if (enemy) enemy.start();
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    createParticlePool() {
        this.particlePool = [];
        for (let i = 0; i < this.numberOfParticle; i++) {
            this.particlePool.push(new Particle(this));
        }
    }

    getParticle() {
        for (let i = 0; i < this.particlePool.length; i++) {
            if (this.particlePool[i].free) return this.particlePool[i];
        }
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

    draw() {
        this.space.draw();
        this.ui.draw();
        this.player.draw();
        this.particlePool.forEach(particle => particle.draw());
        this.enemyPool.forEach(enemy => enemy.draw());

    }
}