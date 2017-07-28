
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_ENUM_METADATA_KEY = Symbol("validation:validator:isEnum");

export function isEnum(valueType: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_ENUM_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new EnumValidator(valueType, errorMessage), target, propertyKey);
    };
}

export class EnumValidator extends ValueTypeValidatorBase {
    constructor(valueType: string,
                errorMessage: StringFormatType =
         "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("Enum", valueType, errorMessage);
    }
}
