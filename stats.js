export class stats {

    ctx;
    fpsRecent = 0;
    fpsTotal = 0;
    frameTimes = [];
    frames = 0;
    time = 0;
    pixels = 0;

    constructor(context) {
        this.ctx = context;
    }

    update(currentTime, frames, pixels) {
        this.time = currentTime;
        this.frames = frames;
        this.pixels = pixels;
        this.frameTimes.push([currentTime, frames]);
        while (this.frameTimes.size > 250) {
            this.frameTimes.shift();
        }
        const timespan = (currentTime - this.frameTimes[0][0]) / 1000;
        this.fpsRecent = Math.floor(this.frameTimes.length / timespan);
        this.fpsTotal = Math.floor(frames / (currentTime / 1000));
    }

    displayFPS(x, y, size) {
        const frames = "Frames: " + this.frames;
        const time = "Time: " + Math.floor(this.time / 1000);
        //const lag = "Lag: " + this.framesLate;
        const fpsRecent = "FPS(recent): " + this.fpsRecent;
        const fpsTotal = "FPS(total): " + this.fpsTotal;
        const pixels = "Pixels: " + this.pixels;
        this.ctx.fillStyle = 'black';
        this.ctx.font = size + "px Arial";
        this.ctx.fillText(fpsRecent, x, y);
        this.ctx.fillText(fpsTotal, x, y + size);
        this.ctx.fillText(frames, x, y + (2 * size));
        this.ctx.fillText(time, x, y + (3 * size));
        this.ctx.fillText(pixels, x, y + (4 * size));
    }
}