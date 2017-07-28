
import { IQueryable } from "./IQuerable";

export interface ILookup<TKey, TValue> {
    Key: TKey;
    Values: IQueryable<TValue>;
}
