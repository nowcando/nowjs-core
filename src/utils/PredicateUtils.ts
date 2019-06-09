import { Predicate } from "../core";


export function negate<U, T extends Predicate<U>>(p: T): T {
    return function(): boolean {
        return !p.apply(this, arguments);
    } as any;
}

export function union<U, T extends Predicate<U>>(
    p: T,
    ...rest: T[]
): T {
    if (rest.length > 0) {
        return function() {
            return p.apply(this, arguments) || union.apply(this, rest).apply(this, arguments);
        } as any;
    }    else {
        return p;
    }
}
