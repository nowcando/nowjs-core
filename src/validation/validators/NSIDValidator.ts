
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { PatternValidator, PatternValidatorBase } from "./index";

export const VALIDATOR_NSID_METADATA_KEY = Symbol("validation:validator:isNSID");

export function isNSID(style: string = "universal", errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NSID_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new NSIDValidator(style, errorMessage), target, propertyKey);
    };
}

export const PATTERN_NSID_UNIVERSAL = /^\d{10}$/ig;
export const PATTERN_NSID_US = /^(\+\d{1,3}[- ]?)?\d{10}$/ig;
export const PATTERN_NSID_IR = /^\d{10}$/ig;
export const PATTERN_NSID_EN = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_NSID_UE = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_NSID_SA = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const PATTERN_NSID_IQ = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_NSID_AF = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export class NSIDValidator extends PatternValidatorBase {

    constructor(private style = "universal",
                errorMessage: StringFormatType =
            "The value of ${DisplayName} must have mobile pattern : ${Pattern} .") {
        super("NSID", /^/, errorMessage);

        switch (style.toLocaleLowerCase()) {
            case "universal": this.setPattern(PATTERN_NSID_UNIVERSAL); break;
            case "ir": this.setPattern(PATTERN_NSID_IR); break;
            case "iq": this.setPattern(PATTERN_NSID_IQ); break;
            case "sa": this.setPattern(PATTERN_NSID_EN); break;
            case "af": this.setPattern(PATTERN_NSID_AF); break;
            case "ue": this.setPattern(PATTERN_NSID_UE); break;
            case "en": this.setPattern(PATTERN_NSID_EN); break;
            default: this.setPattern(PATTERN_NSID_UNIVERSAL); break;
        }

    }

    public get Style(): string {
        return this.style;
    }

}
