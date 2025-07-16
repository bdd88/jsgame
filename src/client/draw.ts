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

import { entities } from "./entities.js";
import { entity } from "./entity.js";

export class draw {
    ctx: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;
    }

    /** Draw a single pixel. */
    drawPixel(x: number, y: number, color: string) {
        this.drawRectangleFilled(x, y, 1, 1, color);
    }

    /** Draw a line segment. */
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /** Draw a filled rectangle. */
    drawRectangleFilled(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    /** Draw a hollow rectangle. */
    drawRectangleHollow(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        // Offset the path to eleminate anti-aliasing and incorrect positioning.
        this.ctx.rect(x + 0.5, y + 0.5, width -1, height -1);
        this.ctx.stroke();
    }

    /** Draw text. */
    drawText(x: number, y: number, color: string, size: number, font: string, text: string) {
        this.ctx.fillStyle = color;
        this.ctx.font = size + "px " + font;
        this.ctx.fillText(text, x, y);
    }

    /** Draw each entity in the entities list. */
    drawEntities(entities: Set<entity>) {
        //TODO: Draw entities with shapes, instead of just individual pixels.
        entities.forEach(
            (entity) => this.drawPixel(entity.x, entity.y, entity.color)
        );
    }

}
