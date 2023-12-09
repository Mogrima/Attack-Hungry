import {Projectile} from './Projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = game.width / 2 - (this.width / 2);
        this.y = game.height - this.height;
        this.speedX = 0;
        this.maxSpeed = 10;

        this.projectiles = [];

        // image and animation player
        this.image = document.getElementById('player');
        this.sWidth = 32;
        this.sHeight = 32;
        this.dWidth = 100;
        this.dHeight = 100;
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
        context.drawImage(this.image, this.frameX * this.sWidth, this.frameY * this.sHeight, this.sWidth, this.sHeight, this.x, this.y, this.dWidth, this.dHeight);

    }

    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + this.width/2, this.y + 50));
            this.game.ammo--;
        }
    }
} 