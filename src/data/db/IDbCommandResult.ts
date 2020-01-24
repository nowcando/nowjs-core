import { IDbCommandExecutePlan } from './IDbCommandExecutePlan';

export interface IDbCommandResult<T, P extends IDbCommandExecutePlan> {
    plan?: P;
    data?: T;
}
