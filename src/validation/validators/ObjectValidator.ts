
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_OBJECT_METADATA_KEY = Symbol("validation:validator:isObject");

export function isObject(valueType: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_OBJECT_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new ObjectValidator(errorMessage), target, propertyKey);
    };
}

export class ObjectValidator extends ValueTypeValidatorBase {
    constructor(
        errorMessage: StringFormatType = "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("Object", "object", errorMessage);
    }
}
