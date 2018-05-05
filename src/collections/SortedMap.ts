import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Comparator } from "../core/index";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ISortedMap } from "./ISortedMap";

export class SortedMap<K, V> implements ISortedMap<K, V> {
    private arr: Array<[K, V]> = [];
    constructor(private comparator: Comparator<[K, V], [K, V]>, enumerable?: IEnumerable<[K, V]> | Iterable<[K, V]>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.set(x[0], x[1]);
            }
        }
    }
    // tslint:disable-next-line:member-ordering
    public [Symbol.toStringTag]: "SortedMap";
    public [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.arr[Symbol.iterator]();
    }
    public entries(): IterableIterator<[K, V]> {
        return this.arr[Symbol.iterator]();
    }
    public keys(): IterableIterator<K> {
        const that = this;
        const itr: any = {
            [Symbol.iterator]: () => {
                const enb = that[Symbol.iterator]();
                return {
                        next: () => {
                        const item = enb.next();
                        return { value: item.value[0], done: item.done };
                     },
                };
            },
        };

        return itr;
    }
    public values(): IterableIterator<V> {
        const that = this;
        const itr: any = {
            [Symbol.iterator]: () => {
                const enb = that[Symbol.iterator]();
                return {
                        next: () => {
                        const item = enb.next();
                        return { value: item.value[1], done: item.done };
                     },
                };
            },
        };

        return itr;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
    public clear(): void {
        this.arr.splice(0, this.arr.length);
    }
    public delete(key: K): boolean {
        const foundedIndex = this.arr.findIndex((item) => key === item[0]);
        if (foundedIndex > -1) {
            this.arr.splice(foundedIndex, 1);
            this.arr = this.arr.sort(this.comparator);
            return true;
        }
        return false;
    }
    public forEach(callbackfn: (value: V, key: K, map: ISortedMap<K, V>) => void, thisArg?: any): void {
         this.arr.forEach((item, index, col) => { callbackfn(item[1], item[0], this); });
    }
    public get(key: K): V {
       const founded = this.arr.find((item) => key === item[0]);
       // tslint:disable-next-line:curly
       if (founded) return founded[1];
       return null;
    }
    public has(key: K): boolean {
        return this.arr.findIndex((item) => key === item[0]) > -1;
    }
    public set(key: K, value: V): ISortedMap<K, V> {
        if (this.has(key)) {
            const founded = this.arr.find((item) => key === item[0]);
            // tslint:disable-next-line:curly
            if (founded) {
                founded[0] = key;
                founded[1] = value;
                this.arr = this.arr.sort(this.comparator);
            }
        } else {
            this.arr.push([key, value]);
            this.arr = this.arr.sort(this.comparator);
        }
        return this;
    }
    public get size(): number {
        return this.arr.length;
    }
    public linq(): IQueryable<[K, V]> {
        return new Enumerable<[K, V]>(this);
    }
    public plinq(): IParallelQueryable<[K, V]> {
        return new ParallelEnumerable<[K, V]>(this);
    }
    public clone(): ISortedMap<K, V> {
        return new SortedMap(this.comparator, this);
    }
}
