export class Enemy {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.speedY;
        this.speedX;
        this.sizeModifier = 3;

        this.frameX;
        this.frameY = 0;
        this.maxFrame = 5;

        this.countParticles = 10;
        this.free = true;
    }

    resize() {
        this.width = (this.spriteWidth * this.sizeModifier) * this.game.ratio;
        this.height = (this.spriteHeight * this.sizeModifier) * this.game.ratio;
    }

    start() {
        this.free = false;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.y = -this.height;
        this.speedY = (Math.random() * -1.5 - 2.5) * this.game.ratio;
        this.speedX = (Math.random() * 2 - 1) * this.game.ratio;
        this.frameX = 0;
    }

    reset() {
        this.free = true;
    }

    update() {
        if (!this.free) {
                
            // Обновляем x-координату врага (уменьшаем ее на величину speedX)
            this.y -= this.speedY;
            this.x += this.speedX;
            // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
            if (this.y > this.game.height ) this.reset();

            if (this.x <= 0 || this.x >= this.game.width - this.width) {
                this.speedX *= -1;
            }

            if (this.game.checkCollision(this.game.player, this)) {
                this.reset();
                const explosion = this.game.getExplosion();
                if (explosion) explosion.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
            }

            this.game.player.projectilePool.forEach(projectile => {
                if (!projectile.free && this.game.checkCollision(projectile, this)) {
                    projectile.reset();
                    this.lives--;
                    const particle = this.game.getParticle();
                    if (particle) particle.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
                    projectile.reset();
                    if (this.lives <= 0) {        
                        this.reset();
                        for(let i = 0; i < this.countParticles; i++) {
                            const particle = this.game.getParticle();
                            if (particle) particle.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
                        }          
                        if (!this.game.gameOver) this.game.score += this.score;
                        if (this.game.isWin()) this.game.gameOver = true;
                    }
                }
            });

            if (this.game.spriteUpdate) {
                if(this.frameX < this.maxFrame) {
                    this.frameX++;
                }  else {
                    this.frameX = 0;
                }
            }
        }
    }

    draw() {
        if (!this.free) {
            this.game.ctx.drawImage(this.image,
                this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    
            // отобразим у каждого врага его жизни
            if(this.game.debug) {
                this.game.ctx.save();
                this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
                this.game.ctx.fillStyle = 'white';
                this.game.ctx.font = '20px Helvetica';
                this.game.ctx.fillText(this.lives, this.x, this.y - 5);
                this.game.ctx.restore();
            }
        }
    }
}