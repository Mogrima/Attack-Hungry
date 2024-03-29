export class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if (((e.key === 'ArrowRight') || (e.key === 'ArrowLeft'))) {
                this.game.keys.add(e.key);
                this.game.direction.clear();
                this.game.direction.add(e.key);

                if((this.game.direction.has('ArrowLeft'))) {
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
            if (this.game.keys.has(e.key)) {
                this.game.keys.delete(e.key);
            }
        });
        
    }
}