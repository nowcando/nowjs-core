
import { IQueryable } from "./IQuerable";

export interface ILookup<TKey, TValue> {
    key: TKey;
    values: IQueryable<TValue>;
}
