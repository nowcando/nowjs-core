
import { OutputCollectionBase } from "./OutputCollection";

export class MemoryOutputCollection<K, V> extends OutputCollectionBase<K, V> {

    private map = new Map<K, V>();
    // tslint:disable-next-line:no-empty
    constructor() {
        super();
    }

    public clear(): Promise<void> {
       this.map.clear();
       return Promise.resolve();
    }
    public size(): Promise<number> {
       return Promise.resolve(this.map.size);
    }
    public isEmpty(): Promise<boolean> {
        return Promise.resolve(this.map.size === 0);
    }
    public set(key: K, value: V): Promise<void> {
        this.map.set(key, value);
        return Promise.resolve();
    }
    public has(key: K): Promise<boolean> {
        return Promise.resolve(this.map.size === 0);
    }
    public get(key: K): Promise<V> {
        return Promise.resolve(this.map.get(key));
    }
}
