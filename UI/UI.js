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

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        // очки
        context.fillText('Score: ' + this.game.score, 20, 40);
        //
        context.fillText('Hungry: ', 20, 100);
         // таймер
         const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
         context.fillText('Timer: ' + formattedTime, 20, 160);
        // сообщения о победе или проигрыше
        if (this.game.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.game.isWin()) {
                message1 = 'angry hungry!';
                message2 = 'ⵜⵓⵜⵍⴰⵢⵜ ⵜⴰⴱⵏⴳⴰⵍⵉⵜ (বাংলা) ⵜⴻⵍⵍⴰ';
            } else {
                message1 = 'go all out!';
                message2 = ' ⵢⵓⵔⴰ ⵉⵣⵍⴰⵏ ⵉⵏⴰⵎⵓⵔⵏ ⵏ ⴱⵏⴳⵍⴰⴷⵉⵛ ⴷ ⵍⵀⵉⵏⴷ';
            }
            context.fillStyle = this.textColor;
            context.font = '70px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '25px ' + this.fontFamilyST;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }

        context.fillStyle = this.indicatorColor;
        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(5 * i + 20, 50, 3, 20);
        }
        context.fillStyle = this.hungryColor;
        for (let i = 0; i < this.game.hungry; i++) {
            context.fillRect(5 * i + 20, 110, 3, 20);
        }
        context.restore();
    }
}