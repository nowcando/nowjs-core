import { Func } from "../core/Func";
import { IEnumerable } from "../core/IEnumerable";
import { Comparator } from "../core/index";
import { Enumerable, ParallelEnumerable } from "../linq/index";
import { IParallelQueryable } from "../linq/IParallelQueryable";
import { IQueryable } from "../linq/IQuerable";
import { Collection } from "./Collection";
import { ICollection } from "./ICollection";
import { IList } from "./IList";
import { SortedCollection } from "./index";
import { ISortedList } from "./ISortedList";
import { List } from "./List";

export class SortedList<T> extends SortedCollection<T>  implements ISortedList<T> {

}
