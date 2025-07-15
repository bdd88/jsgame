import { draw } from "./draw";
import { stats } from "./stats";
import { util } from "./util";
import { pauseButton } from "./menu";
import { entities } from "./entities";
import { controls } from "./controls";
import { mouse } from "./mouse";
import { keyboard } from "./keyboard";
import { weather } from "./weather";
import { matter } from "./matter/matter";

class game {
  width: number = 1000;
  height: number = 1000;
  framerateLimit: number = 200;

  frames: number = 0;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  draw: draw;
  util: util;
  matter: matter;
  weather: weather;
  stats: stats;
  mouse: mouse;
  keyboard: keyboard;
  entities: entities;
  timestep: number;
  nextFrameTime: number;
  controls: controls;

  /**
   * @param {HTMLElement} canvas
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.draw = new draw(this.ctx);
    this.stats = new stats(this.ctx);
    this.util = new util();
    this.mouse = new mouse(this.canvas);
    this.keyboard = new keyboard();
    this.entities = new entities(this.util);
    this.controls = new controls(this.mouse, this.keyboard, this.entities);

    // Start the main animation loop.
    this.timestep = 1000 / this.framerateLimit;
    this.nextFrameTime = 0;
    window.requestAnimationFrame(this.main);
  }

  /**
   * Update entities, physics, and AI.
   *
   * @param {DOMHighResTimeStamp} timestamp
   */
  update = (timestamp) => {
    const timeDelta = timestamp - this.lastTimestamp;
    this.entities.update(timeDelta);
    //TODO: this.ai.update(timeDelta);
  };

  /**
   * Clear the canvas, and draw the new frame.
   *
   * @param {DOMHighResTimeStamp} timestamp
   */
  drawFrame = (timestamp) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw.drawEntities(this.entities.list);
    this.frames += 1;
    this.stats.update(timestamp, this.frames, this.entities.list.size);
    this.menus();
    this.stats.displayFPS(10, 25, 25);
    this.lastTimestamp = timestamp;
    this.nextFrameTime = timestamp + this.timestep;
  };

  //TODO: Remove
  menus = () => {
    this.pauseButtom = new pauseButton(
      this.mouse,
      this.draw,
      this.togglePause,
      [],
      500,
      100
    );
    this.pauseButtom.display();
    if (this.pauseButtom.checkIfClicked() === true) {
      this.controls.togglePause();
    }
  };

  main = (timestamp) => {
    if (timestamp >= this.nextFrameTime) {
      if (this.controls.paused === false) {
        // Only run calculations when unpaused.
        this.update(timestamp);
      }
      // Draw new frames based on game framerateLimit.
      this.drawFrame(timestamp);
    }
    // Always request the next animation frame, even if a new frame wasn't drawn.
    // This keeps the client framerate smooth, and avoids the need for a sleep function.
    window.requestAnimationFrame(this.main);
  };
}

// Start the game on the "game" canvas.
const canvas = document.getElementById("game");
const instance = new game(canvas);
