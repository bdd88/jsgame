import { button } from "./gui.js";
import { mouseButton } from "./mouseButton.js";

export class mouse {
    x: number = 0;
    y: number = 0;
    canvas: HTMLElement;
    buttonNameToId: Map<string,number> = new Map();
    buttonIdToName: Map<number,string> = new Map();
    buttonMap: Map<number,mouseButton> = new Map();
    currentlyPressed: number = 0;

    constructor(canvas: HTMLElement) {
        this.canvas = canvas;
        this.resetButtonMapping();
        this.resetButtonObjects();
    }

    /** Create mappings to convert button ID to Name, and vice-versa. */
    resetButtonMapping() {
        //TODO: Handle passing in of a custom mapping.
        this.buttonNameToId = new Map([
            ['Left', 0],
            ['Middle', 1],
            ['Right', 2],
            ['Back', 3],
            ['Forward', 4]
        ]);
        this.buttonIdToName = new Map([
            [0, 'Left'],
            [2, 'Right'],
            [1, 'Middle'],
            [3, 'Back'],
            [4, 'Forward']
        ]);
    }

    /** Build buttons array, clearing any exitsting configuration. */
    resetButtonObjects() {
        this.buttonMap = new Map();
        this.buttonNameToId.forEach((id, name) => {
            this.buttonMap.set(id, new mouseButton());
        });

    }

    /** Get button data storage object based on button Name. */
    getButtonByName(buttonName: string) {
        const buttonId = this.buttonNameToId.get(buttonName);
        if (buttonId === undefined) { throw new Error("Button ID is not defined."); }
        return this.getButtonById(buttonId)as mouseButton;
    }

    /** Get button data storage object based on button ID. */
    getButtonById(buttonId: number) {
        if (!this.buttonMap.has(buttonId)) { throw new Error("Button object does not exist."); }
        return this.buttonMap.get(buttonId) as mouseButton;
    }

    /** Track button presses on the mouse. */
    press(e: MouseEvent) {
        const buttonObject = this.getButtonById(e.button)
        buttonObject.pressTime = performance.now();
        buttonObject.pressed = true;
        buttonObject.pressX = this.x;
        buttonObject.pressY = this.y;
        this.currentlyPressed = e.buttons;
        if (buttonObject.pressCallback !== null) {
            const args = buttonObject.pressCallbackArgs;
            buttonObject.pressCallback(args);
        }
    }

    /** Track button releases on the mouse. */
    release(e: MouseEvent) {
        const buttonObject = this.getButtonById(e.button)
        buttonObject.releaseTime = performance.now();
        buttonObject.pressed = false;
        buttonObject.releaseX = this.x;
        buttonObject.releaseY = this.y;
        this.currentlyPressed = e.buttons;
        if (buttonObject.releaseCallback !== null) {
            const args = buttonObject.releaseCallbackArgs;
            buttonObject.releaseCallback(args);
        }
    }

    /** Track the mouse position relative to the canvas. */
    move(e: MouseEvent) {
        this.x = e.clientX - this.canvas.getBoundingClientRect().left;
        this.y = e.clientY - this.canvas.getBoundingClientRect().top;
    }

    /** Prevent the right click menu from opening over the canvas. */
    menu(e: MouseEvent) {
        if (
            this.x >= this.canvas.getBoundingClientRect().left &&
            this.x <= this.canvas.getBoundingClientRect().right &&
            this.y >= this.canvas.getBoundingClientRect().top &&
            this.y <= this.canvas.getBoundingClientRect().bottom
        ) {
            e.preventDefault();
        }
    }

    /** Add a callback function to be called when the given button is pressed. */
    addButtonPressCallback(buttonName: string, callback: Function, args: Array<any>) {
        const buttonObject = this.getButtonByName(buttonName);
        buttonObject.pressCallback = callback;
        buttonObject.pressCallbackArgs = args;
        return true;
    }

    /** Add a callback function to be called when the given button is released. */
    addButtonReleaseCallback(buttonName: string, callback: Function, args: Array<any>) {
        const buttonObject = this.getButtonByName(buttonName);
        buttonObject.releaseCallback = callback;
        buttonObject.releaseCallbackArgs = args;
        return true;
    }

    /** Check if a button is being actively pressed. */
    buttonIsHeld(buttonName: string) {
        const buttonObject = this.getButtonByName(buttonName);
        return buttonObject.pressed;
    }
}