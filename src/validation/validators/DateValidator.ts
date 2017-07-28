
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_DATE_METADATA_KEY = Symbol("validation:validator:isDate");

export function isDate( errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_DATE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new DateValidator( errorMessage), target, propertyKey);
    };
}

export class DateValidator extends ValueTypeValidatorBase {
    constructor(errorMessage: StringFormatType = "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("Date", "Date", errorMessage);
    }
}
