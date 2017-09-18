
import { IProvider } from "../../core/IProvider";
import { IDType, IQueryOptions, IQueryResult } from "../../data";
import { IUserDevice, IUserPhone, VerificationStatus } from "../index";

export interface IMembershipProvider<TUser, TProfile, TMeta> extends IProvider {
        createUser(tenantID: IDType, app: string, user: TUser, meta?: TMeta): Promise<TUser>;
        deleteUser(tenantID: IDType, app: string, userID: IDType, meta?: TMeta): Promise<TUser>;
        activateUser(tenantID: IDType, app: string, userID: IDType, notes?: string, meta?: TMeta): Promise<TUser>;
        suspendUser(tenantID: IDType, app: string, userID: IDType,
                    causeID: number, notes?: string, meta?: TMeta): Promise<TUser>;
        isUserExistsByUserID(tenantID: IDType, app: string, userID: IDType): Promise<boolean>;
        getUserByID(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        getUsersByID(tenantID: IDType, app: string, ...userID: IDType[]): Promise<TUser[]>;
        updateUserProfile(tenantID: IDType, app: string, userID: IDType,
                          profile: TProfile, meta?: TMeta): Promise<TUser>;
        getUsers(tenantID: IDType, app: string, options?: IQueryOptions): Promise<IQueryResult<TUser>>;

        getStatisticsNames(tenantID: IDType, app: string, userID: IDType): Promise<string[]>;
        getStatistics(tenantID: IDType, app: string, userID: IDType, ...name: string[]): Promise<any[]>;
        setStatistics(tenantID: IDType, app: string, userID: IDType, name: string, value: any): Promise<boolean>;
        removeStatistics(tenantID: IDType, app: string, userID: IDType, ...name: string[]): Promise<boolean>;
        resetStatistics(tenantID: IDType, app: string, userID: IDType): Promise<boolean>;
}

export interface IPhoneMembershipProvider<TUser, TProfile, TMeta> extends IMembershipProvider<TUser, TProfile, TMeta> {
        getUserPhoneByPhone(tenantID: IDType, app: string, phone: string,
                            verificationType: VerificationStatus): Promise<IUserPhone>;
        getUserPhonesByUserID(tenantID: IDType, app: string, userID: IDType,
                              verificationType: VerificationStatus): Promise<IUserPhone[]>;
        getUserPhonesByDeviceID(tenantID: IDType, app: string, userID: IDType,
                                verificationType: VerificationStatus): Promise<IUserPhone[]>;
        getUserDeviceByDeviceID(tenantID: IDType, app: string, deviceID: IDType,
                                verificationType: VerificationStatus): Promise<IUserDevice>;
        getUserDeviceByCode(tenantID: IDType, app: string, code: string,
                            verificationType: VerificationStatus): Promise<IUserDevice>;
        getUserDevicesByUserID(tenantID: IDType, app: string, userID: IDType,
                               verificationType: VerificationStatus): Promise<IUserDevice[]>;

        isUserExistsByPhone(tenantID: IDType, app: string, phone: string): Promise<boolean>;
        getUserByPhone(tenantID: IDType, app: string, phone: string): Promise<TUser>;
        getUsersByPhones(tenantID: IDType, app: string, ...phone: string[]): Promise<TUser[]>;
        validateUserByPhone(tenantID: IDType, app: string, phone: string, meta?: TMeta): Promise<string>;
        validateUserPhoneTwoFactorCode(tenantID: IDType, app: string, verifyToken: string,
                                       tfaCode: string, deviceInfo: any,
                                       tryCount: boolean, meta?: TMeta): Promise<TUser>;
        generatePhoneTwoFactorCode(tenantID: IDType, app: string): string;
        sendPhoneTwoFactorCode(tenantID: IDType, app: string,
                               phone: string, tfaCode: string, expiresAt?: Date, meta?: TMeta): Promise<TUser>;
        enablePhoneTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        disablePhoneTwoFactor(tenantID: IDType, app: string, userID: IDType): Promise<TUser>;
        updateUserDefaultPhone(tenantID: IDType, app: string,
                               userID: IDType, phone: string, meta?: TMeta): Promise<TUser>;
        addUserPhone(tenantID: IDType, app: string, userid: IDType, phone: string, meta?: TMeta): Promise<TUser>;
        removeUserPhone(tenantID: IDType, app: string, userid: IDType, phone: string, meta?: TMeta): Promise<TUser>;

