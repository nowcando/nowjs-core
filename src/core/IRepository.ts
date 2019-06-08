import { Predicate, Selector } from "./BaseTypes";

export type EntityKey = number|string|object;
export interface IRepository<T> {
    name: string;

    avg(selector: Selector<T>, predicate?: Predicate<T>): Promise<number>;
    sum(selector: Selector<T>, predicate?: Predicate<T>): Promise<number>;
    count(selector?: Selector<T>, predicate?: Predicate<T>): Promise<number>;
    all(predicate?: Predicate<T>): Promise<boolean>;
    any(predicate?: Predicate<T>): Promise<boolean>;
    findAll(predicate?: Predicate<T>): Promise<T[]>;
    findOne(predicate?: Predicate<T>): Promise<T>;

    find(id: EntityKey): Promise<T>;
    load(id: EntityKey): Promise<T>;
    save(entity: T): Promise<T>;
}
