import { Func } from "./Func";
export interface IObjectDictionary<TValue> {
    [id: string]: TValue;
}
export type CallBack = (err?: Error, data?: any) => void;

export type Predicate<T> = Func<boolean, T>;
export type Selector<T> = Func<keyof T, T>;
