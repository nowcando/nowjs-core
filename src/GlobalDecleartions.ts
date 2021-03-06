import { IList } from "./collections";
import "./computation/math/Declaration";
import { IObjectDictionary } from "./core";
import "./linq/Declaration";
import { IParallelQueryable, IQueryable } from "./linq/index";
import "./parallels/Declaration";
import { ExtendedPromiseOptions } from "./parallels/Declaration";

// tslint:disable-next-line:no-namespace
declare global {
    // tslint:disable-next-line:interface-name
    interface String {
        toPascalCase(): string;
        toCamelCase(): string;
        toTitleCase(): string;
        toSentenceCase(): string;
        toSnakeCase(): string;
        toUpperFirstCase(): string;
        toLowerFirstCase(): string;
        toDotCase(): string;
    }

    // tslint:disable-next-line:interface-name
    interface Number {
        clamp(min: number, max: number): number;
    }

    // tslint:disable-next-line:interface-name
    interface Math {
        DEG_PER_RAD: number;
        RAD_PER_DEG: number;
        clamp(x: number, min: number, max: number): number;
        degrees(degree: number): number;
        radians(radian: number): number;
        scale(x: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number;
        fscale(x: number, inLow: number, inHigh: number, outLow: number, outHigh: number): number;
    }
    // tslint:disable:interface-name
    interface ObjectConstructor {
        isObjectType(target: any): boolean;
        deepAssign<T, U>(target: T, source1: U): T & U;
        deepAssign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
        deepAssign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
        deepAssign<T, U, V, W, X>(target: T, source1: U,
                                  source2: V, source3: W, source4: X): T & U & V & W & X;
        deepAssign<T, U, V, W, X, Y>(target: T, source1: U,
                                     source2: V, source3: W,
                                     source4: X, source5: Y):
            T & U & V & W & X & Y;
        deepAssign<T, U, V, W, X, Y, Z>(target: T, source1: U,
                                        source2: V, source3: W,
                                        source4: X, source5: Y, source6: Z):
            T & U & V & W & X & Y & Z;
        deepAssign<T>(target: T, ...sources: any[]): T & any;
        cloneObject<T>(target: T): T;
        createInstance<T>(c: new () => T): T;
    }

    interface IterableIterator<T> {
        //  map<R>(mapper: (item: T, index?: number) => R): IterableIterator<R>;
        // filter(filterer: (item: T, index?: number) => boolean): IterableIterator<T>;

        // find(prediction: (item: T, index?: number) => boolean): T;
        // some(prediction: (item: T, index?: number) => boolean): boolean;
        // every(prediction: (item: T, index?: number) => boolean): boolean;
        // forEach(action: (item: T, index?: number) => void): void;
        // reduce(action: (item: T, index?: number) => void): void;
        // take(count: number): IterableIterator<T>;
        // skip(count: number): IterableIterator<T>;
        // skipWhile(prediction: (item: T, index?: number) => boolean): IterableIterator<T>;

        // toMap<K, R = T>(mapper: (item: T, index?: number) => [K, R]): Map<K, R>;
        // toSet(): Set<T>;
        // toArray(): T[];

        // groupBy<R, K extends keyof T, G = Omit<T, K>>(selector: (item: T,
        //     index?: number) => R):
        //     IterableIterator<[R, IterableIterator<G>]>;
        // sum<K extends keyof T>(selector: (item: T, index?: number) => number): number;
        // average<K extends keyof T>(selector: (item: T, index?: number) => number): number;
        // max<K extends keyof T>(selector: (item: T, index?: number) => number): number;
        // min<K extends keyof T>(selector: (item: T, index?: number) => number): number;

    }

    // interface IterableIterator<T> {
    //     sum(): number;
    //     average(): number;
    //     max(): number;
    //     min(): number;
    // }

    interface Array<T> {

        contains(obj: T): boolean;
        findDuplicates(): T[];
        itemCount(): Array<{ item: T, count: number }>;
        toUnique(): T[];
        hasDuplicate(): boolean;
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;

        toArray(): T[];
        toList(): IList<T>;
    }
    interface Set<T> {

        isSuperSetOf<P>(other: Set<P>): boolean;
        isSubSetOf<P>(other: Set<P>): boolean;
        isEmpty(): boolean;
        intersect<P>(other: Set<P>): Set<T | P>;
        union<P>(other: Set<P>): Set<T | P>;

        except<P>(other: Set<P>): Set<T | P>;
        xor<P>(other: Set<P>): Set<T | P>;

        find(callbackfn: (value: T, index: number, set: Set<T>) => boolean, thisArg?: any): T;
        filter(callbackfn: (value: T, index: number, set: Set<T>) => boolean, thisArg?: any): Set<T>;
        every(callbackfn: (value: T, index: number, set: Set<T>) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, set: Set<T>) => boolean, thisArg?: any): boolean;
        map<U extends object>(callbackfn: (value: T, index: number, set: Set<T>) => U, thisArg?: any): Set<U>;
        join(separator?: string): string;
        toArray(): T[];
        toList(): IList<T>;
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface Map<K, V> {

        put(key: K, value: V): this;
        putAll(...entries: Array<[K, V]>): this;
        isEmpty(): boolean;
        toArray(): Array<[K, V]>;
        toList(): IList<[K, V]>;
        toObject(): IObjectDictionary<V>;
        toValueList(): IList<V>;
        toKeyList(): IList<K>;
        containsKey(key: string | symbol): boolean;
        containsValue(value: any): boolean;
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;

        // tslint:disable-next-line:max-line-length
        map<T, U extends object>(callbackfn: (value: [K, V], index: number, map: Map<K, V>) => [T, U], thisArg?: any): Map<T, U>;

    }
    interface WeakSet<T> {

        isSuperSetOf<P>(other: Set<P>): boolean;
        isSubSetOf<P>(other: Set<P>): boolean;
        isEmpty(): boolean;
        intersect<P>(other: Set<P>): Set<T | P>;
        union<P>(other: Set<P>): Set<T | P>;

        except<P>(other: Set<P>): Set<T | P>;
        xor<P>(other: Set<P>): Set<T | P>;

        find(callbackfn: (value: T, index: number, set: WeakSet<T>) => boolean, thisArg?: any): T;
        filter(callbackfn: (value: T, index: number, set: WeakSet<T>) => boolean, thisArg?: any): WeakSet<T>;
        every(callbackfn: (value: T, index: number, set: WeakSet<T>) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, set: WeakSet<T>) => boolean, thisArg?: any): boolean;
        map<U extends object>(callbackfn: (value: T, index: number, set: WeakSet<T>) => U, thisArg?: any): WeakSet<U>;

        join(separator?: string): string;
        toArray(): T[];
        toList(): IList<T>;
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface WeakMap<K extends object, V> {
        put(key: K, value: V): this;
        putAll(...entries: Array<[K, V]>): this;
        isEmpty(): boolean;
        toArray(): Array<[K, V]>;
        toList(): IList<[K, V]>;
        toObject(): IObjectDictionary<V>;
        toValueList(): IList<V>;
        toKeyList(): IList<K>;
        containsKey(key: string | symbol): boolean;
        containsValue(value: any): boolean;
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;

        // tslint:disable-next-line:max-line-length
        map<T extends object, U extends object>(callbackfn: (value: [K, V], index: number, map: Map<K, V>) => [T, U], thisArg?: any): WeakMap<T, U>;

    }

    export interface PromiseConstructor {
        delay<T>(ms: number, defaulValue?: T): Promise<T>;
        wait<T>(ms: number): Promise<T>;
        extendedPromise<T>(promise: Promise<T>,
                           options?: ExtendedPromiseOptions): ExtendedPromise<T>;
    }
    // tslint:disable-next-line:interface-name
    export interface Promise<T> {
        delay(ms: number, defaulValue?: T): Promise<T>;
        timeout(ms: number, err?: string | Error): Promise<T>;
        wait(ms: number): Promise<T>;
        spread(fn: (...args: T[]) => void): Promise<T>;
    }

    // tslint:disable-next-line:interface-name
    export interface ExtendedPromise<T> extends Promise<T> {
        cancel(): void;
        progress(data: any): void;
    }
}

function getSyncIteratorDirect<T>(obj: T): IterableIterator<T> {
    return (obj as any)[Symbol.iterator];
}

function getASyncIteratorDirect<T>(obj: T): AsyncIterableIterator<T> {
    return (obj as any)[Symbol.asyncIterator];
}


