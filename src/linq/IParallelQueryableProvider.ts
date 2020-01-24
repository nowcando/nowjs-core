import { IParallelQueryable } from './index';

export interface IParallelQueryableProvider<T> extends IParallelQueryable<T> {
    name: string;
}
