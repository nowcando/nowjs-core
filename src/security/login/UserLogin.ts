
import { IDType } from "../../data/index";
import { IUserLogin } from "../index";

export class UserLogin implements IUserLogin {
    public constructor(private provider: string, private providerKey: string,
                       private userID: IDType, private issuedAt: Date , private id?: IDType) {

                         }
    public get ID(): IDType {
        return this.id;
    }
    public get IssuedAt(): Date {
        return this.issuedAt;
    }
    public get LoginProvider(): string {
        return this.provider;
    }
    public get ProviderKey(): string {
        return this.providerKey;
    }
    public get UserID(): IDType {
        return this.userID;
    }
}
