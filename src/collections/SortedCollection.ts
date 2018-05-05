import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { IList } from "./IList";

import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Comparator } from "../core/index";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { Collection } from "./Collection";
import { ISortedCollection } from "./ISortedCollection";
import { List } from "./List";
export class SortedCollection<T> implements ISortedCollection<T> {
    private arr: T[] = [];
    constructor(private comparator: Comparator<T, T>, enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
            this.arr = this.arr.sort(this.comparator);
        }
    }

    public add(...items: T[]): void;
    public add(...rest: any[]) {
        for (const x of rest) {
            this.arr.push(x);
        }
        this.arr = this.arr.sort(this.comparator);
    }
    public remove(item: T): boolean {
        const found = this.indexOf(item);
        if (found > -1) {
            this.arr.splice(found, 1);
            this.arr = this.arr.sort(this.comparator);
            return true;
        }
        return false;
    }
    public clear(): boolean {
        this.arr.splice(0, this.arr.length);
        return true;
    }
    public contains(item: T): boolean {
        return this.arr.includes(item);
    }
    public get size(): number {
        return this.arr.length;
    }
    public get(index: number): T {
        return this.arr[index];
    }
    public indexOf(item: T): number {
        return this.arr.indexOf(item);
    }
    public lastIndexOf(item: T): number {
        return this.arr.lastIndexOf(item);
    }

    public join(seperator?: string) {
        let res = "";
        const that = this;
        seperator = seperator !== undefined ? seperator : " , ";
        if (that.size === 0 ) {
               return "";
            } else if (that.size === 1) {
                return (that[Symbol.iterator]().next().value as any).toString();
            } else {
             const itr: any = that[Symbol.iterator]();
             res = (itr.next().value as any).toString();
             for (const item of itr) {
                 res = res + seperator + (item as any).toString();
             }
           }
        return res;
    }
    public toArray(): T[] {
        const array: T[] = [];
        for (const xx of this.arr) {
            array.push(xx);
        }
        return array;
    }
    public toCollection(): ICollection<T> {
        return new Collection(this);
    }
    public toList(): IList<T> {
        return new List(this);
    }
    public linq(): IQueryable<T> {
        return new Enumerable<T>(this);
    }
    public plinq(): IParallelQueryable<T> {
        return new ParallelEnumerable<T>(this);
    }
    public [Symbol.iterator](): Iterator<T> {
        return this.arr[Symbol.iterator]();
    }
    public clone(): ISortedCollection<T> {
        return new SortedCollection(this.comparator, this);
    }

    public toSet(): Set<T> {
        return new Set(this);
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
}
