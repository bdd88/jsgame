/*
1 pixel = 10 cm
10 pixels = 1 m
Gravity is ~9.81 meters per second squared.
So a realistic in game speed would be 98.1 pixels per second squared.
This makes a 1.8m (5'11") tall character about 18 pixels tall in game.
*/

/**
 * An object with simulated physics based on real-world physics calculations.
 */
export class physicsObject {
    xv = null;
    yv = null;
    x = null;
    y = null;
    gravity = 98.1;

    /**
     * 
     * @param {integer} x Horizontal position.
     * @param {integer} y Veritical position.
     * @param {integer} xv Horizontal velocity.
     * @param {integer} yv Vertical velocity.
     */
    constructor(x, y, xv, yv) {
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
    }

    /**
     * Add a new vector to the current one.
     * @param {integer} xv Horizontal velocity.
     * @param {integer} yv Vertical velocity.
     */
    addVelocity(xv, yv) {
        this.xv = this.xv + xv;
        this.yv = this.yv + yv;
    }

    /**
     * Multiply a new vector with the current one.
     * @param {integer} xv Horizontal velocity.
     * @param {integer} yv Vertical velocity.
     */
    multVelocity(xv, yv) {
        this.xv = this.xv * xv;
        this.yv = this.yv * yv;
    }

    /**
     * Move an object based on position, velocity, time, and gravity.
     * @param {integer} timeDelta Time in MS since the last update.
     */
    applyPhysics(timeDelta) {
        /**
         * TODO:
         * - Mass
         * - Angular velocity
         * - Multi-body gravity
         */
        // Convert to seconds for easy calculations.
        const timestep = timeDelta / 1000;
        this.addVelocity(0, (this.gravity * timestep));
        this.x = this.x + (this.xv * timestep);
        this.y = this.y + (this.yv * timestep);
    }
}

// class path {
//     calcLine (x1, y1, x2, y2) {

//         // Calculate the distance between the x and y values of each point.
//         const xDistance = Math.abs(x2 - x1);
//         const yDistance = Math.abs(y2 - y1);

//         // Adjust for the direction of the slope.
//         const xSlope = (x1 < x2) ? 1 : -1;
//         const ySlope = (y1 < y2) ? 1 : -1;

//         // Calculate the inital error value.
//         let err = xDistance - yDistance;

//         // Continue looping until the destination point is reached.
//         while (!((x1 == x2) && (y1 == y2))) {

//             // Double the error value to avoid float point values.
//             const e2 = err << 1;

            
//             if (e2 > -yDistance) {
//                 // Closer on the y axis, move closer on x axis.
//                 err -= yDistance;
//                 x1 += xSlope;
//             } else if (e2 < xDistance) {
//                 // Closer on the x axis, move closer on y axis.
//                 err += xDistance;
//                 y1 += ySlope;
//             }


//         }

//         return coordinatesArray;
//     }
// }