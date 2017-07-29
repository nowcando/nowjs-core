
export * from "./IWebServerProvider";

// tslint:disable-next-line:ban-types
export interface IWebAppMiddleware<TReq, TRes, TNext extends Function, TValue> {
    // tslint:disable-next-line:callable-types
    (req: TReq, res: TRes, next: TNext, value: TValue, name: string): any;
}
