export class Layer {
    constructor(game, image, rotateImage) {
        this.game = game;
        this.image = image;
        this.rotateImage = rotateImage;
        this.width = 1768;
        this.height = 1768;
        this.x = 0;
        // -6 добавляется для компенсации разрыва между изображениями в первую их прокрутку
        this.y = -this.height + game.height - 6;
        this.y2 = -this.height - this.height + game.height - 6;
    }
    update() {
        if ((this.y >= this.height) && (this.y2 >= 0)) {
            this.y = -this.height;
        }
        if ((this.y2 >= this.height) && (this.y >= 0)) {
            this.y2 = -this.height;
        }
        this.y += this.game.speed;
        this.y2 += this.game.speed;  
    }

    layerRotate() {
        context.save();
        context.translate(this.width / 2, this.height / 2);
        context.rotate((180 * Math.PI) / 180);
        context.translate(-this.width / 2, -this.height / 2);
        context.restore();
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.rotateImage, this.x, this.y2);
    }
}