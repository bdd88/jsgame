export class util {
    /** Generate a random number in a given range, inclusive. */
    genRandNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /** Sleep for a given number of ms. Does not work well, don't use. */
    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}