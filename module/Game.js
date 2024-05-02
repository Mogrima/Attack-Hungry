import {Player} from './Player.js';
import {InputHandler} from './InputHandler.js';
import {UI} from '../UI/UI.js';
import {Spaceship1} from './Enemies/Spaceship1.js';
import {Spaceship2} from './Enemies/Spaceship2.js';
import {Spaceship3} from './Enemies/Spaceship3.js';
import {Spaceship4} from './Enemies/Spaceship4.js';
import { Particle } from './Particle.js';
import { Space } from '../UI/Space.js';
import { Asteroid } from './Enemies/Asteroid.js';
import { SmokeExplosion } from './Explosion/SmokeExplosion.js';
import { FireExplosion } from './Explosion/FireExplosion.js';

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 1768;
        this.baseWidth = 1768;
        this.ratio = this.height / this.baseHeight;
        
        this.player = new Player(this);
        this.keys = new Set();
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.space = new Space(this);
        this.direction = new Set();

        this.ammo;
        this.ammoInterval = 100;
        this.maxAmmo = 50;
        this.ammoTimer;

        this.hungry;
        this.hungryInterval = 1000;
        this.maxHungry = 50;
        this.hungryTimer;

        this.rage;
        this.maxRage = 20;

        this.enemyPool = [];
        this.numberOfenemies = 50;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.asteroidPool = [];
        this.gameOver;
        this.score;
        this.winningScore = 100;

        this.gameTime;
        this.timeLimit = 100000;
        this.speed;
        
        this.debug = true;

        this.particlePool = [];
        this.numberOfParticle = 50;

        this.explosionPool = [];
        this.numberOfExplosions = 10;
        this.smokeExplosion = new SmokeExplosion(this);

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

        if (this.hungryTimer > this.hungryInterval && !this.gameOver) {
            if (this.hungry < this.maxHungry) {
                this.hungry++;
            }
            if (this.hungry >= this.maxHungry * 0.5) this.rage++;
            if (this.hungry <= 1) this.rage--;
            this.hungryTimer = 0;
        } else {
            this.hungryTimer += deltaTime;
        }

        if (this.rage <= 0) this.rage = 0;
        if (this.rage >= this.maxRage) this.rage = this.maxRage;

        this.particlePool.forEach(particle => particle.update());

        this.handleEnemies(deltaTime);

        this.enemyPool.forEach(enemy => {
            enemy.update();
        });

        this.asteroidPool.forEach(asteroid => {
            asteroid.update();
        });

        this.explosionPool.forEach(explosion => explosion.update());
        this.smokeExplosion.update();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ratio = this.height / this.baseHeight;
        this.speed = 3 * this.ratio;
        this.score = 0;
        this.gameOver = false;
        this.gameTime = 0;
        this.ammo = 20;
        this.ammoTimer = 0;
        this.hungry = 0;
        this.hungryTimer = 0;
        this.rage = 0;
        this.space.resize();
        this.player.resize();
        this.createEnemyPool();
        this.enemyPool.forEach(enemy => {
            enemy.resize();
        });
        this.asteroidPool.forEach(asteroid => {
            asteroid.resize();
        });
        this.createParticlePool();
        this.createExplosionPool();
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            screen.orientation.lock('landscape-primary');
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
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

    createEnemyPool() {
        this.enemyPool = [];
        this.asteroidPool = [];
        for (let i = 0; i < this.numberOfenemies; i++) {
            this.asteroidPool.push(new Asteroid(this));
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

    getAsteroid() {
        for (let i = 0; i < this.asteroidPool.length; i++) {
            if (this.asteroidPool[i].free) return this.asteroidPool[i];
        }
    }

    handleEnemies(deltaTime) {
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.enemyTimer = 0;
            const enemy = this.getEnemy();
            if (enemy) enemy.start();
            const asteroid = this.getAsteroid();
            if (asteroid) asteroid.start();
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

    createExplosionPool() {
        this.explosionPool = [];
        for (let i = 0; i < this.numberOfExplosions; i++) {
            this.explosionPool.push(new FireExplosion(this));
        }
    }

    getExplosion() {
        for (let i = 0; i < this.explosionPool.length; i++) {
            if (this.explosionPool[i].free) return this.explosionPool[i];
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
        if (this.score >= this.winningScore) return true;
        if (this.rage >= this.maxRage) {
            return false;
        }
    }

    draw() {
        this.space.draw();
        this.ui.draw();
        this.player.draw();
        this.particlePool.forEach(particle => particle.draw());
        this.asteroidPool.forEach(asteroid => {
            asteroid.draw();
        });
        this.enemyPool.forEach(enemy => enemy.draw());
        this.explosionPool.forEach(explosion => explosion.draw());
        this.smokeExplosion.draw();
    }
}