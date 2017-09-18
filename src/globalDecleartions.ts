import { IParallelQueryable, IQueryable } from "./linq/index";
import { ExtendedPromiseOptions } from "./parallels/index";

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
        deepAssign<T, U, V, W, X, Y , Z>(target: T, source1: U,
                                         source2: V, source3: W,
                                         source4: X, source5: Y, source6: Z):
                                                     T & U & V & W & X & Y & Z;
        deepAssign<T>(target: T, ...sources: any[]): T & any;
        cloneObject<T>(target: T): T;
    }

    interface Array<T> {
        contains(obj: T): boolean;
        findDuplicates(): T[];
        itemCount(): Array<{ item: T, count: number }>;
        toUnique(): T[];
        hasDuplicate(): boolean;
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface Set<T> {
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface Map<K, V> {
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;
    }
    interface WeakSet<T> {
        linq(): IQueryable<T>;
        plinq(): IParallelQueryable<T>;
    }
    interface WeakMap<K extends object, V> {
        linq(): IQueryable<[K, V]>;
        plinq(): IParallelQueryable<[K, V]>;
    }

    export interface PromiseConstructor {
        delay<T>(ms: number, defaulValue?: T): Promise<T>;
        wait<T>(ms: number): Promise<T>;
        extendedPromise<T>(promise: Promise<T> ,
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
