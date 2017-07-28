
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

import { StringFormatType } from "../../utils/index";
import { PatternValidator, PatternValidatorBase } from "./index";

export const VALIDATOR_MOBILE_METADATA_KEY = Symbol("validation:validator:isMobile");

export function isMobile(style: string = "universal", errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_MOBILE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new MobileValidator(style, errorMessage), target, propertyKey);
    };
}

export const PATTERN_MOBILE_UNIVERSAL = /^(\+\d{1,3}[- ]?)?\d{10}$/ig;
export const PATTERN_MOBILE_US = /^(\+\d{1,3}[- ]?)?\d{10}$/ig;
export const PATTERN_MOBILE_IR = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_MOBILE_EN = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_MOBILE_UE = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_MOBILE_SA = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const PATTERN_MOBILE_IQ = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const PATTERN_MOBILE_AF = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export class MobileValidator extends PatternValidatorBase {

    constructor(private style = "universal",
                errorMessage: StringFormatType =
                 "The value of ${DisplayName} must have mobile pattern : ${Pattern} .") {
        super("Mobile", /^/, errorMessage);

        switch (style.toLocaleLowerCase()) {
            case "universal": this.setPattern(PATTERN_MOBILE_UNIVERSAL); break;
            case "ir": this.setPattern(PATTERN_MOBILE_IR); break;
            case "iq": this.setPattern(PATTERN_MOBILE_IQ); break;
            case "sa": this.setPattern(PATTERN_MOBILE_EN); break;
            case "af": this.setPattern(PATTERN_MOBILE_AF); break;
            case "ue": this.setPattern(PATTERN_MOBILE_UE); break;
            case "en": this.setPattern(PATTERN_MOBILE_EN); break;
            default: this.setPattern(PATTERN_MOBILE_UNIVERSAL); break;
        }

    }

    public get Style(): string {
        return this.style;
    }

}
