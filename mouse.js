export class mouse {
    x = 0;
    y = 0;
    clickHeld = false;
    canvas;
    x1;
    y1;
    pressTime;
    x2;
    y2;
    dragTime;
    callbackOnHeld;

    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {Function} callback 
     */
    constructor(canvas, callback) {
        this.canvas = canvas;
        this.callbackOnHeld = callback
    }

    /**
     * Track button presses on the mouse.
     * @param {MouseEvent} e 
     */
    press(e) {
        this.clickHeld = true;
        this.x1 = this.x;
        this.y1 = this.y;
        this.pressTime = Date.now();
    }

    /**
     * Track button releases on the mouse.
     * @param {MouseEvent} e 
     */
    release(e) {
        this.clickHeld = false;
        this.x2 = this.x;
        this.y2 = this.y;
        this.dragTime = Date.now() - this.pressTime;
        this.pressTime = null;
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
}