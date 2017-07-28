
const ATTRIBUTE_METADATA_KEY = Symbol("type.attribute");
const TYPENAME_METADATA_KEY = Symbol("type.typeName");
const TYPEMETA_METADATA_KEY = Symbol("type.typeMeta");
/// decorators
export function attribute() {
    return Reflect.metadata(ATTRIBUTE_METADATA_KEY, "attribute");
}

export  function getAttribute(target: any, propertyKey: string) {
    return Reflect.getMetadata(ATTRIBUTE_METADATA_KEY, target, propertyKey);
}

// tslint:disable-next-line:no-shadowed-variable
export function typeName(typeName: string) {
        return Reflect.metadata(TYPENAME_METADATA_KEY, typeName);
}

export  function getTypeName(target: any, propertyKey: string) {
    return Reflect.getMetadata(TYPENAME_METADATA_KEY, target, propertyKey);
}

// tslint:disable-next-line:no-shadowed-variable
export function typeMeta(typeMeta: any) {
        return Reflect.metadata(TYPEMETA_METADATA_KEY, typeMeta);
}

export  function getTypeMeta(target: any, propertyKey: string) {
    return Reflect.getMetadata(TYPEMETA_METADATA_KEY, target, propertyKey);
}

/// types

// Keep types the same, but make each property to be read-only.
export type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Same property names, but make the value a promise instead of a concrete one
export type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};

// Wrap proxies around properties of T
export type Proxify<T> = {
    [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};
export type Nullable<T> = { [P in keyof T]: T[P] | null };
export type Partial<T> = { [P in keyof T]?: T[P] };

// From T pick a set of properties K
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

// For every properties K of type T, transform it to U
/*export function mapObject<K extends string, T, U>(obj: Record<K, T>, fn: (x: T) => U): Record<K, U>{

}*/

export type Maybe<T> = T | void;

export function isDefined<T>(x: Maybe<T>): x is T {
    return x !== undefined && x !== null;
}

export function isUndefined<T>(x: Maybe<T>): x is void {
    return x === undefined || x === null;
}

export function getOrElse<T>(x: Maybe<T>, defaultValue: T): T {
    return isDefined(x) ? x : defaultValue;
}

// tslint:disable-next-line:interface-over-type-literal
export type Tree<T> = {
    Value: T;
    Left: Tree<T>;
    Right: Tree<T>;
};

export type LinkedList<T> = T & { Next: LinkedList<T> , Previous?: LinkedList<T> };
