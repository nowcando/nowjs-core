
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { PatternValidator, PatternValidatorBase } from "./index";

export const VALIDATOR_POSITIVE_METADATA_KEY = Symbol("validation:validator:positive");

export function positive( errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_POSITIVE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new PositiveValidator( errorMessage), target, propertyKey);
    };
}

export const PATTERN_POSITIVE = /^\+?\d+\.?\d*$/ig;

export class PositiveValidator extends PatternValidatorBase {

    constructor( errorMessage: StringFormatType =
         "The value of ${DisplayName} must have positive pattern : ${Pattern} .") {
        super("Positive", PATTERN_POSITIVE, errorMessage);
    }

}
