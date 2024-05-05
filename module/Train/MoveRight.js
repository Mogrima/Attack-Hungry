import { Training } from "./Training.js";

export class MoveRight extends Training {
    constructor(game) {
        super(game);
        this.image = document.getElementById('arrow');
    }
}