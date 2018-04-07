
// tslint:disable-next-line:no-empty-interface
import { IEnumerable } from "../core/index";
import { IParallelQueryable, IQueryable } from "../linq/index";

export interface ISortedMap<K, V> extends IEnumerable<[K, V]> {
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: ISortedMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): ISortedMap<K, V>;
    linq(): IQueryable<[K, V]>;
    plinq(): IParallelQueryable<[K, V]>;
    // tslint:disable-next-line:member-ordering
    size: number;

    isEmpty(): boolean;
}
