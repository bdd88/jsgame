// DIRECTION_OFFSETS = {
//     upLeft:    [-1, -1],
//     up:        [ 0, -1],
//     upRight:   [ 1, -1],
//     left:      [-1,  0],
//     center:    [ 0,  0],
//     right:     [ 1,  0],
//     downLeft:  [-1,  1],
//     down:      [ 0,  1],
//     downRight: [ 1,  1]
// };

export class draw {
    ctx;

    constructor(context) {
        this.ctx = context;
    }

    drawPixel(x, y, color) {
        this.drawRectangle(x, y, 1, 1, color);
        return true;
    }

    drawLine(xStart, yStart, xStop, yStop, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xStop, yStop);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        return true;
    }

    drawRectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        return true;
    }

    drawPixelMap(pixelMap) {
        pixelMap.forEach((pixel) => this.drawPixel(pixel.x, pixel.y, pixel.color));
        return;
    }
}
