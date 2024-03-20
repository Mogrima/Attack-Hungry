import { Planet } from "./Planet.js";

export class Space {
    constructor(game) {
        this.game = game;
        this.planets = [];
        this.numberOfPlanets = 10;
    }

    resize() {
        this.createObstacles();
        this.planets.forEach(planet => {
            planet.resize();
        });
    }

    update() {
        this.planets.forEach(planet => {
            planet.update();
        });
    }

    draw() {
        this.planets.forEach(planet => {
            planet.draw();
        });
    }

    createObstacles() {
        this.planets = [];
        for (let i = 0; i < this.numberOfPlanets; i++) {
            this.planets.push(new Planet(this.game));
        }
    }
}