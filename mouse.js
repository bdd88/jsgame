export class mouse {
    x = 0;
    y = 0;
    clickHeld = false;
    canvasX;
    canvasY;
    x1;
    y1;
    pressTime;
    x2;
    y2;
    dragTime;

    constructor(canvas) {
        this.canvasX = canvas.getBoundingClientRect().left;
        this.canvasY = canvas.getBoundingClientRect().top;
    }

    press(e) {
        this.clickHeld = true;
        this.x1 = this.x;
        this.y1 = this.y;
        this.pressTime = Date.now();
    }

    release(e) {
        this.clickHeld = false;
        this.x2 = this.x;
        this.y2 = this.y;
        this.dragTime = Date.now() - this.pressTime;
        this.pressTime = null;
    }

    move(e) {
        this.x = e.clientX - this.canvasX;
        this.y = e.clientY - this.canvasY;
    }
}