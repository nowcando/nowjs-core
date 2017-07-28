
// tslint:disable-next-line:no-empty
import { IMapper } from "./IMapper";
import { IMapReduceResult } from "./IMapReduceResult";
import { IReducer } from "./IReducer";

export interface IMapReduce<K1, V1, K2, V2, K3, V3, K4, V4> extends
            IMapper<K1, V1, K2, V2> , IReducer<K1, V1, K2, V2>  {
}
