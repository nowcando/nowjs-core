import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { IList } from "./IList";
import { IReadonlyCollection } from "./IReadonlyCollection";

export class ReadonlyCollection<T> implements IReadonlyCollection<T> {
    private arr: T[] = [];
    constructor(enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.arr.push(x);
            }
        }
    }
    public contains(item: T): boolean {
        throw new Error("Method not implemented.");
    }
    public get size(): number {
        return this.arr.length;
    }
    public get(index: number): T {
        throw new Error("Method not implemented.");
    }
    public indexOf(item: T): number {
        throw new Error("Method not implemented.");
    }
    public lastIndexOf(item: T): number {
        throw new Error("Method not implemented.");
    }
    public toArray(): T[] {
        throw new Error("Method not implemented.");
    }
    public toCollection(): ICollection<T> {
        throw new Error("Method not implemented.");
    }
    public toList(): IList<T> {
        throw new Error("Method not implemented.");
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
