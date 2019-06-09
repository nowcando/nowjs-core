import { IDbCommandExecutePlan } from "./IDbCommandExecutePlan";
import { IDbCommandResult } from "./IDbCommandResult";

export interface IDbQueryPagedResult<T, P extends IDbCommandExecutePlan> extends IDbCommandResult<T[], P> {

}
