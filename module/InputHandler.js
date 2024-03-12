export class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if (((e.key === 'ArrowRight') || (e.key === 'ArrowLeft')) && this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
                this.game.direction.length = 0;
                this.game.direction.push(e.key);

                if((this.game.direction.lastIndexOf('ArrowLeft') === this.game.direction.length - 1) && (this.game.direction.length > 0)) {
                    this.game.player.frameY = 1;
                    
                }  else {
                    this.game.player.frameY = 0;
                }
            }
            else if (e.key === ' ') {
                this.game.player.shoot();
            }
            else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            } 
        });
        window.addEventListener('keyup', (e) => {
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
        
    }
}