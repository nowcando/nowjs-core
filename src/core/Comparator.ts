export type Comparator<T, U> = (a: T, b: U) => number;
export type EqualityComparator<T, U> = (a: T, b: U) => boolean;

/**
 * Number comparator
 * @param a
 * @param b
 */
const numberComparator: Comparator<number, number> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

/**
 * String comparator
 * @param a
 * @param b
 */
const stringComparator: Comparator<string, string> = (a, b) => {
    return a.localeCompare(b);
};

/**
 * Boolean comparator
 * @param a
 * @param b
 */
const booleanComparator: Comparator<boolean, boolean> = (a, b) => {
    if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

/**
 * Object comprator
 * @param a
 * @param b
 */
// tslint:disable-next-line:ban-types
const objectComparator: Comparator<Object, Object> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

/**
 * Deep object comparator
 * @param a
 * @param b
 */
const deepObjectComparator: Comparator<object, object> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

/**
 * Checks eqality between two value with any value type such as
 *  (string , number , function , object , array , date , ...) value types.
 * It uses the valueOf method to compare any object implemented too .
 * @template T first value Type
 * @template U second value Type
 * @param {T} x first value
 * @param {U} y second value
 * @returns {boolean} returns a boolean as  result of equality checking.
 */
function isEquals<T, U>(x: T, y: U): boolean {

    if (x === null || x === undefined || y === null || y === undefined) { return (x as any) === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return (x as any) === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return (x as any) === y; }
    if ((x as any) === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== (y as any).length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    const p = Object.keys(x);
    return Object.keys(y).every((i) => p.indexOf(i) !== -1) &&
        p.every((i) => isEquals((x as any)[i], (y as any)[i]));

 }

export {
    numberComparator, stringComparator, deepObjectComparator,
    booleanComparator, objectComparator, isEquals,
};
