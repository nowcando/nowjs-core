import { Dispatch, GetState, Listener, Middleware, Reducer, Store as IStore, Unsubscribe } from "./index";
export * from "./Thunk";
export * from "./Types";
export class Store<S> implements IStore<S> {
    private state: S;
    private listeners: Listener[] = [];
    private isDispatching: boolean = false;

    constructor(initialState: S) {
        this.state = initialState;
    }

    public getState: GetState<S> = () => this.state;

    public dispatch: Dispatch<S> = (reducer: any) => {
        // tslint:disable-next-line:curly
        if (typeof reducer !== "function")
            throw new Error("Reducer is not a function: dispatch takes only reducers as functions.");
        // tslint:disable-next-line:curly
        if (this.isDispatching) throw new Error("Reducers may not dispatch actions.");
        this.isDispatching = true;
        try {
            this.state = reducer(this.state);
        } finally {
            this.isDispatching = false;
        }
        // tslint:disable:curly
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listeners.length; ++i)
            this.listeners[i]();
        return this.state;
    }

    public subscribe = (listener: Listener): Unsubscribe => {
        if (typeof listener !== "function")
            throw new Error("Listener is not a function: subscribe takes only listeners as functions.");
        this.listeners = [...this.listeners, listener];
        return () => (this.listeners = this.listeners.filter((lis) => lis !== listener));
    }

    public addMiddleware = (...middlewares: Middleware[]): this => {
        if (middlewares.some((middleware) => typeof middleware !== "function"))
            throw new Error("Middleware is not a function: addMiddleware takes only middlewares as functions.");
        middlewares.forEach((middleware) => (this.dispatch = middleware(this)(this.dispatch) as any));
        return this;
    }
}

export default Store;
