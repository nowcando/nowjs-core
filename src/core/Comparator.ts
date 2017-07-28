export type Comparator<T, U> = (a: T, b: U) => number;
export type EqualityComparator<T, U> = (a: T, b: U) => boolean;

const numberComparator: Comparator<number, number> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

const stringComparator: Comparator<string, string> = (a, b) => {
    return  a.localeCompare(b);
};

const booleanComparator: Comparator<boolean, boolean> = (a, b) => {
    if (a === b) {
        return 0;
    } else {
        return -1;
    }
};

// tslint:disable-next-line:ban-types
const objectComparator: Comparator<Object, Object> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === 1) {
        return 0;
    } else {
        return -1;
    }
};

// tslint:disable-next-line:ban-types
const deepObjectComparator: Comparator<Object, Object> = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a === 1) {
        return 0;
    } else {
        return -1;
    }
};

export {numberComparator, stringComparator, deepObjectComparator,
    booleanComparator , objectComparator };
