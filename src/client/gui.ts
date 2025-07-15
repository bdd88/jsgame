import {draw} from './draw';
import {mouse} from './mouse';

export class button {
    type: string = "button";
    name: string = "";
    x: number;
    y: number;
    width: number = 0;
    height: number = 0;
    color: string = "";
    fontSize: number = 0;
    fontType: string = "";
    string: string = "";
    callback: Function;
    callbackArgs: Array<any>;
    mouse: mouse;
    draw: draw;
    leftSide: number;
    topSide: number;
    rightSide: number;
    bottomSide: number;

    /**
     * 
     * @param {mouse} mouse 
     * @param {draw} draw 
     * @param {Function} callback 
     * @param {Array} callbackArgs 
     * @param {integer} x 
     * @param {integer} y 
     */
    constructor(mouse: mouse, draw: draw, callback: Function, callbackArgs: Array<any>, x: number, y: number) {
        this.mouse = mouse;
        this.draw = draw;
        this.callback = callback;
        this.callbackArgs = callbackArgs;
        this.x = x;
        this.y = y;
        this.leftSide = this.x;
        this.topSide = this.y;
        this.rightSide = this.x + this.width;
        this.bottomSide = this.y + this.height;
    }

    display() {
        this.draw.drawRectangleFilled(this.x, this.y, this.width, this.height, "red");
        this.draw.drawRectangleHollow(this.x, this.y, this.width, this.height, "blue");
        this.draw.drawText(this.x, this.y, this.color, this.fontSize, this.fontType, this.string);
    }

    checkIfClicked() {
        const leftClick = this.mouse.getButtonByName('Left');
        if (
            leftClick.pressX >= this.leftSide &&
            leftClick.pressX <= this.rightSide &&
            leftClick.pressY >= this.topSide &&
            leftClick.pressY <= this.bottomSide &&
            leftClick.releaseX >= this.leftSide &&
            leftClick.releaseX <= this.rightSide &&
            leftClick.releaseY >= this.topSide &&
            leftClick.releaseY <= this.bottomSide
        ) {
            console.log("Clicked");
            return true;
        } else {
            return false;
        }
    }
}

export class menu {
    x: number = 0;
    y: number = 0;
    name: string = "menu";
    buttons: Array<button>;
    draw: draw;

    constructor(draw: draw) {
        this.draw = draw;
        this.buttons = [];
    }

    addButton(button: button) {
        this.buttons.push(button);
    }

    display() {
    }
}