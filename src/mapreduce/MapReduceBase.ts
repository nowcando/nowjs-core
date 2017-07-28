
import { IMapperResult } from "./IMapperResult";
import { IMapReduce } from "./IMapReduce";
import { IReducerResult } from "./IReducerResult";

// tslint:disable-next-line:max-line-length
export abstract class MapReduceBase<K1, V1, K2, V2, K3, V3, K4, V4>
                implements IMapReduce<K1, V1, K2, V2, K3, V3, K4, V4> {
   public abstract map(key: K1, value: V1): Promise<IMapperResult<K2, V2>>;
   public abstract reduce(key: K1, value: V1): Promise<IReducerResult<K2, V2>> ;

}
