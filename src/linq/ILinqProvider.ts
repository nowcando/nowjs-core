import { IParallelQueryable } from './IParallelQueryable';
import { IQueryable } from './IQuerable';

export interface ILinqProvider<T> {
    linq(): IQueryable<T>;
    plinq(): IParallelQueryable<T>;
}
