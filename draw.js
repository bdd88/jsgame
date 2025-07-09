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
    }

    drawLine(xStart, yStart, xStop, yStop, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xStop, yStop);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawRectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawText(x, y, color, size, font, string) {
        this.ctx.fillStyle = color;
        this.ctx.font = size + "px " + font;
        this.ctx.fillText(string, x, y);
    }

    drawEntities(entities) {
        //TODO: Draw entities with shapes, instead of just individual pixels.
        entities.forEach(
            (entity) => this.drawPixel(entity.x, entity.y, entity.color)
        );
    }

}
