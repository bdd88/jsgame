export class keyboard {
    heldKeys: Set<string>;
    callbackOnPress: Map<string,Function>;
    callbackOnRelease: Map<string,Function>;

    constructor() {
        this.heldKeys = new Set();
        this.callbackOnPress = new Map();
        this.callbackOnRelease = new Map();
    }

    press(e: KeyboardEvent) {
        if (this.callbackOnPress.has(e.key)) {
            if (this.callbackOnPress.get(e.key) === undefined) { return false; }
            const callback = this.callbackOnPress.get(e.key) as Function;
            callback();
        }
        this.heldKeys.add(e.key);
    }

    release(e: KeyboardEvent) {
        if (this.callbackOnRelease.has(e.key)) {
            if (this.callbackOnRelease.get(e.key) === undefined) { return false; }
            const callback = this.callbackOnRelease.get(e.key) as Function;
            callback();
        }
        this.heldKeys.delete(e.key);
    }
}