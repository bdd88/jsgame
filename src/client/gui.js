import {draw} from './draw.js';
import {mouse} from './mouse.js';

export class button {
    type = "button";
    name;
    x;
    y;
    width;
    height;
    color;
    fontSize;
    fontType;
    string;
    callback;
    callbackArgs;
    mouse;
    draw;

    /**
     * 
     * @param {mouse} mouse 
     * @param {draw} draw 
     * @param {Function} callback 
     * @param {Array} callbackArgs 
     * @param {integer} x 
     * @param {integer} y 
     */
    constructor(mouse, draw, callback, callbackArgs, x, y) {
        this.mouse = mouse;
        this.draw = draw;
        this.callback = callback;
        this.callbackArgs = callbackArgs;
        this.x = x;
        this.y = y;
    }

    display() {
        this.draw.drawRectangleFilled(this.x, this.y, this.width, this.height, "red");
        this.draw.drawRectangleHollow(this.x, this.y, this.width, this.height, "blue");
        this.draw.drawText(this.x, this.y, this.color, this.fontSize, this.fontType, this.string);
    }

    checkIfClicked() {
        if (
            this.mouse.x1 >= this.x &&
            this.mouse.x1 <= (this.x + this.width) &&
            this.mouse.y1 >= this.y &&
            this.mouse.y1 <= (this.y + this.height) &&
            this.mouse.x2 >= this.x &&
            this.mouse.x2 <= (this.x + this.width) &&
            this.mouse.y2 >= this.y &&
            this.mouse.y2 <= (this.y + this.height)
        ) {
            console.log("Clicked");
            this.mouse.x1 = null;
            this.mouse.y1 = null;
            this.mouse.x2 = null;
            this.mouse.y2 = null;
            return true;
        } else {
            return false;
        }
    }
}

export class menu {
    x = null;
    y = null;
    name = "menu";
    buttons = [];
    draw = null;

    constructor(draw) {
        this.draw = draw;
    }

    addButton(button) {
        this.buttons.push(button);
    }

    display() {
    }
}