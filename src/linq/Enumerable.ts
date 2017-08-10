
import { Collection, ICollection, IList, List } from "../collections/index";
import { Comparator } from "../core/Comparator";
import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Predicate } from "../core/Predicate";
import { IllegalOperationException } from "../exceptions/index";
import { IGroup } from "./IGroup";
import { IOrderedQueryable } from "./IOrderedQueryable";
import { IQueryable } from "./IQuerable";
// import { OrderedEnumerable } from "./OrderedEnumerable";

export class Enumerable<T> implements IQueryable<T> {

    public static from<TSource>(enumerable: IEnumerable<TSource> | Iterable<TSource>): IQueryable<TSource> {
        return new Enumerable(enumerable);
    }
    // tslint:disable-next-line:ban-types
    public static repeat<TSource>(result: TSource | Function,
                                  count: number): IQueryable<TSource> {

        const itr = {
            [Symbol.iterator]: () => {
                let counter = 0;
                return {
                    next: () => {
                        if (counter < count) {
                            counter++;
                            return {
                                value: typeof result === "function" ?
                                    // tslint:disable:object-literal-sort-keys
                                    // tslint:disable-next-line:ban-types
                                    (result as Function).apply(result) : result,
                                done: false,
                            };
                        } else {
                            return { done: true };
                        }

                    },
                };
            },
        } as Iterable<TSource>;
        return new Enumerable(itr);
    }

    public static range(start: number, count: number, step: number = 1): IQueryable<number> {

        const itr = {
            [Symbol.iterator]: () => {
            let curr = start - 1;
            let counter = 0;
            return {
                    next: () => {
                        if (counter >= count) {
                           return { done: true };
                        } else {
                            counter++;
                            curr += step;
                            return { value: curr, done: false };
                        }

                    },
                };
            },
        } as Iterable<any>;
        return new Enumerable(itr);
    }

    protected static comparator<TSource>(a: TSource, b: TSource): number {
        if (a === b) {
            return 0;
        } else  if (a > b) {
             return 1;
        }  else {
            return -1;
        }
    }

    protected  static equalityComparator(a: any , b: any): number {
        return a === b ? 0 : -1; // Comparable.equalityCompare(a,b);
    }

    protected static selector<TSource>(t: TSource): TSource {
        return t;
    }

   // protected arr: T[] = [];
    constructor(private enumerable: IEnumerable<any> | Iterable<any>,
                private options?: {}) {
        // tslint:disable-next-line:curly
        if (!enumerable) enumerable = [];
        /* if (enumerable && enumerable[Symbol.iterator]) {
            for (const item of this) {
                  this.arr.push(item);
            }

        } */
        this.options = options || {};
    }

    /* private checkArraya() {
        if (!this.arr) {
            this.arr = [];
            for (const item of this) {
                this.arr.push(item);
            }
        }
    } */

