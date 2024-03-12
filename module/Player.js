import {Projectile} from './Projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('player');
        this.spriteWidth = 32;
        this.spriteHeight = 18;
        this.sizeModifier = 3;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = this.game.width * 0.5 - (this.width * 0.5);
        this.y = this.game.height - this.height;
        this.speedX = 0;
        this.maxSpeed = 10;

        this.projectiles = [];

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;

    }
    update() {
        this.x += this.speedX;

        if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        if (this.x > this.game.width - this.width * 0.5) this.x = this.game.
        width - this.width * 0.5;
        else if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;

        this.projectiles.forEach(pr => { pr.update(); });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);

        // sprite animation
        if(this.frameX < this.maxFrame) {
            this.frameX++;
        }  else {
            this.frameX = 0;
        }
    }
   
    draw(context) {
        // hitbox player
        context.strokeStyle = "yellow";
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(pr => { pr.draw(context); });
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight, this.x, this.y,
            this.width, this.height);

    }

    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + this.width/2, this.y + 20));
            this.game.ammo--;
        }
    }
} 