import { Training } from "./Training.js";

export class MoveLeft extends Training {
    constructor(game) {
        super(game);
        this.image = document.getElementById('arrowInv');
    }

    resize() {
        super.resize();
        this.x = this.game.player.x - this.size;
        this.maxX = this.x - this.step;
        
    }

    update() {
        this.x -= 1;
        if (this.x < this.maxX) this.x += this.step;
  
        if (this.game.keys.has('ArrowLeft')) this.remove();
  
      }
}