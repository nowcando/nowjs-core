import { IEnumerable } from '../core/IEnumerable';
import { Enumerable, ParallelEnumerable } from '../linq/index';
import { IParallelQueryable } from '../linq/IParallelQueryable';
import { IQueryable } from '../linq/IQuerable';
import { Collection } from './Collection';
import { ICollection } from './ICollection';
import { IList } from './IList';
import { IQueue } from './IQueue';
import { List } from './List';
export class Queue<T> implements IQueue<T> {
    private arr: T[] = [];
    constructor(enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.enqueue(x);
            }
        }
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
    public contains(item: T): boolean {
        return (
            this.arr.findIndex(xx => {
                return xx === item;
            }) >= 0
        );
    }
    public get size(): number {
        return this.arr.length;
    }
    public clear(): boolean {
        this.arr = [];
        return true;
    }
    public enqueue(item: T): boolean;
    public enqueue(...items: T[]): boolean;
    public enqueue(...rest: any[]): any {
        if (rest instanceof Array) {
            for (const xx of rest) {
                this.arr.push(xx);
            }
            return true;
        } else {
            this.arr.push(rest);
            return true;
        }
    }
    public dequeue(): T {
        return this.arr.shift();
    }
    public peek(): T {
        // tslint:disable-next-line:curly
        if (this.arr.length > 0) return this.arr[0];
        // tslint:disable-next-line:curly
        else return null;
    }
    public toArray(): T[] {
        const array: T[] = [];
        for (const xx of this) {
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
    public clone(): IQueue<T> {
        return new Queue(this);
    }
}
