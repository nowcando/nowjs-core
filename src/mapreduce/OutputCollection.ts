
export abstract class OutputCollectionBase<K, V >  {

   // tslint:disable:no-empty
 public  abstract isEmpty(): Promise<boolean> ;
 public  abstract set(key: K, value: V): Promise<void> ;
 public  abstract has(key: K): Promise<boolean>;
 public  abstract get(key: K): Promise<V> ;
 public  abstract clear(): Promise<void> ;
 public  abstract size(): Promise<number> ;

}
