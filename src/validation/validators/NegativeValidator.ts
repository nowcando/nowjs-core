
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { PatternValidator, PatternValidatorBase } from "./index";

export const VALIDATOR_NEGATIVE_METADATA_KEY = Symbol("validation:validator:negative");

export function negative(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NEGATIVE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new NegativeValidator(errorMessage), target, propertyKey);
    };
}

export const PATTERN_NEGATIVE = /^\-\d+\.?\d*$/ig;

export class NegativeValidator extends PatternValidatorBase {

    constructor(errorMessage: StringFormatType =
         "The value of ${DisplayName} must have negative pattern : ${Pattern} .") {
        super("Negative", PATTERN_NEGATIVE, errorMessage);

    }

}
