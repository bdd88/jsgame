/*
1 pixel = 10 cm
10 pixels = 1 m
Gravity is ~9.81 meters per second squared.
So a realistic in game speed would be 98.1 pixels per second squared.
This makes a 1.8m (5'11") tall character about 18 pixels tall in game.
*/

export class physicsObject {
    xv = null;
    yv = null;
    x = null;
    y = null;
    gravity = 98.1;

    constructor(x, y, xv, yv) {
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.xy = yv;
    }

    addVelocity(xv, yv) {
        this.xv = this.xv + xv;
        this.yv = this.yv + yv;
    }

    multVelocity(xv, yv) {
        this.xv = this.xv * xv;
        this.yv = this.yv * yv;
    }

    
    applyPhysics(timestep) {
        // Account for gravity and time.
        this.addVelocity(0, this.gravity * timestep);
        this.x = this.x + (this.xv * timestep);
        this.y = this.y + (this.yv * timestep);
    }
}

class path {
    calcLine (x1, y1, x2, y2) {

        // Calculate the distance between the x and y values of each point.
        const xDistance = Math.abs(x2 - x1);
        const yDistance = Math.abs(y2 - y1);

        // Adjust for the direction of the slope.
        const xSlope = (x1 < x2) ? 1 : -1;
        const ySlope = (y1 < y2) ? 1 : -1;

        // Calculate the inital error value.
        let err = xDistance - yDistance;

        // Continue looping until the destination point is reached.
        while (!((x1 == x2) && (y1 == y2))) {

            // Double the error value to avoid float point values.
            const e2 = err << 1;

            
            if (e2 > -yDistance) {
                // Closer on the y axis, move closer on x axis.
                err -= yDistance;
                x1 += xSlope;
            } else if (e2 < xDistance) {
                // Closer on the x axis, move closer on y axis.
                err += xDistance;
                y1 += ySlope;
            }


        }

        return coordinatesArray;
    }
}