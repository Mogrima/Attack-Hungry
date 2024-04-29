export class InputHandler {
    constructor(game) {
        this.game = game;
        let initialX;
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

        this.game.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            initialX = e.changedTouches[0].pageX;
            this.game.player.shoot();
        });

        this.game.canvas.addEventListener('touchmove', (e) => {
            let deltaX = e.changedTouches[0].pageX - initialX;
            initialX = e.changedTouches[0].pageX;

            if (deltaX < 0) {
                game.keys.add('ArrowLeft');
                game.keys.delete('ArrowRight');
            } else if (deltaX > 0) {
                game.keys.add('ArrowRight');
                game.keys.delete('ArrowLeft');
            } else {
                game.keys.clear();
            }
        });

        this.game.canvas.addEventListener('touchend', (e) => {
            game.keys.clear();
        });
        
    }
}