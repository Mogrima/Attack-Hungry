export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Unica One';
        this.fontFamilyST = 'Akatab';
        this.color = 'white';
        this.textColor = '#00ffff';
        this.indicatorColor = '#66ff00';
        this.hungryColor = '#f80000';
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.shadowOffsetX = 2;
        this.game.ctx.shadowOffsetY = 2;
        this.game.ctx.shadowColor = 'black';
        this.game.ctx.font = this.fontSize + 'px ' + this.fontFamily;
        // очки
        this.game.ctx.fillText('Score: ' + this.game.score, 20, 40);
        //
        this.game.ctx.fillText('Hungry: ', 20, 100);
         // таймер
         const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
         this.game.ctx.fillText('Timer: ' + formattedTime, 20, 160);
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
            this.game.ctx.font = '70px ' + this.fontFamily;
            this.game.ctx.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            this.game.ctx.font = '25px ' + this.fontFamilyST;
            this.game.ctx.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }

        this.game.ctx.fillStyle = this.indicatorColor;
        for (let i = 0; i < this.game.ammo; i++) {
            this.game.ctx.fillRect(5 * i + 20, 50, 3, 20);
        }
        this.game.ctx.fillStyle = this.hungryColor;
        for (let i = 0; i < this.game.hungry; i++) {
            this.game.ctx.fillRect(5 * i + 20, 110, 3, 20);
        }
        this.game.ctx.restore();
    }
}