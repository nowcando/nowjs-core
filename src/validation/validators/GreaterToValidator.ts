
import { StringFormatType } from "../../utils/index";
import {
    CompareToValidator, ValidationContext,
    VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException,
} from "../index";
import { CompareToValidatorBase } from "./index";
export const VALIDATOR_GREATERTO_METADATA_KEY = Symbol("validation:validator:isGreaterTo");

export function isGreaterTo(anotherTarget: any, anotherPropertyName: string = "", errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_GREATERTO_METADATA_KEY, null, target, propertyKey);
        // tslint:disable-next-line:max-line-length
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new GreaterToValidator(anotherTarget, anotherPropertyName, errorMessage), target, propertyKey);
    };
}

export class GreaterToValidator extends CompareToValidatorBase {

    constructor(anotherTarget: any, anotherPropertyName: string = "",
                errorMessage: StringFormatType = "The value of ${DisplayName} must ${style}  .") {
        super("GreaterTo", "greater", anotherTarget, anotherPropertyName, errorMessage);
    }
}
