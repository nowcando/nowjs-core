import { Dispatch, GetState, Middleware } from "./Types";
// tslint:disable:interface-name
// tslint:disable:callable-types
export interface Delegate<S, E, R> {
  (dispatch: Dispatch<S>, getState: GetState<S>, extraArgument: E): R;
}

export interface Thunk<S, E, R> {
  (state: S): Delegate<S, E, R>;
}

declare module "./Types" {
  // tslint:disable:no-shadowed-variable
  export interface Dispatch<S> {
    <R, E = any>(thunk: Thunk<S, E, R>): R;
  }
}

export interface ThunkMiddleware<E> extends Middleware {
  withExtraArgument: <EA>(extraArgument: EA) => ThunkMiddleware<EA>;
}

const thunkFactory = <E>(extraArgument?: E): ThunkMiddleware<E> => {
  const thunk = ((store) => (next) => (reducer) => {
    // tslint:disable-next-line:curly
    if (typeof reducer !== "function") throw new Error("Thunk reducer must return a function");
    const result: any = reducer(store.getState());
    // tslint:disable-next-line:curly
    if (typeof result === "function") return result(store.dispatch, store.getState, extraArgument);
    // tslint:disable-next-line:curly
    else return next((_) => result);
  }) as ThunkMiddleware<E>;

  thunk.withExtraArgument = thunkFactory;

  return thunk;
};

export const thunk = thunkFactory();
