import { IDbCommandExecutePlan } from './IDbCommandExecutePlan';
import { IDbCommandResult } from './IDbCommandResult';

export interface IDbQueryPagedResult<T, P extends IDbCommandExecutePlan = IDbCommandExecutePlan>
    extends IDbCommandResult<T[], P> {
    // implement
}
