import { mouse } from "./mouse.js";
import { keyboard } from "./keyboard.js";

export class controls {
    mouse;
    keyboard;
    paused = false;

    /**
     * 
     * @param {mouse} mouse 
     * @param {keyboard} keyboard 
     */
    constructor (mouse, keyboard) {
        // Mouse
        this.mouse = mouse;
        document.addEventListener('mousedown', (e) => this.mouse.press(e));
        document.addEventListener('mouseup', (e) => this.mouse.release(e));
        document.addEventListener('mousemove', (e) => this.mouse.move(e));
        document.addEventListener("contextmenu", (e) => this.mouse.menu(e));
        //TODO: this.mouse.callbackOnHeld.set(this.mouseInteractions);

        // Keyboard
        this.keyboard = keyboard;
        document.addEventListener('keydown', (e) => this.keyboard.press(e));
        document.addEventListener('keydown', (e) => this.keyboard.release(e));
        this.keyboard.callbackOnPress.set('Escape', this.togglePause);
    }

    togglePause = () => {
        return this.paused = !this.paused;
    }

    mouseInteractions = () => {
        // Create sand when mouse click is held.
        if (this.mouse.clickHeld == true) {

        }
    }
}