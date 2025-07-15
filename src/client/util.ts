export class util {
    /**
     * Generate a random number in a given range, inclusive.
     * @param {integer} min Minimum value to return.
     * @param {integer} max Maximum value to return
     * @returns {integer}
     */
    genRandNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}