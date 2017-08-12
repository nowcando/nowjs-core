
import { IProvider } from "../../core/IProvider";
import { IDType, IQueryOptions, IQueryResult } from "../../data";

export interface IMembershipProvider<TUser, TProfile, TMeta> extends IProvider {
          create(tenantID: IDType, app: string, user: TUser, meta?: TMeta): Promise<TUser>;
          delete(tenantID: IDType, app: string, userID: IDType, meta?: TMeta): Promise<TUser>;
          activate(tenantID: IDType, app: string, userID: IDType, notes?: string, meta?: TMeta): Promise<TUser>;
          suspend(tenantID: IDType, app: string, userID: IDType, notes?: string, meta?: TMeta): Promise<TUser>;
          isExistsByUserID(tenantID: IDType, app: string, userID: IDType): Promise<boolean>;
          getUserID(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
          getUsersByID(tenantID: IDType, app: string, ...userID: IDType[]): Promise<TUser[]>;
          updateProfile(tenantID: IDType, app: string, userID: IDType, profile: TProfile, meta?: TMeta): Promise<TUser>;
          getUsers(tenantID: IDType, app: string, options?: IQueryOptions): Promise<IQueryResult<TUser>>;
}

export interface IMobileMembershipProvider<TUser, TProfile, TMeta> extends IMembershipProvider<TUser, TProfile, TMeta> {
        isExistsByMobile(tenantID: IDType, app: string, mobile: string): Promise<boolean>;
        getUserByMobile(tenantID: IDType, app: string, mobile: string): Promise<TUser>;
        validateMobile(tenantID: IDType, app: string, mobile: string ,
                       tryCount: boolean , meta?: TMeta): Promise<TUser>;
        validateMobileTwoFactorCode(tenantID: IDType, app: string, tempToken: string  ,
                                    tfaCode: string , tryCount: boolean , meta?: TMeta): Promise<TUser>;
        generateMobileTwoFactorCode(tenantID: IDType, app: string): string;
        sendMobileTwoFactorCode(tenantID: IDType, app: string,
                                mobile: string , tfaCode: string , meta?: TMeta): Promise<TUser>;
        enableMobileTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        disableMobileTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        updateDefaultMobile(tenantID: IDType, app: string,
                            userID: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
        addMobile(tenantID: IDType, app: string, userID: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
        removeMobile(tenantID: IDType, app: string, userID: IDType , mobile: string , meta?: TMeta): Promise<TUser>;
 }

export interface IUsernameMembershipProvider<TUser, TProfile, TMeta> extends
        IMembershipProvider<TUser, TProfile, TMeta> {
        isExistsByUsername(tenantID: IDType, app: string, username: string): Promise<boolean>;
        getUserByUsername(tenantID: IDType, app: string, username: string): Promise<TUser>;
        validateUsername(tenantID: IDType, app: string, username: string , password: string ,
                         tryCount: boolean , meta?: TMeta): Promise<TUser>;
        generatePassword(tenantID: IDType, app: string): string;
        generateSalt(tenantID: IDType, app: string): string;
        generateConfirmCode(tenantID: IDType, app: string): string;
        sendUserConfirmCode(tenantID: IDType, app: string,
                            username: string , confirmCode: string , meta?: TMeta): Promise<TUser>;
        validateUserConfirmCode(tenantID: IDType, app: string , confirmCode: string ,
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
        isExistsByEmail(tenantID: IDType, app: string, username: string): Promise<boolean>;
        getUserByEmail(tenantID: IDType, app: string, username: string): Promise<TUser>;

        generateConfirmCode(tenantID: IDType, app: string): string;
        sendEmailConfirmCode(tenantID: IDType, app: string,
                             email: string , confirmCode: string , meta?: TMeta): Promise<TUser>;
        validateEmailConfirmCode(tenantID: IDType, app: string , confirmCode: string ,
                                 tryCount: boolean , meta?: TMeta): Promise<TUser>;

        updateDefaultEmail(tenantID: IDType, app: string,
                           username: string , email: string , meta?: TMeta): Promise<TUser>;
        addEmail(tenantID: IDType, app: string, username: string , email: string , meta?: TMeta): Promise<TUser>;
        removeEmail(tenantID: IDType, app: string, username: string , email: string , meta?: TMeta): Promise<TUser>;
}
