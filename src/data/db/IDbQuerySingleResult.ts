import { IDbCommandExecutePlan } from "./IDbCommandExecutePlan";
import { IDbCommandResult } from "./IDbCommandResult";

export interface IDbQuerySingleResult<T, P extends IDbCommandExecutePlan> extends IDbCommandResult<T, P> {

}
