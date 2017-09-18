import { MemoryParallelQueryableProvider } from "./MemoryParallelQueryableProvider";

// tslint:disable-next-line:no-namespace
import { Enumerable } from "./Enumerable";
import { IParallelQueryable, IQueryable } from "./index";
import { ParallelEnumerable } from "./ParallelEnumerable";

function getEunmerable(): Enumerable<any> {
    return new Enumerable<any>(this);
}
function getParallelEunmerable(): ParallelEnumerable<any> {
    return new ParallelEnumerable<any>(this, new MemoryParallelQueryableProvider());
}
function contains(item: any): boolean {
    return this.includes(item);
}
function hasDuplicate(): boolean {
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:prefer-const
    let len = this.length,
    out: Array<{item: any, count: number}> = [],
    counts: Array<{item: any, count: number}> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = {item: item1, count: 0};
            counts.push(found);
        }
        found.count++;
        if (found.count > 1) { return true; }
    }

    return false;
}
function findDuplicates(): any[] {

    let len = this.length,
        out: Array<{ item: any, count: number }> = [],
        counts: Array<{ item: any, count: number }> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = {item: item1, count: 0};
            counts.push(found);
        }
        found.count++;
        if (found.count === 2) { out.push(item1); }
    }

    return out;
}
function itemCount(): Array<{ item: any, count: number }> {

    let len = this.length,
        counts: Array<{ item: any, count: number }> = [];

    for (let i = 0; i < len; i++) {
        let item1 = this[i];
        let found = counts.find((xx) => xx.item === item1);
        if (!found) {
            found = {item: item1, count: 0};
            counts.push(found);
        }
        found.count++;
    }

    return counts;
}
function toUnique(): any[] {
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:prefer-const
    let a = [];
    // tslint:disable:curly
    for (let i = 0, l = this.length; i < l; i++)
        if (a.indexOf(this[i]) === -1)
            a.push(this[i]);
    return a;
}

Array.prototype.toUnique = toUnique;
Array.prototype.itemCount = itemCount;
Array.prototype.findDuplicates = findDuplicates;
Array.prototype.hasDuplicate = hasDuplicate;
Array.prototype.contains = contains;
Array.prototype.linq = getEunmerable;
Array.prototype.plinq = getParallelEunmerable;
Map.prototype.linq = getEunmerable;
Map.prototype.plinq = getParallelEunmerable;
WeakMap.prototype.linq = getEunmerable;
WeakMap.prototype.plinq = getParallelEunmerable;
Set.prototype.linq = getEunmerable;
Set.prototype.plinq = getParallelEunmerable;
WeakSet.prototype.linq = getEunmerable;
WeakSet.prototype.plinq = getParallelEunmerable;
