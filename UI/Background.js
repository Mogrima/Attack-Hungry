import {Layer} from './Layer.js';

export class Background {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('layer1');
        this.rotateImage = document.getElementById('layer2');
        this.layer1 = new Layer(this.game, this.image, this.rotateImage);
        this.layers = [this.layer1,];

    }
    update() {
        this.layers.forEach(layer => layer.update());
    }

    draw() {
        this.layers.forEach(layer => layer.draw());
    }
}