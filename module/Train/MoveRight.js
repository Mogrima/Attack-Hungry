import { Training } from "./Training.js";

export class MoveRight extends Training {
    constructor(game) {
        super(game);
        this.image = document.getElementById('arrow');
    }

    resize() {
        super.resize();
        this.message = this.game.getDeviceType() === 'mobile' ?
        'Swipe Right to move right' : 'Press Arrow Right to move right';
    }
}