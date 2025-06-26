export class mouse {
    x = 0;
    y = 0;
    clickHeld = false;
    canvasX;
    canvasY;

    constructor(canvas) {
        this.canvasX = canvas.getBoundingClientRect().left;
        this.canvasY = canvas.getBoundingClientRect().top;
    }

    press(e) {
        this.clickHeld = true;
    }

    release(e) {
        this.clickHeld = false;
    }

    move(e) {
        this.x = e.clientX - this.canvasX;
        this.y = e.clientY - this.canvasY;
    }
}