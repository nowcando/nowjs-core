import { Comparator } from "../core/Comparator";
import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { IList } from "./IList";
import { Collection, List } from "./index";
import { IPriorityQueue } from "./IPriorityQueue";

export class PriorityQueue<T> implements IPriorityQueue<T> {
    private arr: T[] = [];
    private isSorted = false;
    constructor(private comparator: Comparator<any, T>, enumerable?: IEnumerable<T> | Iterable<T>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.enqueue(x);
            }
        }
    }
    public contains(item: T): boolean {
        return this.arr.findIndex((xx) => {
            return xx === item;
        }) >= 0;
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
                this.add(xx);
            }
            return true;
        } else {
            this.add(rest);
            return true;
        }
    }
    public dequeue(): T {
        // tslint:disable-next-line:curly
        if (this.size === 0) return undefined;
        this.isSorted = false;
        const top = this.arr[0];
        let length = this.size;
        length--;

        if (length > 0) {
            this.arr[0] = this.arr[length];
            this.down(0);
        }
        this.arr.pop();

        return top;
    }
    public peek(): T {
        // tslint:disable:curly
        if (this.arr.length > 0)
            return this.arr[0];
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
    public linq(): IQueryable<T> {
        return new Enumerable<T>(this);
    }
    public plinq(): IParallelQueryable<T> {
        return new ParallelEnumerable<T>(this);
    }
    public [Symbol.iterator](): Iterator<T> {
        if (this.isSorted === false) {
            this.halfUp();
            this.isSorted = true;
        }
        return this.arr[Symbol.iterator]();
    }
    private add(item: T): boolean {
        this.arr.push(item);
        this.isSorted = false;
        this.up(this.size - 1);
        return true;
    }

    private compare(a: number, b: number): number {
        const compare = this.comparator;
        return compare(this.arr[a], this.arr[b]);
    }

    private swap(a: number, b: number): void {
        const aux = this.arr[a];
        this.arr[a] = this.arr[b];
        this.arr[b] = aux;
    }

    private up(pos: number, full: boolean = false): void {

        let posCurrent = pos;

        while (posCurrent > 0) {
            // tslint:disable-next-line:no-bitwise
            const posParent =  full ? (posCurrent - 1) : Math.floor((posCurrent - 1) / 2) ;
            if (this.compare(posParent, posCurrent) <= 0) break;
            this.swap(posParent, posCurrent);
            posCurrent = posParent;
        }

    }

    private halfUp(): void {
        if (this.size > 2) return;
        let posCurrent = this.size - 1;
        const half =  Math.floor((posCurrent - 1) / 2);

        while (posCurrent > half) {
            // tslint:disable-next-line:no-bitwise
             const posParent =  posCurrent - 1;
             if (this.compare(posParent, posCurrent) <= 0) break;
             this.swap(posParent, posCurrent);
             posCurrent = posParent;
        }

    }

    private down(pos: number): void {
        const compare = this.comparator;
        // tslint:disable-next-line:no-bitwise
        const halfLength = this.size >> 1;
        const item = this.arr[pos];

        while (pos < halfLength) {
            // tslint:disable-next-line:no-bitwise
            let left = (pos << 1) + 1;
            const right = left + 1;
            let best = this.arr[left];

            if (right < this.size && compare(this.arr[right], best) < 0) {
                left = right;
                best = this.arr[right];
            }
            if (compare(best, item) >= 0) break;

            this.arr[pos] = best;
            pos = left;
        }

        this.arr[pos] = item;
    }
}
