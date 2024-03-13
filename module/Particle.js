export class Particle {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.image = document.getElementById('particle');
        this.frameX;
        this.frameY;
        this.spriteSize;
        this.sizeModifer;
        this.size;
        this.width;
        this.height;
        // разбор деталей от игрока по горизонтали
        this.speedX;
        // движение частиц по вертикали случайное число от 0 до - 15, поэтому частицы всегда будут двигаться вверх
        this.speedY;
        // сила тяжести, чтобы частицы подали вниз
        this.gravity;
        // вращение
        this.angle;
        // скорсть вращения от - 0.2 до 0.1
        this.va;
        // кол-во отскоков
        this.bounced;
        this.bottomBounceBoundary;
        this.free = true;
    }

    start(x, y) {
        this.free = false;
        this.x = x;
        this.y = y;
        this.frameX = Math.floor(Math.random() * 8);
        this.frameY = Math.floor(Math.random() * 6);
        this.spriteSize = 32;
        this.sizeModifer = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.spriteSize * this.sizeModifer;
        this.width = this.size;
        this.height = this.size;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * - 15;
        this.gravity = 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
        this.bounced = 0;
        this.bottomBounceBoundary = Math.random() * 100 + 60;
    }

    reset() {
        this.free = true;
    }

    update() {
        if (!this.free) {
            // угол изменяется под вращением
            this.angle += this.va;
            // вертикальная скорость уменьшается под гравитацией
            this.speedY += this.gravity;
            this.x -= this.speedX;
            this.y += this.speedY;
            if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
                this.reset();
            }
            // подпрыгивание частиц
            if (this.y > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
                this.bounced++;
                this.speedY *= -0.5;
            }
            if (this.game.checkCollision(this, this.game.player)) {
                if(this.game.hungry <= 0) this.game.hungry = 0;
                this.game.hungry--;
                this.reset();
            }
        }
    }
    draw(context) {
        if (!this.free) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, 
                this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
            context.restore();
        }
    }
}