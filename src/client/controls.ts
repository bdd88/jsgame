import { mouse } from "./mouse.js";
import { keyboard } from "./keyboard.js";
import { entities } from "./entities.js";
import { sand } from './matter/granule/sand.js';

export class controls {
    mouse: mouse;
    keyboard: keyboard;
    entities: entities;
    paused: boolean = false;

    constructor (mouse: mouse, keyboard: keyboard, entities: entities) {
        this.mouse = mouse;
        this.keyboard = keyboard;
        this.entities = entities

        document.addEventListener('mousedown', (e) => this.mouse.press(e));
        document.addEventListener('mouseup', (e) => this.mouse.release(e));
        document.addEventListener('mousemove', (e) => this.mouse.move(e));
        document.addEventListener("contextmenu", (e) => this.mouse.menu(e));
        document.addEventListener('keydown', (e) => this.keyboard.press(e));
        document.addEventListener('keyup', (e) => this.keyboard.release(e));

        this.keyboard.callbackOnPress.set('Escape', this.togglePause);
        this.mouse.addButtonPressCallback('Left', this.mouseInteractions, []);
        this.mouse.addButtonPressCallback('Right', this.togglePause, []);
    }

    togglePause = () => {
        this.paused = !this.paused;
        console.log("Paused: " + this.paused);
        return this.paused;
    }

    mouseInteractions = () => {
        console.log('spawning sand');
        const newEntity = new sand(this.mouse.x, this.mouse.y, 0, 0);
        this.entities.placeEntity(newEntity);
    }
}