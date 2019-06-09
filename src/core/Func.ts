
export type Action<T> =  (item: T) => void;

/**
 * Function for accept T type arg and return R type value
 */
export type Func<R, T> = (arg: T) => R;
/**
 * Predicate Functon
 */
export type Predicate<T> = Func<boolean, T>;
export type Selector<T> = Func<keyof T, T>;
