
import { StringFormatType } from "../../utils/index";
import { CompareToValidator, ValidationContext, VALIDATOR_METADATA_KEY,
     ValidatorBase, ValidatorException } from "../index";
import { CompareToValidatorBase } from "./index";
export const VALIDATOR_NOTEQUALTO_METADATA_KEY = Symbol("validation:validator:isNotEqualTo");

export function isNotEqualTo(anotherTarget: any, anotherPropertyName: string = "", errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NOTEQUALTO_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new NotEqualToValidator(anotherTarget, anotherPropertyName, errorMessage), target, propertyKey);
    };
}

export class NotEqualToValidator extends CompareToValidatorBase {

    constructor(anotherTarget: any, anotherPropertyName: string = "",
                errorMessage: StringFormatType = "The value of ${DisplayName} must ${style}  .") {
        super("NotEqualTo", "notEqual", anotherTarget, anotherPropertyName, errorMessage);
    }

}
