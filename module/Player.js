import {Projectile} from './Projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById('player');
        this.spriteWidth = 32;
        this.spriteHeight = 18;
        this.sizeModifier = 4;
        this.width;
        this.height;

        this.speedX = 0;
        this.maxSpeed;

        this.projectiles = [];

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;

    }

    update() {
        this.x += this.speedX;

        if (this.game.keys.has('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (this.game.keys.has('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        if (this.x > this.game.width - this.width * 0.5) this.x = this.game.
        width - this.width * 0.5;
        else if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;

        this.projectiles.forEach(pr => { pr.update(); });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);

        // sprite animation
        if (this.game.spriteUpdate) {
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            }  else {
                this.frameX = 0;
            }
        }
    }
   
    draw() {
        // hitbox player
        this.game.ctx.strokeStyle = "yellow";
        if (this.game.debug) this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(pr => { pr.draw()});
        this.game.ctx.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x, this.y,
            this.width, this.height);

    }

    shoot() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game,
                this.x + this.width * 0.5, this.y + 20));
            this.game.ammo--;
        }
    }

    resize() {
        this.width = (this.spriteWidth * this.sizeModifier) * this.game.ratio;
        this.height = (this.spriteHeight * this.sizeModifier) * this.game.ratio;
        this.x = this.game.width * 0.5 - (this.width * 0.5);
        this.y = this.game.height - this.height;
        this.maxSpeed = 10 * this.game.ratio;
    }
} 