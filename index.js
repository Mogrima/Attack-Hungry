"use strict";
import {Game} from './module/Game.js';

window.addEventListener('load', function () {
    // canvas setup
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    const game = new Game(canvas, ctx);
    let lastTime = 0;

    // animation loop
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем игровое поле перед следующей анимацией
        game.draw(ctx);
        game.update(deltaTime);
        lastTime = currentTime;
        requestAnimationFrame(animate);
        // console.log(deltaTime);
    }

    animate(0);

});