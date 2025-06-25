// 1 pixel = 1 cm
// 100 pixels = 1 m
// Gravity is 9.81 meters per second squared.
const GRAVITY = 981;

class game {
    activePixels = [];
    time;
    width = 1000;
    height = 1000;
    tickrate = 120;
    grid;
    weather;
    pixelCount = 0;
    mouseX = 0;
    mouseY = 0;
    timestep = null;

    DIRECTION_OFFSETS = {
        upLeft:    [-1, -1],
        up:        [ 0, -1],
        upRight:   [ 1, -1],
        left:      [-1,  0],
        center:    [ 0,  0],
        right:     [ 1,  0],
        downLeft:  [-1,  1],
        down:      [ 0,  1],
        downRight: [ 1,  1]
    };

    MOVEMENT_DIRECTIONS = ["upLeft", "up", "upRight", "left", "right", "downLeft", "down", "downRight"];


    constructor() {

        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        document.addEventListener('mousedown', this.mouseClickPress.bind(this))
        document.addEventListener('mouseup', this.mouseClickRelease.bind(this))
        document.addEventListener('mousemove', this.mouseMove.bind(this))

        this.mouseClickHeld = false;
        this.grid = this.createPixelGrid(1000, 1000);
        this.timestep = 1000 / this.tickrate;
        this.time = 0;
        this.frame = 0;
        this.framesLate = 0;
        this.main = this.main.bind(this);
        window.requestAnimationFrame(this.main);
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    createPixelGrid(width, height) {
        const grid = Array.from({ length: width }, () => 
            Array.from({ length: height }, () => 
                null
            )
        );
        return grid;
    }

    getMousePos(e) {
        let canvasPos = this.canvas.getBoundingClientRect();
        let x = e.clientX - canvasPos.left;
        let y = e.clientY - canvasPos.top;
        let pos = [x, y];
        return pos;
    }

    mouseClickPress(e) {
        this.mouseClickHeld = true;
    }

    mouseClickRelease(e) {
        this.mouseClickHeld = false;
    }

    mouseMove(e) {
        let canvasPos = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - canvasPos.left;
        this.mouseY = e.clientY - canvasPos.top;
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

    getGridObject(x, y) {
        //console.log("getGridObject" + x + " " + y);
        if (typeof this.grid[x][y] == 'undefined') {
            return null;
        } else {
            return this.grid[x][y];
        }
    }

    setGridObject(x, y, object) {
        //console.log(x + " " + y);
        this.grid[x][y] = object;
        return true;
    }

    getRelativePos(x, y, direction, buffer) {
        const offset = this.DIRECTION_OFFSETS[direction];
        buffer[0] = x + offset[0];
        buffer[1] = y + offset[1];
        return buffer;
    }

    look(x, y, direction) {
        let targetPos = [];
        targetPos = this.getRelativePos(x, y, direction, targetPos);

        // Stop at the bounds of the screen.
        if (targetPos[0] >= (this.width - 1) ||
            targetPos[1] >= (this.height - 1) || 
            targetPos[0] <= 0 ||
            targetPos[1] <= 0
        ) {
            return false;
        }

        // See if the space is empty.
        if (this.getGridObject(targetPos[0], targetPos[1]) != null) {
            return false;
        }

        return true;
    }

    move(x, y, direction) {
        let targetPos = [];
        targetPos = this.getRelativePos(x, y, direction, targetPos);
        this.setGridObject(targetPos[0], targetPos[1], this.getGridObject(x, y));
        this.setGridObject(x, y, null);
    }

    updateFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.createPixels();
        this.displayFPS([5,25], 25);
        let updated = [];
        while (this.activePixels.length > 0) {
            const pixel = this.activePixels.pop();
            pixel.addVelocity(0, GRAVITY * this.timeStep);
        }
    }

    createPixels() {
        if (this.mouseClickHeld === true) {
            //console.log('Spawning...');
            const x = this.mouseX;
            const y = this.mouseY;
            if (this.look(x, y, 'center') === true) {
                this.setGridObject(x, y, new sand());
                this.activePixels.push([x, y]);
            }
        }

        const randomNumber = this.generateRandomNumber(0,1000);
        const waterDrop = this.setGridObject(randomNumber, 1, new water());
        this.activePixels.push(randomNumber, 1);
        if (waterDrop === true) {
            this.pixelCount += 1;
        }
    }

    mouseDisplacement(size) {
        const x = this.mouseX;
        const y = this.mouseY;
        // Only displace if we are actually on the canvas.
        if (x < (this.width) &&
            y < (this.height) && 
            x >= 0 &&
            y >= 0
        ) {
            const pixel = this.getGridObject(x, y);
            if (pixel != null) {
                console.log("Displacing at: " + x + " " + y);
                // move downLeft or downRight
                this.moveDownward(x, y);
                // move left or right
                // move upLeft or upRight
                // move up
            }
        }
    }

    // Move a pixel down, or a 50/50 chance of downLeft/downRight.
    moveDownward(x, y) {
        if (this.look(x, y, 'down') === true) {
            //console.log("Moving pixel down: " + x + " " + y);
            this.move(x, y, 'down');
        } else {
            let downLeft = this.look(x, y, 'downLeft');
            let downRight = this.look(x, y, 'downRight');
            if (downLeft === true && downRight === true) {
                const direction = Math.random() < 0.5 ? 'downLeft' : 'downRight';
                this.move(x, y, direction);
                return true
            } else if (downLeft === true) {
                this.move(x, y, 'downLeft');
                return true;
            } else if (downRight === true) {
                this.move(x, y, 'downRight');
                return true;
            } else {
                return false;
            }
        }
    }

    moveSideways(x, y) {

    }

    moveUpward() {

    }


    applyPhysics() {
        //console.log("applying physics");
        // Re-use a single buffer array for position lookups, to avoid creating new arrays ad-nauseum.
        let targetPos = [];
        for (let y = 999; y > 0; y--) {
            for (let x = 999; x > 0; x--) {
                let pixelObject = this.getGridObject(x, y);
                if (pixelObject != null) {
                    this.moveDownward(x, y);
                }
            }
        }
    }

    displayFPS(pos, size) {
    //let text = "Frame:" + this.frame + " | Time:" + Math.floor(this.time / 1000) + " | FPS:" + Math.floor(this.frame / (this.time / 1000)) + " | Lag:" + this.framesLate
    const fps = "FPS: " + Math.floor(this.frame / (this.time / 1000))
    const pixels = "Pixels: " + this.pixelCount;
    let displayText = fps + " " + pixels;
    this.ctx.fillStyle = 'black';
    this.ctx.font = size + "px Arial";
    this.ctx.fillText(fps, pos[0], pos[1]);
    this.ctx.fillText(pixels, pos[0], pos[1] + size);
    }

    main(currentTime) {
        if (currentTime >= (this.frame * this.timestep)) {
            this.updateFrame();
            this.frame += 1;
            if (currentTime >= (this.frame + 1) * this.timestep) {
                this.framesLate += 1;
            }
        }
        this.time = currentTime;
        window.requestAnimationFrame(this.main);
    }

}

class physicsObject {
    velocityX = 0;
    velocityY = 0;
    positionX = null;   
    positionY = null;

    addVelocity(x, y) {
        this.velocityX += x;
        this.velocityY += y;
    }

    multVelocity(x, y) {
        this.velocityX *= x;
        this.velocityY *= y;
    }

    updatePosition(time) {
        this.positionX += this.velocityX * time;
        this.positionY += this.velocityY * time;
        return true;
    }
}

class matter extends physicsObject {
    name = null;
    type = "matter";
    color = null;
    x = null;
    y = null;
    direction = 0;
}

class sand extends matter {
    name = "sand";
    color = "red";
}

class weather {
    type = "weather";
}

class snow extends weather {
    name = "snow";
    color = "grey";
}

class rainstorm extends weather {
    name = "rain";
    material = water;
    frequency = 1;
}

class liquid extends matter {
    type = "liquid";
    spread = 10;
}

class water extends liquid {
    name = "water";
    color = "blue";
}

const gameInstance = new game();