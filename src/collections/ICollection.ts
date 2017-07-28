
import { IReadonlyCollection } from "./IReadonlyCollection";

// tslint:disable-next-line:no-empty-interface
export interface ICollection<T> extends IReadonlyCollection<T> {
    add(item: T): void;
    add(...items: T[]): void;
    remove(item: T): boolean;
    clear(): boolean;
}
