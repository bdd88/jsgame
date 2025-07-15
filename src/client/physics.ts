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

    calcLine (x1, y1, x2, y2) {

        // Set preference values based on distance to destination.
        const xPreferenceValue = Math.abs(x2 - x1);
        const yPreferenceValue = Math.abs(y2 - y1);

        // Set movement in the correct direction on each axis.
        const xDirection = (x1 < x2) ? 1 : -1;
        const yDirection = (y1 < y2) ? 1 : -1;

        // Preference indicates how close we are to the ideal line path.
        // Negative values indicate we are horizontally closer, and positive values indicate we are vertically closer.
        let preference = xPreferenceValue - yPreferenceValue;

        // Continue looping until the destination point is reached.
        while (!((x1 == x2) && (y1 == y2))) {

            console.log('Vertical distance: %i', yPreferenceValue);
            console.log('Horizontal distance: %i', xPreferenceValue);
            if (preference < 0) {
                console.log('Vertical preference (%i)', preference);
            } else {
                console.log('Horizontal preference (%i)', preference);
            }
            

            if (preference > -yPreferenceValue) {
                // Vertically closer, move horizontally.
                console.log('Moving horizontal: decreasing preference by yPreferenceValue (%i)', yPreferenceValue);
                preference -= yPreferenceValue;
                x1 += xDirection;
                console.log('Moving horizontally by %i to %i,%i', xDirection, x1, y1);
            } else if (preference < xPreferenceValue) {
                // Horizontally closer, move vertically.
                console.log('Moving vertical: increasing (vertical) preference by xPreferenceValue (%i)', xPreferenceValue);
                preference += xPreferenceValue;
                y1 += yDirection;
                console.log('Moving vertically by %i to %i,%i', yDirection, x1, y1);
            }
            //TODO: Add random chance when all choices are equal.
        }
        return;
    }
}

// const test = new physicsObject(0, 0, 0, 0);
// let path = test.calcLine(0,0,10,15);
// console.log(path);