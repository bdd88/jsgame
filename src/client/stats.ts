export class stats {

    ctx;
    fpsRecent = 0;
    fpsAvg = 0;
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
        this.frameTimes.push({timestamp: currentTime, framenumber: frames});
        let timespan = (currentTime - this.frameTimes[0].timestamp) / 1000;
        while (timespan > 1 && this.frameTimes.length > 0) {
            this.frameTimes.shift();
            timespan = (currentTime - this.frameTimes[0].timestamp) / 1000;
        }
        this.fpsRecent = Math.floor(this.frameTimes.length / timespan);
        // this.fpsAvg = Math.floor(frames / (currentTime / 1000));
    }

    displayFPS(x, y, size) {
        const frames = "Frames: " + this.frames;
        const time = "Time: " + Math.floor(this.time / 1000);
        const fpsRecent = "FPS: " + this.fpsRecent;
        // const fpsAvg = "FPS avg: " + this.fpsAvg;
        const pixels = "Pixels: " + this.pixels;
        this.ctx.fillStyle = 'black';
        this.ctx.font = size + "px Arial";
        this.ctx.fillText(fpsRecent, x, y);
        // this.ctx.fillText(fpsAvg, x, y + size);
        this.ctx.fillText(frames, x, y + (2 * size));
        this.ctx.fillText(time, x, y + (3 * size));
        this.ctx.fillText(pixels, x, y + (4 * size));
    }
}