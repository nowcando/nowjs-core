function mathClamp(x: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, x));
}
function mathFscale(x: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number {
    return Math.fround(Math.scale(x, inLow, inHigh, outLow, outHigh));
}
function mathScale(x: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number {
    if (
        arguments.length === 0 ||
        x !== x ||
        inLow !== inLow ||
        inHigh !== inHigh ||
        outLow !== outLow ||
        outHigh !== outHigh
    ) {
        return NaN;
    }
    if (x === Infinity || x === -Infinity) {
        return x;
    }
    return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
}
function mathRadians(degrees: number): number {
    return degrees * Math.DEG_PER_RAD;
}
function mathDegrees(radians: number): number {
    return radians * Math.RAD_PER_DEG;
}

Math.DEG_PER_RAD = Math.PI / 180;
Math.RAD_PER_DEG = 180 / Math.PI;

Math.clamp = mathClamp;
Math.fscale = mathFscale;
Math.scale = mathScale;
Math.radians = mathRadians;
Math.degrees = mathDegrees;
