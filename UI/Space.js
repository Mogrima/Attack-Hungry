import { Planet } from "./Planet.js";
import { Glare } from "./Glare.js";
import { Nebula } from "./Nebula.js";

export class Space {
    constructor(game) {
        this.game = game;
        this.planets = [];
        this.numberOfPlanets = 10;
        this.glares = [];
        this.numberOfGlares = 20;
        this.nebulae = [];
        this.numberOfNebulae = 5;
    }

    resize() {
        this.createObstacles();
        this.createGlares();
        this.createNebulae();
        this.planets.forEach(planet => {
            planet.resize();
        });
        this.glares.forEach(glare => {
            glare.resize();
        });
        this.nebulae.forEach(nebula => {
            nebula.resize();
        });
    }

    update() {
        this.planets.forEach(planet => {
            planet.update();
        });
        this.glares.forEach(glare => {
            glare.update();
        });
        this.nebulae.forEach(nebula => {
            nebula.update();
        });
    }

    draw() {
        this.glares.forEach(glare => {
            glare.draw();
        });
        this.nebulae.forEach(nebula => {
            nebula.draw();
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

    createNebulae() {
        this.nebulae = [];
        for (let i = 0; i < this.numberOfNebulae; i++) {
            this.nebulae.push(new Nebula(this.game));
        }
    }
}