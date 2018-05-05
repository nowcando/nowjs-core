
// tslint:disable-next-line:ordered-imports
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_STRING_METADATA_KEY = Symbol("validation:validator:isString");

export function isString(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_STRING_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new StringValidator( errorMessage), target, propertyKey);
    };
}

export class StringValidator extends ValueTypeValidatorBase {
    constructor( errorMessage: StringFormatType =
         "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("String", "string", errorMessage);
    }
}
