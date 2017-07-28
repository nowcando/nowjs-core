import { IReducerResult } from "./IReducerResult";

export interface IReducer<K1, V1, K2, V2> {
     reduce(key: K1, value: V1): Promise<IReducerResult<K2, V2>>;
}
