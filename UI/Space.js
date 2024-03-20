import { Planet } from "./Planet.js";
import { Glare } from "./Glare.js";

export class Space {
    constructor(game) {
        this.game = game;
        this.planets = [];
        this.numberOfPlanets = 10;
        this.glares = [];
        this.numberOfGlares = 20;
    }

    resize() {
        this.createObstacles();
        this.createGlares();
        this.planets.forEach(planet => {
            planet.resize();
        });
        this.glares.forEach(glare => {
            glare.resize();
        });
    }

    update() {
        this.planets.forEach(planet => {
            planet.update();
        });
        this.glares.forEach(glare => {
            glare.update();
        });
    }

    draw() {
        this.glares.forEach(glare => {
            glare.draw();
        });
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

    createGlares() {
        this.glares = [];
        for (let i = 0; i < this.numberOfGlares; i++) {
            this.glares.push(new Glare(this.game));
        }
    }
}