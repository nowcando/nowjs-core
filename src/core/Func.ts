
export type Action<T> =  (item: T) => void;

export type Func<R, T> = (arg: T) => R;
