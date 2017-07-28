import { IEnumerable } from "../core/IEnumerable";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { ICollection } from "./ICollection";
import { ILinkedList } from "./ILinkedList";
import { IList } from "./IList";
import { Collection, List } from "./index";

// tslint:disable-next-line:interface-name
export interface LinkedListNode<E> {
    Current: E;
    Next?: LinkedListNode<E>;
    Previous?: LinkedListNode<E>;
}

export class LinkedList<E> implements ILinkedList<E> {
    // tslint:disable-next-line:ban-types
    private iterator: Function;
    // tslint:disable-next-line:ban-types
    private nodeIterator: Function;
    private length = 0;
    private lastNode: LinkedListNode<E>;
    private firstNode: LinkedListNode<E>;
    constructor(enumerable?: IEnumerable<E> | Iterable<E>) {
        if (enumerable && enumerable[Symbol.iterator]) {
            for (const x of enumerable) {
                this.add(x);
            }
        }
        this.iterator = function*(cn: LinkedList<E>) {
            let currentNode: LinkedListNode<E>;
            if (!currentNode) {
                currentNode = cn.firstNode;
            }
            do {
                const tmp = currentNode;
                currentNode = tmp.Next;
                yield tmp.Current;
            } while (currentNode.Next);
            yield currentNode.Current;
        };

        this.nodeIterator = function*(cn: LinkedList<E>) {
            let currentNode: LinkedListNode<E>;
            if (!currentNode) {
                currentNode = cn.firstNode;
            }
            do {
                const tmp = currentNode;
                currentNode = tmp.Next;
                yield tmp;
            } while (currentNode.Next);
            yield currentNode;
        };
    }
    public contains(item: E): boolean {
        throw new Error("Method not implemented.");
    }
    public get size(): number {
        return this.length;
    }
    public clear(): boolean {
        this.firstNode = null;
        this.lastNode = null;
        this.length = 0;
        return true;
    }
    // public add(item: E): boolean;
    public insert(index: number, item: E): boolean {
        return this.addInternal(item, index);
    }
    public add(...items: E[]): boolean;
    public add(...arg1: any[]): boolean {
        let res = false;

        if (Array.isArray(arg1)) {
            for (const item of arg1) {
                res = this.addInternal(item);
            }
        }
        return res;
    }

    public addFirst(item: E): boolean {
        return this.addInternal(item, 0);
    }
    public addLast(item: E): boolean {
        return this.addInternal(item);
    }
    public get(index: number): E {
        let ix = -1;
        for (const xx of this) {
            ix++;
            // tslint:disable-next-line:curly
            if (ix === index) return xx;
        }
        return null;
    }
    public set(index: number, item: E): void {
        const xx = this.getInterenal(index);
        // tslint:disable-next-line:curly
        if (xx) xx.Current = item;
    }
    public getFirst(): E {
        return this.firstNode.Current;
    }
    public getLast(): E {
        return this.lastNode.Current;
    }
    public indexOf(item: E): number {
        let ix = -1;
        for (const xx of this.nodeIterator(this)) {
            ix++;
            // tslint:disable-next-line:curly
            if (xx.Current === item) return ix;
        }
        return -1;
    }
    public lastIndexOf(item: E): number {
       let ix = -1;
       let lastIndex = -1;
       for (const xx of this.nodeIterator(this)) {
            ix++;
            // tslint:disable-next-line:curly
            if (xx.Current === item) {
                lastIndex = ix;
            }
        }
       return lastIndex;
    }
    public remove(item: E): boolean;
    public remove(item: any): boolean {
        return this.removeInternal(item);
    }
    public removeFirst(): boolean {
        throw new Error("Method not implemented.");
    }
    public removeLast(): boolean {
        throw new Error("Method not implemented.");
    }
    public clone(): ILinkedList<E> {
        throw new Error("Method not implemented.");
    }
    public toArray(): E[] {
        const array: E[] = [];
        for (const xx of this) {
            array.push(xx);
        }
        return array;
    }
    public toCollection(): ICollection<E> {
        return new Collection(this);
    }
    public toList(): IList<E> {
        return new List(this);
    }
    public linq(): IQueryable<E> {
        return new Enumerable<E>(this);
    }
    public plinq(): IParallelQueryable<E> {
        return new ParallelEnumerable<E>(this);
    }
    public [Symbol.iterator](): Iterator<E> {
        return this.iterator(this);
    }

    private getInterenal(index: number): LinkedListNode<E> {
        let ix = -1;
        for (const xx of this.nodeIterator(this)) {
            ix++;
            // tslint:disable-next-line:curly
            if (ix === index) return xx;
        }
        return null;
    }

    private getInterenalItem(item: any): LinkedListNode<E> {
        for (const xx of this.nodeIterator(this)) {
            // tslint:disable-next-line:curly
            if (xx.Current === item) return xx;
        }
        return null;
    }

    private removeInternal(item: E): boolean {
        const tmp = this.getInterenalItem(item);
        if (tmp) {
            const tnext = tmp.Next;
            const tprev = tmp.Previous;
            tprev.Next = tnext;
            tnext.Previous = tprev;
            this.length--;
            return true;
        } else {
            return false;
        }
    }

    private addInternal(item: E, index?: number) {
        const dataItem = item;
        const dataIndex = index;
        if (!this.firstNode) {
            this.firstNode = { Current: dataItem };
            this.lastNode = this.firstNode;
        } else {
            if (!dataIndex) {
                if (this.firstNode && !this.firstNode.Next) {
                    const tmp = this.lastNode;
                    this.lastNode = { Current: dataItem, Previous: tmp };
                    tmp.Next = this.lastNode;
                    this.firstNode.Next = this.lastNode;
                    this.firstNode.Previous = null;
                } else if (this.lastNode && !this.lastNode.Next) {
                    const tmp = this.lastNode;
                    this.lastNode = { Current: dataItem, Previous: tmp };
                    tmp.Next = this.lastNode;
                }
            } else {
                if (dataIndex === 0) {
                    const tmp = this.firstNode;
                    this.firstNode = { Current: dataItem, Next: tmp };
                    tmp.Previous = this.firstNode;
                } else if (dataIndex > 0) {
                    const tmp = this.getInterenal(dataIndex);
                    const tnext = tmp.Next;
                    const tprev = tmp.Previous;
                    const current = { Current: dataItem, Next: tnext, Previous: tprev };
                    tprev.Next = current;
                    tnext.Previous = current;
                }

            }
        }
        this.length++;
        return true;
    }

}
