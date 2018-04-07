
import { IEnumerable } from "../core/IEnumerable";
import { Enumerable } from "../linq/Enumerable";
import { ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { IList } from "./IList";
import { List } from "./index";

export class Collection<T> implements ICollection<T> {
    private arr: T[] = [];
    constructor(enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
        }
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public add(item: T): void;
    public add(...items: T[]): void;
    public add(...items: any[]) {
        if (items instanceof Array) {
            for (const x of items) {
                this.arr.push(x);
            }
        } else {
            this.arr.push(items);
        }
    }
    public remove(item: T): boolean {
        const ix  = this.arr.indexOf(item);
        // tslint:disable-next-line:curly
        if (ix === -1 || ix > this.arr.length) return false;
        return this.arr.splice(ix, 1).length === 1;
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
    public clone(): ICollection<T> {
        return new Collection(this);
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
        const arr: T[] = [];
        for (const item of this) {
            arr.push(item);
        }
        return arr;
    }
    public toCollection(): ICollection<T> {
        return new Collection(this);
    }
    public toList(): IList<T> {
        return new List(this);
    }

    public toSet(): Set<T> {
        return new Set(this);
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

}
