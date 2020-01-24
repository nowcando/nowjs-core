import { ICollection } from './ICollection';

import { IReadonlyList } from './IReadonlyList';

// tslint:disable-next-line:no-empty-interface
export interface IList<T> extends IReadonlyList<T>, ICollection<T> {
    // implement
}
