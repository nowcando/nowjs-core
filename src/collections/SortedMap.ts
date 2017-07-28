import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import {IParallelQueryable} from "../linq/IParallelQueryable";
import {IQueryable} from "../linq/IQuerable";
import { ISortedMap } from "./ISortedMap";

export class SortedMap<K, V> implements ISortedMap<K, V> {
    private arr: Array<[K, V]> = [];
    constructor(selector: Func<any, [K, V]> , enumerable?: IEnumerable<[K, V]> | Iterable<[K, V]>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
        }
    }
   // tslint:disable-next-line:member-ordering
   public [Symbol.toStringTag]: "Map";
   public [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.arr[Symbol.iterator]();
    }
   public entries(): IterableIterator<[K, V]> {
        throw new Error("Method not implemented.");
    }
   public keys(): IterableIterator<K> {
        throw new Error("Method not implemented.");
    }
   public values(): IterableIterator<V> {
        throw new Error("Method not implemented.");
    }
   public clear(): void {
        throw new Error("Method not implemented.");
    }
   public delete(key: K): boolean {
        throw new Error("Method not implemented.");
    }
   public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
   public get(key: K): V {
        throw new Error("Method not implemented.");
    }
   public has(key: K): boolean {
        throw new Error("Method not implemented.");
    }
   public set(key: K, value: V): this {
        throw new Error("Method not implemented.");
    }
   public get size(): number{
       return this.arr.length;
   }
   public linq(): IQueryable<[K, V]> {
        throw new Error("Method not implemented.");
    }
   public plinq(): IParallelQueryable<[K, V]> {
        throw new Error("Method not implemented.");
    }

}
