export class Training {
    constructor(game) {
        this.game = game;
        this.widthRatio = this.game.width / this.game.baseWidth;
        this.image = document.getElementById('arrow');
        this.fontFamily = 'Unica One';
        this.fontSize = Math.ceil(35 * this.widthRatio);
        this.spriteSize = 100;
        this.size;
        this.sizeModifier = 1.5;
        this.width = this.spriteSize;
        this.height = this.spriteSize;
        this.x;
        this.y;
        this.active;
    }

    resize() {
        this.size = (this.spriteSize * this.sizeModifier) * this.game.ratio;
        this.x = this.game.player.x + this.size;
        this.y = this.game.player.y - this.size * 0.5;
        this.active = true;
        
    }

    update() {
    //    this.x += 1;
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.fillStyle = 'white';
        if (this.game.debug) this.game.ctx.strokeRect(this.x, this.y, this.size, this.size);
        this.game.ctx.font = this.fontSize + 'px ' + this.fontFamily;
        this.game.ctx.fillText('Press Arrow Right to move right', this.x, this.y - 5);
        this.game.ctx.restore();
        
        this.game.ctx.drawImage(this.image,
            0, 0, this.spriteSize, this.spriteSize, 
            this.x, this.y,
            this.size, this.size);
    }
}