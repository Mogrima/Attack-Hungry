export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25 * this.game.ratio;
        this.largeFont = Math.ceil(90 * this.game.ratio);
        this.smallFont = Math.ceil(45 * this.game.ratio);
        this.fontFamily = 'Unica One';
        this.fontFamilyST = 'Akatab';
        this.color = 'white';
        this.textColor = '#00ffff';
        this.indicatorColor = '#66ff00';
        this.hungryColor = '#f80000';
        this.rageColor = '#e239ff';
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.shadowOffsetX = 2;
        this.game.ctx.shadowOffsetY = 2;
        this.game.ctx.shadowColor = 'black';
        this.game.ctx.font = this.fontSize + 'px ' + this.fontFamily;
        // очки
        this.game.ctx.fillText('Score: ' + this.game.score, 20 * this.game.ratio, 40 * this.game.ratio);
        //
        this.game.ctx.fillText('Hungry: ', 20 * this.game.ratio, 100 * this.game.ratio);
        //
        this.game.ctx.fillText('Rage: ' + this.game.rage, 20 * this.game.ratio, 160 * this.game.ratio);
         // таймер
         const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
         this.game.ctx.fillText('Timer: ' + formattedTime, 20, 240);
        // сообщения о победе или проигрыше
        if (this.game.gameOver) {
            this.game.ctx.textAlign = 'center';
            let message1;
            let message2;
            if (this.game.isWin()) {
                message1 = 'angry hungry!';
                message2 = 'ⵜⵓⵜⵍⴰⵢⵜ ⵜⴰⴱⵏⴳⴰⵍⵉⵜ (বাংলা) ⵜⴻⵍⵍⴰ';
            } else {
                message1 = 'go all out!';
                message2 = ' ⵢⵓⵔⴰ ⵉⵣⵍⴰⵏ ⵉⵏⴰⵎⵓⵔⵏ ⵏ ⴱⵏⴳⵍⴰⴷⵉⵛ ⴷ ⵍⵀⵉⵏⴷ';
            }
            this.game.ctx.fillStyle = this.textColor;
            this.game.ctx.font = this.largeFont + 'px ' + this.fontFamily;
            this.game.ctx.fillText(message1, this.game.width * 0.5,
                this.game.height * 0.5 - (30 * this.game.ratio));
            this.game.ctx.font = this.smallFont + 'px ' + this.fontFamilyST;
            this.game.ctx.fillText(message2, this.game.width * 0.5,
                this.game.height * 0.5 + (30 * this.game.ratio));
        }

        this.game.ctx.fillStyle = this.indicatorColor;
        for (let i = 0; i < this.game.ammo; i++) {
            this.game.ctx.fillRect((5 * i + 20)  * this.game.ratio,
            50 * this.game.ratio,
            3 * this.game.ratio,
            20 * this.game.ratio);
        }
        this.game.ctx.fillStyle = this.hungryColor;
        for (let i = 0; i < this.game.hungry; i++) {
            this.game.ctx.fillRect((5 * i + 20) * this.game.ratio,
            110 * this.game.ratio,
            3 * this.game.ratio,
            20 * this.game.ratio);
        }
        this.game.ctx.fillStyle = this.rageColor;
        for (let i = 0; i < this.game.rage; i++) {
            this.game.ctx.fillRect((5 * i + 20) * this.game.ratio,
            170 * this.game.ratio,
            3 * this.game.ratio,
            20 * this.game.ratio);
        }
        this.game.ctx.restore();
    }
}