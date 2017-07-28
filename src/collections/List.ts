import {IEnumerable} from "../core/IEnumerable";
import {Collection} from "./Collection";
import {IList} from "./IList";

import { ICollection } from "./ICollection";

// tslint:disable-next-line:no-empty-interface
export class List<T> extends Collection<T> implements IList<T> {
    constructor(enumerable?: IEnumerable<T> | Iterable<T>) {
         super(enumerable);
    }
}
