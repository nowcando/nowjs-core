




import { ValidatorBase, ValidationContext, ValidatorError, VALIDATOR_METADATA_KEY } from "../index";
import { StringFormatType } from "../../utils/index";
import { PatternValidatorBase, PatternValidator } from "./index";

export const VALIDATOR_POSTALCODE_METADATA_KEY = Symbol("validation:validator:isPostalCode");

export function isPostalCode(style:string="universal", errorMessage?: StringFormatType) {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        let original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_POSTALCODE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new PostalCodeValidator(style,errorMessage), target, propertyKey);
    }
}

export const PATTERN_POSTALCODE_UNIVERSAL = /^\d{10}$/ig;
export const PATTERN_POSTALCODE_US = /^(\+\d{1,3}[- ]?)?\d{10}$/ig;
export const PATTERN_POSTALCODE_IR = /^\d{10}$/ig;
export const PATTERN_POSTALCODE_EN = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_POSTALCODE_UE = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_POSTALCODE_SA = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const PATTERN_POSTALCODE_IQ = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_POSTALCODE_AF = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export class PostalCodeValidator extends PatternValidatorBase {

    constructor(private style = "universal", errorMessage: StringFormatType = "The value of ${DisplayName} must have mobile pattern : ${Pattern} .") {
        super("PostalCode", /^/, errorMessage);

        switch (style.toLocaleLowerCase()) {
            case "universal": this.setPattern(PATTERN_POSTALCODE_UNIVERSAL); break;
            case "ir": this.setPattern(PATTERN_POSTALCODE_IR); break;
            case "iq": this.setPattern(PATTERN_POSTALCODE_IQ); break;
            case "sa": this.setPattern(PATTERN_POSTALCODE_EN); break;
            case "af": this.setPattern(PATTERN_POSTALCODE_AF); break;
            case "ue": this.setPattern(PATTERN_POSTALCODE_UE); break;
            case "en": this.setPattern(PATTERN_POSTALCODE_EN); break;
            default: this.setPattern(PATTERN_POSTALCODE_UNIVERSAL); break;
        }

    }

    public get Style(): string {
        return this.style;
    }

}