import { IParallelOrderedQueryable } from './IParallelOrderedQueryable';

import { ICollection } from '../collections/ICollection';
import { IList } from '../collections/IList';
import { IGroup } from './IGroup';

import { IAsyncEnumerable } from '../core/IAsyncEnumerable';
import { IParallelQueryable } from './IParallelQueryable';
import { IParallelQueryableProvider } from './IParallelQueryableProvider';
export class MemoryParallelQueryableProvider<T> implements IParallelQueryableProvider<T> {
    // tslint:disable:no-empty
    public get name(): string {
        return 'Memory';
    }
    // tslint:disable:max-line-length
    public async aggregate(
        action: (seed: T, item: T, index?: number, source?: IAsyncEnumerable<T>) => T,
        seed?: T,
    ): Promise<T> {
        throw new Error('Method not implemented.');
    }
    public async all(predicate?: (arg: T) => boolean): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public async any(predicate?: (arg: T) => boolean): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public async first(predicate?: (arg: T) => boolean, defValue?: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    public async last(predicate?: (arg: T) => boolean, defValue?: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    public async single(predicate: (arg: T) => boolean, defValue?: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    public async contains(item: T): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public async isEmpty(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public skip(count: number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public skipWhile(predicate: (arg: T) => boolean): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public take(count: number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public takeWhile(predicate: (arg: T) => boolean): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public distinct(): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public reverse(): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public shuffles(count?: number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public asParallelEnumerable(): IAsyncEnumerable<T> {
        throw new Error('Method not implemented.');
    }
    public select<TResult>(selector?: (arg: T) => TResult): IParallelQueryable<TResult> {
        throw new Error('Method not implemented.');
    }
    public selectMany<TResult>(selector: (arg: T) => IAsyncEnumerable<TResult>): IParallelQueryable<TResult>;
    public selectMany<TCollection, TResult>(
        selector: (arg: T) => IAsyncEnumerable<TResult>,
        collectionSelector?: (arg: TCollection) => TResult,
    ): IParallelQueryable<TResult>;
    public selectMany(selector: any, collectionSelector?: any): any {
        throw new Error('Method not implemented.');
    }
    public join<TOuter, TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerSelector: (arg: TOuter) => TKey,
        innerSelector: (arg: TInner) => TKey,
        resultSelector: (innerItem: TInner, outerItem: TOuter) => TResult,
    ): IParallelQueryable<TResult> {
        throw new Error('Method not implemented.');
    }
    public where(predicate: (arg: T) => boolean): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public except(predicate: (arg: T) => boolean): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public orderBy<TSelected>(
        selector: (arg: T) => TSelected,
        comparator?: (a: T, b: T) => number,
    ): IParallelOrderedQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public orderByDesc<TSelected>(
        selector: (arg: T) => TSelected,
        comparator?: (a: T, b: T) => number,
    ): IParallelOrderedQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public groupBy<TKey>(keySelector: (arg: T) => TKey): IParallelQueryable<IGroup<TKey, T>> {
        throw new Error('Method not implemented.');
    }
    public async count(predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async average(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async max(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async min(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async sum(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async stdDev(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async stdDevP(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async variance(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async range(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async varianceP(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async percentile(
        percentile: number,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async percentileInclusive(
        percentile: number,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async percentileExclusive(
        percentile: number,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async percentRank(
        value: number,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async mean(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async median(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async mode(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async covariance(
        other: IParallelQueryable<T>,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async pearson(
        other: IParallelQueryable<T>,
        selector?: (arg: T) => number,
        predicate?: (arg: T) => boolean,
    ): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async rootMeanSquare(selector?: (arg: T) => number, predicate?: (arg: T) => boolean): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public forEach(action: (element: T, index: number) => void): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async toArray(): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
    public async toList(): Promise<IList<T>> {
        throw new Error('Method not implemented.');
    }
    public async toCollection(): Promise<ICollection<T>> {
        throw new Error('Method not implemented.');
    }
    public intersect(source: IAsyncEnumerable<T>, equalityComparator?: (a: T, b: T) => number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public subtract(source: IAsyncEnumerable<T>, equalityComparator?: (a: T, b: T) => number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public union(source: IAsyncEnumerable<T>, equalityComparator?: (a: T, b: T) => number): IParallelQueryable<T> {
        throw new Error('Method not implemented.');
    }
    public zip<TSecond, TResult>(
        second: IAsyncEnumerable<TSecond>,
        selector: (tfirst: T, tsecond: TSecond) => TResult,
    ): IParallelQueryable<TResult> {
        throw new Error('Method not implemented.');
    }
    // tslint:disable-next-line:member-access
    [Symbol.asyncIterator](): AsyncIterator<T> {
        throw new Error('Method not implemented.');
    }
}
