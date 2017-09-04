
import { IProvider } from "../../core/IProvider";
import { IDType, IQueryOptions, IQueryResult } from "../../data";

export interface IMembershipProvider<TUser, TProfile, TMeta> extends IProvider {
          createUser(tenantID: IDType, app: string, user: TUser, meta?: TMeta): Promise<TUser>;
          deleteUser(tenantID: IDType, app: string, userID: IDType, meta?: TMeta): Promise<TUser>;
          activateUser(tenantID: IDType, app: string, userID: IDType, notes?: string, meta?: TMeta): Promise<TUser>;
          suspendUser(tenantID: IDType, app: string, userID: IDType,
                      causeID: number , notes?: string, meta?: TMeta): Promise<TUser>;
          isUserExistsByUserID(tenantID: IDType, app: string, userID: IDType): Promise<boolean>;
          getUserByID(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
          getUsersByID(tenantID: IDType, app: string, ...userID: IDType[]): Promise<TUser[]>;
          updateUserProfile(tenantID: IDType, app: string, userID: IDType,
                            profile: TProfile, meta?: TMeta): Promise<TUser>;
          getUsers(tenantID: IDType, app: string, options?: IQueryOptions): Promise<IQueryResult<TUser>>;
}

export interface IMobileMembershipProvider<TUser, TProfile, TMeta> extends IMembershipProvider<TUser, TProfile, TMeta> {
        isUserExistsByMobile(tenantID: IDType, app: string, mobile: string): Promise<boolean>;
        getUserByMobile(tenantID: IDType, app: string, mobile: string): Promise<TUser>;
        getUsersByMobiles(tenantID: IDType, app: string, ...mobile: string[]): Promise<TUser[]>;
        validateUserByMobile(tenantID: IDType, app: string, mobile: string ,
                             tryCount: boolean , meta?: TMeta): Promise<TUser>;
        validateUserMobileTwoFactorCode(tenantID: IDType, app: string, tempToken: string  ,
                                        tfaCode: string , tryCount: boolean , meta?: TMeta): Promise<TUser>;
        generateMobileTwoFactorCode(tenantID: IDType, app: string): string;
        sendMobileTwoFactorCode(tenantID: IDType, app: string,
                                mobile: string , tfaCode: string , expiresAt?: Date , meta?: TMeta): Promise<TUser>;
        enableMobileTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        disableMobileTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        updateUserDefaultMobile(tenantID: IDType, app: string,
                                userID: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
        addUserMobile(tenantID: IDType, app: string, userid: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
        removeUserMobile(tenantID: IDType, app: string, userid: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
 }

export interface IUsernameMembershipProvider<TUser, TProfile, TMeta> extends
        IMembershipProvider<TUser, TProfile, TMeta> {
        isUserExistsByUsername(tenantID: IDType, app: string, username: string): Promise<boolean>;
        getUserByUsername(tenantID: IDType, app: string, username: string): Promise<TUser>;
        getUsersByUsername(tenantID: IDType, app: string, ...username: string[]): Promise<TUser[]>;
        validateUserByUsername(tenantID: IDType, app: string, username: string , password: string ,
                               tryCount: boolean , meta?: TMeta): Promise<TUser>;
        generatePassword(tenantID: IDType, app: string): string;
        generateSalt(tenantID: IDType, app: string): string;
        generateConfirmCode(tenantID: IDType, app: string): string;
        sendUserConfirmCode(tenantID: IDType, app: string,
                            username: string , confirmCode: string, expiresAt?: Date , meta?: TMeta): Promise<TUser>;
        validateUserConfirmCode(tenantID: IDType, app: string , confirmCode: string  ,
                                tryCount: boolean , meta?: TMeta): Promise<TUser>;
        changePassowrd(tenantID: IDType, app: string, username: string , oldPassword: string , newPassword: string ,
                       tryCount: boolean , meta?: TMeta): Promise<TUser>;
        resetPassowrd(tenantID: IDType, app: string, username: string , oldPassword: string , newPassword: string ,
                      meta?: TMeta): Promise<TUser>;
        forgetPassowrd(tenantID: IDType, app: string,
                       username: string , securityAnswers?: string[] , meta?: TMeta): Promise<TUser>;
        forgetUsername(tenantID: IDType, app: string,
                       username: string , securityAnswers?: string[] , meta?: TMeta): Promise<TUser>;

 }

export interface IEmailMembershipProvider<TUser, TProfile, TMeta> extends
        IMembershipProvider<TUser, TProfile, TMeta> {
        isUserExistsByEmail(tenantID: IDType, app: string, email: string): Promise<boolean>;
        getUserByEmail(tenantID: IDType, app: string, email: string): Promise<TUser>;
        getUsersByEmail(tenantID: IDType, app: string, ...email: string[]): Promise<TUser[]>;
        generateConfirmCode(tenantID: IDType, app: string): string;
        sendEmailConfirmCode(tenantID: IDType, app: string,
                             email: string , confirmCode: string , expiresAt?: Date , meta?: TMeta): Promise<TUser>;
        validateUserEmailConfirmCode(tenantID: IDType, app: string , confirmCode: string ,
                                     tryCount: boolean , meta?: TMeta): Promise<TUser>;

        updateUserDefaultEmail(tenantID: IDType, app: string,
                               username: string , email: string , meta?: TMeta): Promise<TUser>;
        addUserEmail(tenantID: IDType, app: string, userid: IDType , email: string , meta?: TMeta): Promise<TUser>;
        removeUserEmail(tenantID: IDType, app: string, userid: IDType, email: string , meta?: TMeta): Promise<TUser>;
}
