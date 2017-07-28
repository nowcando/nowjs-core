
import { IMapperResult } from "./IMapperResult";

export interface IMapper<K1, V1, K2, V2> {
     map(key: K1, value: V1): Promise<IMapperResult<K2, V2>>;
}
