export class mouse {
    x = 0;
    y = 0;
    canvas;
    button;
    buttonNameToId;
    buttonIdToName;
    currentlyPressed;

    /**
     * 
     * @param {HTMLElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.resetButtonMapping();
        this.resetButtonObjects();
    }

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
            //console.log("ID: %i, Name: %s", id, name);
            this.buttonMap.set(id, {
                name: name,
                pressed: null,
                pressX: null,
                pressY: null,
                pressTime: null,
                pressCallback: null,
                pressCallbackArgs: null,
                releaseX: null,
                release: null,
                releaseTime: null,
                releaseCallback: null
            });
        });

    }

    /**
     * Track button presses on the mouse.
     * @param {MouseEvent} e 
     */
    press(e) {
        const buttonId = e.button;
        //console.log('%s was pressed.', this.buttonIdToName.get(buttonId));
        this.buttonMap.get(buttonId).pressTime = performance.now();
        this.buttonMap.get(buttonId).pressed = true;
        this.buttonMap.get(buttonId).pressX = this.x;
        this.buttonMap.get(buttonId).pressY = this.y;
        this.currentlyPressed = e.buttons;
        //console.log('Currently pressed: %i', this.currentlyPressed);
        //console.log(this.buttonMap);
        if (this.buttonMap.get(buttonId).pressCallback !== null) {
            //console.log('Executing callback: %s(%s)', this.buttonMap.get(buttonId).pressCallback, this.buttonMap.get(buttonId).pressCallbackArgs);
            const args = this.buttonMap.get(buttonId).pressCallbackArgs;
            this.buttonMap.get(buttonId).pressCallback(args);
        } else {
            //console.log('No callback for pressing %s', this.buttonIdToName.get(buttonId));
        }
    }

    /**
     * Track button releases on the mouse.
     * @param {MouseEvent} e 
     */
    release(e) {
        const buttonId = e.button;
        //console.log('%s was released.', this.buttonIdToName.get(buttonId));
        this.buttonMap.get(buttonId).releaseTime = performance.now();
        this.buttonMap.get(buttonId).pressed = false;
        this.buttonMap.get(buttonId).releaseX = this.x;
        this.buttonMap.get(buttonId).releaseY = this.y;
        this.currentlyPressed = e.buttons;
        //console.log('Currently pressed: %i', this.currentlyPressed);
        if (this.buttonMap.get(buttonId).releaseCallback !== null) {
            //console.log('Executing callback: %s(%s)', this.buttonMap.get(buttonId).pressCallback, this.buttonMap.get(buttonId).pressCallbackArgs);
            const args = this.buttonMap.get(buttonId).releaseCallbackArgs;
            this.buttonMap.get(buttonId).releaseCallback(args);
        } else {
            //console.log('No callback for releasing %s', this.buttonIdToName.get(buttonId));
        }
    }

    /**
     * Track the mouse position relative to the canvas.
     * @param {MouseEvent} e 
     */
    move(e) {
        this.x = e.clientX - this.canvas.getBoundingClientRect().left;
        this.y = e.clientY - this.canvas.getBoundingClientRect().top;
    }

    /**
     * Prevent the right click menu from opening over the canvas.
     * @param {MouseEvent} e 
     */
    menu(e) {
        if (
            this.x >= this.canvas.getBoundingClientRect().left &&
            this.x <= this.canvas.getBoundingClientRect().right &&
            this.y >= this.canvas.getBoundingClientRect().top &&
            this.y <= this.canvas.getBoundingClientRect().bottom
        ) {
            e.preventDefault();
        }
    }

    addButtonPressCallback(buttonName, callback, args) {
        const buttonId = this.buttonNameToId.get(buttonName);
        if (this.buttonMap.has(buttonId)) {
            this.buttonMap.get(buttonId).pressCallback = callback;
            this.buttonMap.get(buttonId).pressCallbackArgs = args;
            return true;
        } else {
            return false;
        }
    }

    addButtonReleaseCallback(buttonName, callback, args) {
        const buttonId = this.buttonNameToId.get(buttonName);
        if (this.buttonMap.has(buttonId)) {
            this.buttonMap.get(buttonId).releaseCallback = callback;
            this.buttonMap.get(buttonId).releaseCallbackArgs = args;
            return true;
        } else {
            return false;
        }
    }

    buttonIsHeld(buttonName) {
        if (!this.buttonNameToId.has(buttonName)) { return false; }
        const buttonId = this.buttonNameToId.get(buttonName);
        return this.buttonMap.get(buttonId).pressed;
    }
}