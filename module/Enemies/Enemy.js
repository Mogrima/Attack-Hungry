import { Particle } from "../Particle.js";

export class Enemy {
    constructor(game) {
        this.game = game;
        this.y = 0;
        this.speedY = Math.random() * -1.5 - 2.5;
        this.markedForDeletion = false;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;

        this.countParticles = 10;
    }

    update() {
        // Обновляем x-координату врага (уменьшаем ее на величину speedX)
        this.y -= this.speedY;
        // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
        if (this.y > this.game.height ) this.markedForDeletion = true;

        if (this.game.checkCollision(this.game.player, this)) {
            this.markedForDeletion = true;
            for(let i = 0; i < 10; i++) {
                this.game.particles.push(new Particle(this.game,
                    this.x + this.width * 0.5, this.y + this.height * 0.5));
            }  
        }

        this.game.player.projectiles.forEach(projectile => {
            if (this.game.checkCollision(projectile, this)) {
                this.lives--;
                this.game.particles.push(new Particle(this.game, this.x + this.width * 0.5,
                    this.y + this.height * 0.5));
                projectile.markedForDeletion = true;
                if (this.lives <= 0) {        
                    this.markedForDeletion = true;
                    for(let i = 0; i < this.countParticles; i++) {
                        this.game.particles.push(new Particle(this.game, this.x + this.width * 0.5,
                            this.y + this.height * 0.5));
                    }          
                    if (!this.game.gameOver) this.game.score += this.score;
                    if (this.game.isWin()) this.game.gameOver = true;
                }
            }
        });

        if(this.frameX < this.maxFrame) {
            this.frameX++;
        }  else {
            this.frameX = 0;
        }
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

        // отобразим у каждого врага его жизни
        if(this.game.debug) {
            context.fillStyle = 'white';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y - 5);
        }
    }
}