    // tslint:disable:member-ordering
    public aggregate(action: (seed: T, item: T, index?: number,
        // tslint:disable-next-line:align
        source?: IEnumerable<T>) => T, seed?: T): T {
        // this.checkArray();
        const arr1 = this.toArray();
        // tslint:disable-next-line:curly
        if (seed == null) seed = arr1.shift();

        for (let i = 0; i < arr1.length; i++) {
            seed = action(seed, arr1[i], i, this);
        }
        return seed;
    }
    public all(predicate?: Predicate<T>): boolean {
        for (const xx of this.enumerable) {
            if (predicate(xx) === false) {
                return false;
            }
        }
        return true;
    }
    public any(predicate?: Predicate<T>): boolean {
        for (const xx of this) {
            if (predicate(xx) === true) {
                return true;
            }
        }
        return false;
    }
    public first(predicate?: Predicate<T>, defValue?: T): T {
        defValue = defValue ? defValue : null;
        for (const xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) {
                    return xx;
                }
            } else {
                return xx;
            }

        }
        return defValue;
    }
    public last(predicate?: Predicate<T>, defValue?: T): T {
        defValue = defValue ? defValue : null;
        for (const xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) {
                    defValue = xx;
                }
            } else {
                defValue = xx;
            }

        }
        return defValue;
    }
    public single(predicate: Predicate<T>, defValue?: T): T {
        defValue = defValue ? defValue : null;
        for (const xx of this.enumerable) {
            if (predicate) {
                if (predicate(xx) === true) {
                    return xx;
                }
            } else {
                return xx;
            }

        }
        return defValue;
    }
    public contains(item: T): boolean {
        for (const x of this) {
            if (x === item) {
                return true;
            }
        }
        return false;
    }
    public isEmpty(): boolean {
        if (this.enumerable && this.enumerable[Symbol.iterator]) {
            return (this.enumerable[Symbol.iterator]()).next().done;
        }
        return true;
    }
    public skip(count: number): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                for (let i = 0; i < count; i++) {
                    enb.next();

                }
                return {
                    next: () => {
                        return enb.next();
                    },
                };

            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public skipWhile(predicate: Predicate<T>): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                let xx: any;
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                do {
                    xx = enb.next();
                    // tslint:disable-next-line:curly
                    if (xx && predicate(xx.value) === true) {
                           return {
                               next: () => {
                                   if (xx) { const yy = xx ; xx = null; return yy; }
                                   return enb.next();
                            },
                        };
                    }
                } while (xx.done === false);
               /*  return {
                    next: () => {
                        return enb.next();
                    },
                }; */

            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public take(count: number): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                let i = 0;
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                return {
                    next: () => {
                        const x = enb.next();
                        if (i === count) {
                            x.done = true;
                        }
                        i++;
                        return x;
                    },
                };
            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public takeWhile(predicate: Predicate<T>): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                let xx: any;
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                return {
                    next: () => {
                        xx = enb.next();
                        if (xx && predicate(xx.value) === true) {
                            xx.done = true;
                        }
                        return xx;
                    },
                };
            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public distinct(): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                const traversed = new Set<T>();
                return {
                    next: () => {
                            while (true) {
                                 const item = enb.next();
                                 if (item.done === true) {
                                    return item;
                                }
                                 if (!traversed.has(item.value)) {
                                    traversed.add(item.value);
                                    return item;
                                }
                            }
                    },
                };
            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public reverse(): IQueryable<T> {
        const revIt = this.toArray().reverse();
        return new Enumerable(revIt);
    }
    public shuffles(count?: number): IQueryable<T> {
        const thisme = this;
        const arr = this.toArray();
        const res: T[] = [];
        const mrands = Enumerable.repeat<number>(() => {
            return Math.floor((Math.random() * arr.length));
        }, count);
        for (const item of mrands) {
            res.push(arr[item]);
        }
        return new Enumerable(res);
    }
    public asEnumerable(): IEnumerable<T> {
        return new Enumerable(this.enumerable);
    }
    public select<TResult>(selector?: Func< TResult, T>): IQueryable<TResult> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                return {
                    next: () => {
                        const nx = enb.next();
                        if (nx.done === false) {
                            nx.value =  selector ? selector(nx.value) : nx.value;
                        }
                        return nx;
                    },
                };
            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public selectMany<TCollection, TResult>(selector: Func< IEnumerable<TResult>, T>,
                                            collectionSelector?: Func<TResult, TCollection>): IQueryable<TResult> {
        const thisme = this;

        const itr = {
            [Symbol.iterator]: () => {
                const itr1 = thisme.enumerable[Symbol.iterator]();
                let citer: Iterator<any> = null;
                const itm: any = () => {
                     if (!citer) {
                                const pnv = itr1.next();
                                if (pnv && pnv.done === false) {
                                    if (selector) {
                                    const childv = selector(pnv.value);
                                    if (childv && childv[Symbol.iterator]) {
                                        citer = childv[Symbol.iterator]();
                                    }
                                 }
                                } else {
                                    return pnv;
                                }
                            }
                     if (citer) {
                                const nv = citer.next();
                                if (nv.done === false) {
                                    if (collectionSelector) {
                                        return {value: collectionSelector(nv.value), done: nv.done};
                                    } else {
                                        return nv;
                                    }
                                }   else {
                                   citer = null;
                                   return itm();
                                }
                            }
                };
                return {
                    next: () => {
                           return itm();
                    },
                };

            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public indexOf(item: T): number {
        let indx = -1;
        for (const xx of this) {
            indx++;
            if (xx === item) {
                return indx;
            }
        }
        return -1;
    }
    public lastIndexOf(item: T): number {
        let indx = -1;
        let findex = -1;
        for (const xx of this) {
            indx++;
            if (xx === item) {
                findex = indx;
            }
        }
        return findex;
    }
    public join<TOuter, TInner, TKey, TResult>(inner: IEnumerable<TInner>,
                                               outerSelector: Func< TKey, TOuter>,
                                               innerSelector: Func< TKey, TInner>,
                                               resultSelector: (innerItem: TInner,
                                                                outerItem: TOuter) => TResult): IQueryable<TResult> {
        const itr = {
            [Symbol.iterator]: () => {
                const enbOuter = this[Symbol.iterator]() as any;
                let enbg: any;
                const getGroup = (groups: IEnumerable<IGroup<TKey, TInner>>, key: TKey) => {
                    if (!enbg) {
                        enbg = groups[Symbol.iterator]() as any;
                    }
                    while (true) {
                        const ixg = enbg.next();
                        if (ixg.done === false && ixg.value &&
                            ixg.value.Key === key) {
                            return ixg.value;
                        }

                        if (ixg.done === true) {
                            return null;
                        }
                    }

                };
                const ig = (inner as IQueryable<TInner>).groupBy<TKey>(innerSelector);
                let oit: any;
                let xOuter: any;
                return {
                    next: () => {
                        if (oit) {
                            const g = oit.next();
                            if (g.done === false) {
                                const xx = {
                                    done: false,
                                    value: resultSelector(g.value, xOuter.value),
                                };
                                return xx;
                            } else {
                                oit = null;
                            }
                        }
                        xOuter = enbOuter.next();
                        if ((xOuter && xOuter.done === false)) {
                            const og = getGroup(ig, outerSelector(xOuter.value));
                            if (og) {
                                oit = og.Values[Symbol.iterator]();
                                if (oit) {
                                    const g = oit.next();
                                    if (g.done === false) {
                                        const xx = {
                                            done: false,
                                            value: resultSelector(g.value, xOuter.value),
                                        };
                                        return xx;
                                    } else {
                                        oit = null;
                                    }
                                }
                            }

                        }
                        // oit = null;
                        return { done: true };
                    },
                };
            },
        } as Iterable<TResult>;
        return new Enumerable(itr);
    }
    public where(predicate: Predicate<T>): IQueryable<T> {
        const thisme = this;

        const itr = {
            [Symbol.iterator]: () => {
                const enb = thisme[Symbol.iterator]();
                const getNext = () =>  {
                        let xx ;
                        do {
                                xx = enb.next();
                                if (xx && xx.done === false && predicate(xx.value) === true) {
                                    break;
                                }

                            } while (xx.done === false);
                        return xx;
                    };
                return {
                    next: () => {
                        if (predicate) {
                            return getNext();
                        } else {
                           return enb.next();
                        }
                    },
                };

            },
        } as Iterable<T>;
        return new Enumerable<T>(itr);
    }
    public except(predicate: Predicate<T>): IQueryable<T> {
        const thisme = this;
        const itr = {
            [Symbol.iterator]: () => {
                let xx: any;
                const enb = thisme.enumerable[Symbol.iterator]() as any;
                return {
                    next: () => {
                        xx = enb.next();
                        if (xx && predicate(xx.value) === true) {
                            do {
                                xx = enb.next();
                                if (xx && predicate(xx.value) === false) {
                                    break;
                                }
                            }
                            while (xx.done === false);
                        }
                        return xx;
                    },
                };

            },
        } as Iterable<T>;
        return new Enumerable(itr);
    }
    public orderBy<TSelected>(selector: Func< TSelected, T>,
                              comparator?: Comparator<T, T>): IOrderedQueryable<T> {

        comparator = comparator || Enumerable.comparator as any;
        selector = selector || ((xx: any) => xx);
        const cmp = (a: T, b: T) => {
            return comparator(selector(a) as any, selector(b) as any);
        };
        const enb = this[Symbol.iterator]();
        let arr = this.toArray();
        arr = arr.sort(cmp);
        return new OrderedEnumerable(arr);
    }
    public orderByDesc<TSelected>(selector: Func< TSelected, T>,
                                  comparator?: Comparator<T, T>): IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator as any;
        return this.orderBy<TSelected>(selector, (a: any, b: any) => {
            return -comparator(a, b);
        });
    }
    public groupBy<TKey>(keySelector: Func< TKey, T>): IQueryable<IGroup<TKey, T>> {
        const groups = new Map<TKey, T[]>();
        for (const item of this.enumerable) {
            const key = keySelector(item);
            const vv = groups.get(key);
            if (vv) {
                vv.push(item);
            } else {
                const lst: any[] = [];
                lst.push(item);
                groups.set(key, lst);
            }
        }
        const list: any[] = [];
        groups.forEach((v, k) => {
            list.push({ Key: k, Values: v } as any);
        });

        return new Enumerable(list);
    }
    public count(predicate?: Predicate<T>): number {
        let i = -1;
        for (const xx of this) {
            if (predicate) {
                if (predicate(xx)) {
                    i++;
                }
            } else {
                i++;
            }

        }
        return i + 1;
    }
    public average(selector?: Func< number, T>, predicate?: Predicate<T>): number  {
        let res = 0;
        let count = 0;
        for (const x of this.enumerable) {
            const xx = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {
                    res += xx;
                    count++;
                }

            } else {
                res += xx;
                count++;
            }
        }
        return (res / count);

    }
    public max(selector?: Func< number, T>, predicate?: Predicate<T>): number  {
        let res = selector ? selector(this.first()) : this.first();

        for (const x of this) {
            const xx: any = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {

                    if (Enumerable.comparator(xx, res) === 1) {
                        res = xx;
                    }
                }

            } else {
                if (Enumerable.comparator(xx, res) === 1) {
                    res = xx;
                }
            }

        }

        return res as any;
    }
    public min(selector?: Func< number, T>, predicate?: Predicate<T>): number  {
        let res: any;

        for (const x of this) {
            const xx: any = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx) === true) {

                    if (Enumerable.comparator(xx, res) === -1) {
                        res = xx;
                    }
                }

            } else {
                if (Enumerable.comparator(xx, res) === -1) {
                    res = xx;
                }
            }

        }

        return res;
    }
    public sum(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        let res = 0;

        for (const x of this) {
            const xx: any = selector ? selector(x) : x;
            if (selector && predicate) {
                if (predicate(xx as any) === true) {
                    res += xx;
                }
            } else {
                res += xx;
            }

        }
        return res;
    }
    public stdDev(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const count = source.count();
        const avg = source.average();
        const sum = source.sum((d) => (d - avg) * (d - avg));
        const ret = Math.sqrt(sum / count);
        return ret;
    }
    public stdDevP(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const count = source.count();
        const avg = source.average();
        const sum = source.sum((d) => (d - avg) * (d - avg));
        const ret = Math.sqrt(sum / (count - 1));
        return ret;
    }
    public variance(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const count = source.count();
        // tslint:disable-next-line:curly
        if (count === 0) return 0;
        const mean = source.average();
        const squareDiffs = source.select((item) => {
            const d = item ;
            return (d - mean) * (d - mean) ;
        });
        const ret = squareDiffs.average();
        return ret;
    }
    public rootMeanSquare(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const count = source.count();
        // tslint:disable-next-line:curly
        const  s = source.aggregate((x, d) => x += Math.pow(d, 2));
        return Math.sqrt(s / count);
    }
    public covariance(other: IQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const target = other.where(predicate).select(selector);
        const sourcecount = this.count(predicate);
        const sourceAvg = source.average();
        const targetAvg = target.average();
        let ret = 0;
        // tslint:disable-next-line:curly
        for (let i = 0; i < sourcecount; i++)
            ret += ((source.get(i) - sourceAvg) * ( other.get(i) as any  - targetAvg));
        return ret / (sourcecount - 1);
    }
    public pearson(other: IQueryable<T>, selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const target = other.where(predicate).select(selector);
        return source.covariance(target) / (source.stdDevP() * other.stdDevP());
    }
    public varianceP(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        const source = this.where(predicate).select(selector);
        const count = source.count();
        // tslint:disable-next-line:curly
        if (count === 0) return 0;
        const mean = source.average();
        const squareDiffs = source.select((item) => {
            const d = item ;
            return (d - mean) * (d - mean) ;
        });
        const ret = squareDiffs.sum() / (count - 1);
        return ret;
    }
    public percentile(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number {
        return this.percentileInclusive(percentile, selector , predicate);
     }
    public percentileInclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number {
         const source = this.where(predicate).select(selector).orderBy((key) => key);
         const length = source.count();

         const index = percentile * (length - 1);
         const integerComponentOfIndex = Math.floor(index);
         const decimalComponentOfIndex = index - integerComponentOfIndex;
         const keyAtIndex = source.get(integerComponentOfIndex);

         if (integerComponentOfIndex >= length - 1)  {
                return keyAtIndex;
            }

         const keyAtNextIndex = source.get(integerComponentOfIndex);
         return keyAtIndex + (keyAtNextIndex - keyAtIndex) * decimalComponentOfIndex;
    }
    public percentileExclusive(percentile: number , selector?: Func< number, T>, predicate?: Predicate<T>): number {
         const source = this.where(predicate).select(selector).orderBy((key) => key);
         const length = source.count();

         const index = percentile * (length + 1) - 1;
         const integerComponentOfIndex = Math.floor(index);
         const decimalComponentOfIndex = index - integerComponentOfIndex;
         const keyAtIndex = source.get(integerComponentOfIndex);

         const keyAtNextIndex = source.get(integerComponentOfIndex);
         return keyAtIndex + (keyAtNextIndex - keyAtIndex) * decimalComponentOfIndex;
    }
    public percentRank(value: number, selector?: Func< number, T>, predicate?: Predicate<T>): number {
        selector = selector || ((xx: any) => xx);
        const source = this.where(predicate).orderBy(selector);
        const array: any[] = source.toArray();
        let L = 0;
        let S = 0;
        const N = array.length;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < array.length; i++) {
            if (array[i] < value) {
                L += 1;
            } else if (array[i] === value) {
                S += 1;
            }
        }

        const pct = (L + (0.5 * S)) / N;

        return pct;
    }
    public mean(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        selector = selector || ((xx: any) => xx);
        return this.average(selector, predicate);
    }
    public median(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        selector = selector || ((xx: any) => xx);
        const source = this.where(predicate).orderBy(selector);
        const count = source.count();
        // tslint:disable-next-line:curly
        const mindex = Math.floor(count / 2);
        if (count % 2 === 0) {
             return ((selector ? selector(source.get(mindex)) : source.get(mindex) as any) +
                (selector ? selector(source.get(mindex - 1)) : source.get(mindex - 1) as any)) / 2;
            }
        return selector ? selector(source.get(mindex)) : source.get(mindex) as any;
    }
    public mode(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        selector = selector || ((xx: any) => xx);
        const source = this.where(predicate).select(selector);
        const array = source.toArray();
        let hasDuplicate = false;
        // tslint:disable-next-line:curly
        if (array.length < 2) return Number.NaN;

        // tslint:disable-next-line:one-variable-per-declaration
        let maxValue = Number.MIN_VALUE, maxCount = 0;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < array.length; ++i) {
           let count = 0;
           if (!hasDuplicate && array.lastIndexOf(array[i]) !== i) {
                hasDuplicate = true;
           }
           // tslint:disable-next-line:prefer-for-of
           for (let j = 0; j < array.length; ++j) {
                // tslint:disable-next-line:curly
                if (array[j] === array[i]) ++count;
            }
           if (count > maxCount) {
                maxCount = count;
                maxValue = array[i];
            }
        }
        // tslint:disable-next-line:curly
        if (!hasDuplicate) return Number.NaN;
        return maxValue === Number.MIN_VALUE ? Number.NaN : maxValue;
    }
    public range(selector?: Func< number, T>, predicate?: Predicate<T>): number {
        selector = selector || ((xx: any) => xx);
        const source = this.where(predicate).select(selector);
        const ret = source.max() - source.min();

        return ret;
    }

    public get(index: number): T {
        const enb = this[Symbol.iterator]();
        for (let i = 0; i <= index; i++) {
            const next = enb.next();
            // tslint:disable-next-line:curly
            if ( i === index) return next.value;
        }
        return null;
    }
    public forEach(action: (element: T, index: number) => void): void {
        let i = 0;
        for (const x of this) {
            action(x, i++);
        }
    }
    public toArray(): T[] {
        const aa: any[] = [];
        for (const x of this) {
            aa.push(x);
        }
        return aa;
    }
    public toList(): IList<T> {
       const xx = new List<T>();
       for (const x  of this) {
            xx.add(x);
        }
       return xx;
    }
    public toCollection(): ICollection<T> {
       const xx = new Collection<T>();
       for (const x  of this) {
            xx.add(x);
        }
       return xx;
    }
    public intersect(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T> {
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        const wset = new Set<T>();
        for (const xx of source) {
            if (this.contains(xx)) {
                wset.add(xx);
            }
        }
        return new Enumerable(wset);
    }
    public subtract(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T> {
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        const wset = new Set<T>();
        const inter = this.intersect(source);
        for (const xx of this) {
            if (!inter.contains(xx)) {
                wset.add(xx);
            }
        }
        return new Enumerable(wset);
    }
    public union(source: IEnumerable<T>, equalityComparator?: Comparator<T, T>): IQueryable<T> {
        equalityComparator = equalityComparator || Enumerable.equalityComparator;
        const wset = new Set<T>();
        for (const xx of this) { wset.add(xx); }
        for (const xx of source) {
            if (!wset.has(xx)) {
                wset.add(xx);
            }
        }
        return new Enumerable(wset);
    }
    public zip<TSecond, TResult>(second: IEnumerable<TSecond>,
                                 selector: (tfirst: T, tsecond: TSecond) => TResult): IQueryable<TResult> {
        const thisme = this;
        const enb1 = thisme.enumerable[Symbol.iterator]() as any;
        const enb2 = new Enumerable<TSecond>(second)[Symbol.iterator]();
        const itr = {
            [Symbol.iterator]: () => {
                return {
                    next: () => {
                        const item1 = enb1.next();
                        const item2 = enb2.next();
                        if (item1.done === false && item2.done === false) {
                            return { value: selector(item1.value, item2.value), done: false };
                        } else {
                            return { done: true };
                        }

                    },
                };

            },
        } as Iterable<TResult>;
        return new Enumerable(itr);
    }
    public [Symbol.iterator](): Iterator<T> {
        if (this.enumerable && this.enumerable[Symbol.iterator]) {
            return this.enumerable[Symbol.iterator]();
        }
        throw new IllegalOperationException(-250, "The object is not itrabe .");
    }

}

// tslint:disable-next-line:max-classes-per-file
export class OrderedEnumerable<T> extends Enumerable<T> implements IOrderedQueryable<T> {

    // private _array:any[];
    constructor(enumerable: IEnumerable<any> | Iterable<any>,
                options?: {}) {
        super(enumerable, options);
/*         if (Array.isArray(enumerable)) {
            this.arr = enumerable;
        } */

    }

   public thenBy<TSelected>(selector: (item: T) => TSelected,
                            comparator?: ( a: any, b: any) => number): IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator;
        const cmp = (a: T, b: T) => {
            return comparator(selector(a), selector(b));
        };
        return this.orderBy<T>(Enumerable.selector,  (a, b) => {
            const res = cmp(a, b);
            return res === 0 ? comparator(selector(a), selector(b)) : res;
        });

    }

    public thenByDesc<TSelected>(selector: ((item: T) => TSelected),
                                 comparator?: ((a: any, b: any) => number)): IOrderedQueryable<T> {
        comparator = comparator || Enumerable.comparator;
        const cmp = (a: T, b: T) => {
            return comparator(selector(a), selector(b));
        };
        return this.orderBy<T>(Enumerable.selector,  (a, b) => {
            const res = cmp(a, b);
            return res === 0 ? -comparator(selector(a), selector(b)) : res;
        });
    }
}
