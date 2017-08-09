
export enum AuthenticationStatus {
    Accepted = 1 , Rejected = 2, Suspended = 4 ,
}

// tslint:disable-next-line:interface-name
export interface AuthenticationResult {
    Message: string;
    Code: number;
    Result: AuthenticationStatus;
}

export interface IAuthenticationProvider<TSignin, TResult extends AuthenticationResult> {
    signin(signinInfo: TSignin): Promise<TResult>;
    signout(): Promise<TResult>;
}