        addUserDevice(tenantID: IDType, app: string, userid: IDType,
                      device: IUserDevice, meta?: TMeta): Promise<IUserDevice>;
        removeUserDevice(tenantID: IDType, app: string, userid: IDType,
                         device: IUserDevice, meta?: TMeta): Promise<IUserDevice>;
}

export interface IUsernameMembershipProvider<TUser, TProfile, TMeta> extends
        IMembershipProvider<TUser, TProfile, TMeta> {
        isUserExistsByUsername(tenantID: IDType, app: string, username: string): Promise<boolean>;
        getUserByUsername(tenantID: IDType, app: string, username: string): Promise<TUser>;
        getUsersByUsername(tenantID: IDType, app: string, ...username: string[]): Promise<TUser[]>;
        validateUserByUsername(tenantID: IDType, app: string, username: string, password: string,
                               tryCount: boolean, meta?: TMeta): Promise<TUser>;
        generatePassword(tenantID: IDType, app: string): string;
        generateSalt(tenantID: IDType, app: string): string;
        generateConfirmCode(tenantID: IDType, app: string): string;
        sendUserConfirmCode(tenantID: IDType, app: string,
                            username: string, confirmCode: string, expiresAt?: Date, meta?: TMeta): Promise<TUser>;
        validateUserConfirmCode(tenantID: IDType, app: string, confirmCode: string,
                                tryCount: boolean, meta?: TMeta): Promise<TUser>;
        changePassowrd(tenantID: IDType, app: string, username: string, oldPassword: string, newPassword: string,
                       tryCount: boolean, meta?: TMeta): Promise<TUser>;
        resetPassowrd(tenantID: IDType, app: string, username: string, oldPassword: string, newPassword: string,
                      meta?: TMeta): Promise<TUser>;
        forgetPassowrd(tenantID: IDType, app: string,
                       username: string, securityAnswers?: string[], meta?: TMeta): Promise<TUser>;
        forgetUsername(tenantID: IDType, app: string,
                       username: string, securityAnswers?: string[], meta?: TMeta): Promise<TUser>;

}

export interface IEmailMembershipProvider<TUser, TProfile, TMeta> extends
        IMembershipProvider<TUser, TProfile, TMeta> {
        isUserExistsByEmail(tenantID: IDType, app: string, email: string): Promise<boolean>;
        getUserByEmail(tenantID: IDType, app: string, email: string): Promise<TUser>;
        getUsersByEmail(tenantID: IDType, app: string, ...email: string[]): Promise<TUser[]>;
        generateConfirmCode(tenantID: IDType, app: string): string;
        sendEmailConfirmCode(tenantID: IDType, app: string,
                             email: string, confirmCode: string, expiresAt?: Date, meta?: TMeta): Promise<TUser>;
        validateUserEmailConfirmCode(tenantID: IDType, app: string, confirmCode: string,
                                     tryCount: boolean, meta?: TMeta): Promise<TUser>;

        updateUserDefaultEmail(tenantID: IDType, app: string,
                               username: string, email: string, meta?: TMeta): Promise<TUser>;
        addUserEmail(tenantID: IDType, app: string, userid: IDType, email: string, meta?: TMeta): Promise<TUser>;
        removeUserEmail(tenantID: IDType, app: string, userid: IDType, email: string, meta?: TMeta): Promise<TUser>;
}
