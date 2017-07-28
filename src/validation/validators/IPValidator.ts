
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { PatternValidator, PatternValidatorBase } from "./index";

export const VALIDATOR_IP_METADATA_KEY = Symbol("validation:validator:isIP");

export interface IPValidatorOptions {
    Version?: string[];
    NetMask?: boolean;
}

export function isIP(options?: IPValidatorOptions, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_IP_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new IPValidator(options, errorMessage), target, propertyKey);
    };
}

// tslint:disable-next-line:max-line-length
export const PATTERN_IP_UNIVERSAL = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ig;

export class IPValidator extends PatternValidatorBase {

    constructor(options?: IPValidatorOptions,
                errorMessage: StringFormatType = "The value of ${DisplayName} must have ip pattern : ${Pattern} .") {
        super("IP", PATTERN_IP_UNIVERSAL, errorMessage);
        options = options || {
            NetMask: false, Version: ["v4"],
        };
    }

}
