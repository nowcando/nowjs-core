import { List } from "./List";
import { IEnumerable, Comparator } from "../core";
import { Enumerable } from "../linq";
import { PriorityQueue } from "./PriorityQueue";
import { Stack } from "./Stack";
import { Queue } from "./Queue";
import { LinkedList } from "./LinkedList";


export class Collectors {

    public static toIEnumerable<T>(){
        return (itre: IEnumerable<T>) =>( new Enumerable<T>(itre));
    }
    public static toIterator<T>(){
        return (itre: Iterable<T>) =>( itre);
    }

    // public static toCollection<T>(){
    //     return (itre: Iterable<T>) =>( new Collection<T>(itre));
    // }
    public static toList<T>(){
        return (itre: Iterable<T>) =>( new List<T>(itre));
    }

    public static toArray<T>(){
        return (itre: Iterable<T>) =>( Array.from<T>(itre));
    }
    public static toSet<T>(){
        return (itre: Iterable<T>) =>( new Set<T>(itre));
    }

    public static toMap<K,V>(mapper?: <T>(item: T) => [K,V]){
        return (itre: Iterable<[K, V]>) =>( new Map<K,V>(itre));
    }

    public static toLinkedList<T>(){
        return (itre: Iterable<T>) =>( new LinkedList<T>(itre));
    }

    public static toQueue<T>(){
        return (itre: Iterable<T>) =>( new Queue<T>(itre));
    }
    public static toPriorityQueue<T>(comparator: Comparator<T,T>){
        return (itre: Iterable<T>) =>( new PriorityQueue<T>(comparator,itre));
    }
    public static toStack<T>(){
        return (itre: Iterable<T>) =>( new Stack<T>(itre));
    }
}