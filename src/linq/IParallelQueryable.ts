import {IParallelOrderedQueryable} from "./IParallelOrderedQueryable";

import { ICollection } from "../collections/ICollection";
import { IList } from "../collections/IList";
import { Comparator } from "../core/Comparator";
import { Func } from "../core/Func";
import { IAsyncEnumerable } from "../core/IAsyncEnumerable";
import { Predicate } from "../core/Predicate";
import { IGroup } from "./IGroup";
import { IOrderedQueryable } from "./IOrderedQueryable";

export interface IParallelQueryable<T> extends IAsyncEnumerable<T> {

     // tslint:disable:no-shadowed-variable
    aggregate(action: ((seed: T, item: T, index?: number, source?: IAsyncEnumerable<T>) => T), seed?: T): Promise<T>;
    all(predicate?: Predicate<T>): Promise<boolean>;
    any(predicate?: Predicate<T>): Promise<boolean>;
    first(predicate?: Predicate<T>, defValue?: T): Promise<T>;
    last(predicate?: Predicate<T>, defValue?: T): Promise<T>;
    single(predicate: Predicate<T>, defValue?: T): Promise<T>;
    contains(item: T): Promise<boolean>;
    isEmpty(): Promise<boolean>;
    skip(count: number): IParallelQueryable<T>;
    skipWhile(predicate: Predicate<T>): IParallelQueryable<T>;
    take(count: number): IParallelQueryable<T>;
    takeWhile(predicate: Predicate<T>): IParallelQueryable<T>;
    distinct(): IParallelQueryable<T>;
    reverse(): IParallelQueryable<T>;
    shuffles(count?: number): IParallelQueryable<T>;

    asParallelEnumerable(): IAsyncEnumerable<T>;
    select<TResult>(selector?: Func<TResult , T>): IParallelQueryable<TResult>;
    selectMany<TResult>(selector: Func< IAsyncEnumerable<TResult>, T>): IParallelQueryable<TResult>;
    selectMany<TCollection, TResult>(selector: Func< IAsyncEnumerable<TResult>, T>,
                                     collectionSelector?: Func<TResult, TCollection>): IParallelQueryable<TResult>;

    join<TOuter, TInner, TKey, TResult>(inner: IAsyncEnumerable<TInner>,
                                        outerSelector: Func< TKey, TOuter>,
                                        innerSelector: Func< TKey, TInner>,
                                        resultSelector: ((innerItem: TInner, outerItem: TOuter) => TResult),
    ): IParallelQueryable<TResult>;

    where(predicate: Predicate<T>): IParallelQueryable<T>;
    except(predicate: Predicate<T>): IParallelQueryable<T>;
    orderBy<TSelected>(selector: Func< TSelected, T>, comparator?: Comparator<T, T>): IParallelOrderedQueryable<T>;
    orderByDesc<TSelected>(selector: Func< TSelected, T>, comparator?: Comparator<T, T>): IParallelOrderedQueryable<T>;

    groupBy<TKey>(keySelector: Func< TKey, T>): IParallelQueryable<IGroup<TKey, T>>;

    count(predicate?: Predicate<T>): Promise<number>;

    average(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    max(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    min(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    sum(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    stdDev(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    stdDevP(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    variance(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    range(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    varianceP(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    percentile(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    percentileInclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    percentileExclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    percentRank(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    mean(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    median(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    mode(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    covariance(other: IParallelQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    pearson(other: IParallelQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;
    rootMeanSquare(selector?: Func< number, T>, predicate?: Predicate<T>): Promise<number>;

    forEach(action: (element: T, index: number) => void): Promise<void>;
    toArray(): Promise<T[]>;
    toList(): Promise<IList<T>>;
    toCollection(): Promise<ICollection<T>>;
    intersect(source: IAsyncEnumerable<T>, equalityComparator?: Comparator<T, T>): IParallelQueryable<T>;
    subtract(source: IAsyncEnumerable<T>, equalityComparator?: Comparator<T, T>): IParallelQueryable<T>;
    union(source: IAsyncEnumerable<T>, equalityComparator?: Comparator<T, T>): IParallelQueryable<T>;

    zip<TSecond, TResult>(second: IAsyncEnumerable<TSecond>,
                          selector: ((tfirst: T,
                                      tsecond: TSecond) => TResult)): IParallelQueryable<TResult>;
}
