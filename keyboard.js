export class keyboard {
    heldKeys;
    callbackOnPress;
    callbackOnRelease;

    constructor() {
        this.heldKeys = new Set();
        this.callbackOnPress = new Map();
        this.callbackOnRelease = new Map();
    }

    press(e) {
        if (this.callbackOnPress.has(e.key)) {
            const callback = this.callbackOnPress.get(e.key);
            callback();
        }
        this.heldKeys.add(e.key);
    }

    release(e) {
        if (this.callbackOnRelease.has(e.key)) {
            const callback = this.callbackOnRelease.get(e.key);
            callback();
        }
        this.heldKeys.delete(e.key);
    }
}