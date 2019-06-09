
import { ICollection } from "../collections/ICollection";
import { IList } from "../collections/IList";
import { Comparator } from "../core/Comparator";
import { Func, Predicate } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { IGroup } from "./IGroup";
import { IOrderedQueryable } from "./IOrderedQueryable";

export interface IQueryable<T> extends IEnumerable<T> {

    // tslint:disable:no-shadowed-variable
    aggregate(action: ((seed: T, item: T, index?: number, source?: IEnumerable<T>) => T), seed?: T): T;
    all(predicate?: Predicate<T>): boolean;
    any(predicate?: Predicate<T>): boolean;
    first(predicate?: Predicate<T>, defValue?: T): T;
    last(predicate?: Predicate<T>, defValue?: T): T;
    single(predicate: Predicate<T>, defValue?: T): T;
    contains(item: T): boolean;
    isEmpty(): boolean;
    skip(count: number): IQueryable<T>;
    skipWhile(predicate: Predicate<T>): IQueryable<T>;
    take(count: number): IQueryable<T>;
    takeWhile(predicate: Predicate<T>): IQueryable<T>;
    distinct(): IQueryable<T>;
    reverse(): IQueryable<T>;
    shuffles(count?: number): IQueryable<T>;

    asEnumerable(): IEnumerable<T>;
    select<TResult>(selector?: Func<TResult , T>): IQueryable<TResult>;
    selectMany<TResult>(selector: Func< IEnumerable<TResult>, T>): IQueryable<TResult>;
    selectMany<TCollection, TResult>(selector: Func< IEnumerable<TResult>, T>,
                                     collectionSelector?: Func<TResult, TCollection>): IQueryable<TResult>;
    get(index: number): T;
    indexOf(item: T): number;
    lastIndexOf(item: T): number;

    join<TOuter, TInner, TKey, TResult>(inner: IEnumerable<TInner>,
                                        outerSelector: Func< TKey, TOuter>,
                                        innerSelector: Func< TKey, TInner>,
                                        resultSelector: ((innerItem: TInner, outerItem: TOuter) => TResult),
    ): IQueryable<TResult>;

    where(predicate: Predicate<T>): IQueryable<T>;
    except(predicate: Predicate<T>): IQueryable<T>;
    orderBy<TSelected>(selector: Func< TSelected, T>, comparator?: Comparator<T, T>): IOrderedQueryable<T>;
    orderByDesc<TSelected>(selector: Func< TSelected, T>, comparator?: Comparator<T, T>): IOrderedQueryable<T>;

    groupBy<TKey>(keySelector: Func< TKey, T>): IQueryable<IGroup<TKey, T>>;

    count(predicate?: Predicate<T>): number;

    average(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    max(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    min(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    sum(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    stdDev(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    stdDevP(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    variance(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    range(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    varianceP(selector?: Func< number, T>, predicate?: Predicate<T>): number;
    percentile(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number;
    percentileInclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number;
    percentileExclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number;
    percentRank(value: number, selector?: Func< number, T>, predicate?: Predicate<T>): number;
    mean(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    median(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    mode(selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    covariance(other: IQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    pearson(other: IQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): number ;
    rootMeanSquare(selector?: Func< number, T>, predicate?: Predicate<T>): number ;

    forEach(action: (element: T, index: number) => void): void;
    toArray(): T[];
    toList(): IList<T>;
    toCollection(): ICollection<T>;
    intersect(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T>;
    subtract(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T>;
    union(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T>;

    zip<TSecond, TResult>(second: IEnumerable<TSecond>,
                          selector: ((tfirst: T,
                                      tsecond: TSecond) => TResult)): IQueryable<TResult>;
}
