
// tslint:disable:variable-name

import { getObjectLastKeyOfPath, getObjetctNestedPath, getReflectdDisplayName } from "../utils/index";
import { VALIDATION_PROPERTYPATH_SEPRATOR } from "./index";

export class ValidationContext<T, TValue>{
    private _value: any;
    private _displayName: string;
    constructor(private target: T, private propertyName: string) {
        this._value = getObjetctNestedPath(target, propertyName, VALIDATION_PROPERTYPATH_SEPRATOR);
        if (propertyName) {
            this._displayName = getObjectLastKeyOfPath(target, propertyName, VALIDATION_PROPERTYPATH_SEPRATOR);
            this._displayName = getReflectdDisplayName(target, propertyName, this._displayName);
        } else {
            this._displayName = propertyName;
        }
    }

    // tslint:disable:no-shadowed-variable
    public setOwnProperty<T>(name: string, value: T) {
        // tslint:disable:curly
        if (!name || typeof name !== "string" || name === "") return;
        (this as any)[name] = value;
    }

    public getOwnProperty<T>(name: string): T {
        if (!name || typeof name !== "string" || name === "") return;
        return (this as any)[name];
    }

    public get Target(): T {
        return this.target;
    }

    public get PropertyName(): string {
        return this.propertyName;
    }

    public get DisplayName(): string {
        return this._displayName;
    }

    public get Value(): TValue {
        if (!this.target) return this.target as any;
        if (!this.propertyName || typeof this.propertyName !== "string") return this.target as any;
        return this._value;
    }

}
