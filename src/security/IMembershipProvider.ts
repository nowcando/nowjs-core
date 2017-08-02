
import { IProvider } from "../core/IProvider";
import { IDType, IQueryOptions, IQueryResult } from "../data";
import {  IRole, ISession, IToken, IUser } from "./index";

// tslint:disable-next-line:no-empty-interface
export interface IMembershipBaseProvider extends IProvider {

}

export interface IMembershipProviderOptions {
        TenantID: string;
}

export interface IMembershipBasicProvider<TUser, TProfile, TMeta> extends IMembershipBaseProvider {
          createUserAccount(user: TUser, meta?: TMeta): Promise<TUser>;
          isExistUserAccountByID(id: IDType): Promise<boolean>;
          getUserAccountByID(id: IDType): Promise<TUser>;
          getUserAccountsByID(...id: IDType[]): Promise<TUser[]>;
          deleteUserAccountByID(id: IDType, meta?: TMeta): Promise<TUser>;
          updateUserAccountByID(user: TUser, meta?: TMeta): Promise<TUser>;
          updateUserProfileByID(id: IDType, profile: TProfile, meta?: TMeta): Promise<TUser>;
          getUsers(options?: IQueryOptions): Promise<IQueryResult<TUser>>;
}

export interface IMembershipUsernameProvider<TUser, TRole,
 TToken, TProfile, TMeta> extends IMembershipBasicProvider<TUser, TProfile, TMeta> {

        createToken(token: IToken, meta?: TMeta): Promise<IToken>;

        deleteUserAccountByUsername(username: string): Promise<boolean>;
        deleteUserAccountsByUsernames(...username: string[]): Promise<boolean>;

        isExistUser(username: string): Promise<boolean>;
        isExistUsers(...users: string[]): Promise<boolean>;
        isExistToken(token: string): Promise<boolean>;
        isExistTokens(...tokens: string[]): Promise<boolean>;

        disableUserAccountByUsername(username: string): Promise<boolean>;
        disableUserAccountsByUsernames(...users: string[]): Promise<boolean>;

        enableUserAccountByUsername(username: string): Promise<boolean>;
        enableUserAccountsByUsernames(...users: string[]): Promise<boolean>;

        getUserByUsername(username: string): Promise<TUser>;
        getUserByToken(token: string): Promise<TUser>;
        getUserByMobile(mobile: string): Promise<TUser>;
        getUserByEmail(email: string): Promise<TUser>;
        getUserByInviteCode(invitecode: string): Promise<TUser>;

        getInvitedUsersByUsername(username: string): Promise<TUser[]>;
        getInvitedUsersByInviteCode(invitecode: string): Promise<TUser[]>;

        updateUserByUsername(username: string, data: TUser): Promise<TUser>;
        updateUserByToken(token: string, data: TUser): Promise<TUser>;

        updateUserProfileByUsername(username: string, profile: TProfile): Promise<TUser>;
        updateUserProfileByToken(token: string, profile: TProfile): Promise<TUser>;

        lockUsersByUsernames(...username: string[]): Promise<TUser>;
        lockUsersByTokens(...token: string[]): Promise<TUser>;

        unlockUsersByUsernames(...username: string[]): Promise<TUser>;
        unlockUsersByTokens(...token: string[]): Promise<TUser>;

        // tslint:disable-next-line:no-shadowed-variable
        validateByUsernamePassword<TMeta>(username: string,
                                          password: string, tryCount: boolean, meta?: TMeta): Promise<TUser>;
        // tslint:disable-next-line:no-shadowed-variable
        validateByToken<TMeta>(token: string, tryCount: boolean, meta?: TMeta): Promise<TUser>;

        changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean>;
        recoveryPassword(username: string, meta?: TMeta): Promise<string>;
        resetPassword(recoveryCode: string, password: string, meta?: TMeta): Promise<boolean>;
        activateAccount(username: string, activationCode: string, meta?: TMeta): Promise<boolean>;
        deactivateAccount(username: string): Promise<boolean>;

        generatePassword(): string;
        generateActivationCode(): string;
        generateRecoveryCode(): string;
        generateHashCode(): string;
        generateInviteCode(): string;

        getUsernamePattern(): RegExp;
        getPasswordPattern(): RegExp;

        getDefaultRolesName(): string[];

        getAllRolesName(): Promise<string[]>;
        getAllRoles(options?: IQueryOptions): Promise<IQueryResult<string>>;

        getUsernamesInRoles(...roles: string[]): Promise<string[]>;
        getUsersInRoles(...roles: string[]): Promise<TUser>;
        getRolesOfUsersByUsername(...users: string[]): Promise<TRole[]>;

        getRoleByUsername(...users: string[]): Promise<TRole[]>;
        getRolesByUsername(...users: string[]): Promise<TRole[]>;

        hasRoleByName(role: string): Promise<boolean>;
        hasAnyRolesByName(...roles: string[]): Promise<boolean>;
        hasAllRolesByName(...roles: string[]): Promise<boolean>;

}
