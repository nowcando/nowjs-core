export interface IObjectDictionary<TValue> {
    [id: string]: TValue;
}
export type CallBack = (err?: Error, data?: any) => void;
