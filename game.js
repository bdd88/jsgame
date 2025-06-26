import {physicsObject} from './physics.js';
import {mouse} from './mouse.js';
import {draw} from './draw.js';
import {stats} from './stats.js';
import {util} from './util.js';
import * as weather from './weather.js';
import * as matter from './matter.js';

class game {
    // Customizable properties:
    width = 1000;
    height = 1000;
    tickrate = 120;

    // Default values and properties.
    time = 0;
    previousTime = 0;
    frames = 0;
    pixelCount = 0;
    canvas;
    ctx;
    pixelMap;
    activePixels;
    draw;
    util;
    matter;
    weather;
    stats;
    mouse;

    constructor() {
        // .bind(this) is used (on listeners and the main loop) to keep 'this' references consistent throughout the code.

        // Configure the canvas and utility objects.
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.draw = new draw(this.ctx);
        this.util = new util();
        this.stats = new stats(this.ctx);
        this.pixelMap = new Map();
        this.activePixels = new Set();

        // Setup mouse and keyboard.
        this.mouse = new mouse(this.canvas);
        document.addEventListener('mousedown', (e) => this.mouse.press(e));
        document.addEventListener('mouseup', (e) => this.mouse.release(e));
        document.addEventListener('mousemove', (e) => this.mouse.move(e));

        // Start the main animation loop.
        this.main = this.main.bind(this);
        window.requestAnimationFrame(this.main);
    }

    addPixel(pixel) {
        const key = pixel.x + ',' + pixel.y;
        if (this.pixelMap.has(key) === false) {
            this.pixelMap.set(key, pixel);
            this.activePixels.add(pixel);
            return true;
        } else {
            return false;
        }
    }

    // Manually move a pixel to a given position.
    movePixel(x, y, targetX, targetY) {
        const key = x + ',' + y;
        const targetKey = targetX + ',' + targetY;
        if (pixelMap.has(key) === true) {
            const pixel = this.pixelMap.get(key);
            pixel.posX = targetX;
            pixel.posY = targetY;
            this.pixelMap.delete(key);
            this.pixelMap.set(targetKey, object);
            this.activePixels.add(object);
            return true;
        } else {
            return false;
        }
    }

    updatePixelMap(x, y, targetX, targetY) {
        const key = x + ',' + y;
        const newKey = targetX + "," + targetY;
        if (this.pixelMap.has(key)) {
            const pixel = this.pixelMap.get(key);
            this.pixelMap.delete(key);
            this.pixelMap.set(newKey, pixel);
            this.activePixels.add(pixel);
            //TODO: activePixels need to be de-activated at some point.
            return true;
        } else {
            return false;
        }
    }


    // Remove all references to a pixel object.
    deletePixel(pixel) {
        const key = pixel.x + ',' + pixel.y;
        if (this.pixelMap.has(key) === true) {
            this.pixelMap.delete(key);
            this.activePixels.delete(pixel);
            return true;
        } else {
            return false;
        }
    }

    // Create a new pixel objects.
    spawnPixels() {
        // Create pixels when the mouse is click and held.
        if (this.mouse.clickHeld == true) {
            const granule = new matter.sand(this.mouse.x, this.mouse.y, 0, 0);
            this.addPixel(granule);
        }

        // Simulate weather.
        for (let dropletCount = 0; dropletCount < this.util.genRandNum(20,100); dropletCount++) {
            const x = this.util.genRandNum(-150,999);
            const y = this.util.genRandNum(0,0);
            const xv = this.util.genRandNum(15,50);
            const yv = this.util.genRandNum(150,300);
            const droplet = new matter.water(x, y, xv, yv);
            this.addPixel(droplet);
        }
    }

    checkPath(x, y, targetX, target) {

    }

    applyPhysics(pixel, timestep) {
        const x1 = pixel.x;
        const y1 = pixel.y;
        pixel.applyPhysics(timestep);
        this.updatePixelMap(x1, y1, pixel.x, pixel.y);
        if (pixel.y > 999) {
            this.deletePixel(pixel);
        }
    }

    updateFrame(currentTime) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.spawnPixels();
        const timestep = (currentTime - this.previousTime) / 1000;
        this.activePixels.forEach(pixel => this.applyPhysics(pixel, timestep));
        this.stats.displayFPS(10, 25, 25);
        this.draw.drawPixelMap(this.pixelMap);
    }

    main(currentTime) {
        if (this.frames > 5000) {
            return;
        }
        this.stats.update(currentTime, this.frames, this.pixelMap.size);
        this.updateFrame(currentTime);
        this.previousTime = currentTime;
        this.frames += 1;
        window.requestAnimationFrame(this.main);
    }

}

const gameInstance = new game();