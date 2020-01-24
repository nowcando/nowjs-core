/**
 * Generate random bytes by special length
 * @param length random bytes
 */
export const randomBytes = (length: number) => {
    const window = (globalThis as any) || {};
    if (window.crypto || (window as any).msCrypto) {
        const r = new Uint32Array(length);
        window.crypto.getRandomValues(r);
        return r;
    } else {
        if (process && process.env) {
            const crypto = require('crypto');
            return crypto.randomBytes(length);
        } else {
            const r: number[] = [];
            for (let ix = 0; ix < length; ix++) {
                r.push(Math.floor(Math.random() * 255));
            }
            return r;
        }
    }
};
export function secureMathRandom() {
    // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
    return randomBytes(1)[0] / 4294967295;
}

/**
 * Generate a random  value between min and max value
 * @param min min value for random value
 * @param max max value for random value
 */
export function random(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

/**
 * Generate a random integer value between min and max value
 * @param min min value for random value
 * @param max max value for random value
 */
export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
