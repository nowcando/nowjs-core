import { IDbCommandExecutePlan } from './IDbCommandExecutePlan';
import { IDbCommandResult } from './IDbCommandResult';

export type IDbQueryPagedResult = IDbCommandResult<T[], P>;
