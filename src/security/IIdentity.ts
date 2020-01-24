export interface IIdentity<T> {
    id: string | number | object;
    isAuthenticated: boolean;
    details: T;
}
