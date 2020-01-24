import { IDbCommandExecutePlan } from './IDbCommandExecutePlan';
import { IDbCommandResult } from './IDbCommandResult';

export type IDbQuerySingleResult<T> = IDbCommandResult<T, IDbCommandExecutePlan>;
