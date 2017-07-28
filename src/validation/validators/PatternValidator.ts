
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_PATTERN_METADATA_KEY = Symbol("validation:validator:isPattern");

export function isPattern(pattern: RegExp, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_PATTERN_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new PatternValidator(pattern, errorMessage), target, propertyKey);
    };
}

export class PatternValidatorBase extends ValidatorBase {
    constructor(name: string, private pattern: RegExp,
                errorMessage: StringFormatType =
          "The value of ${DisplayName} must have pattern : ${Pattern} .") {
        super(name, errorMessage);
    }

    protected setPattern(pattern: RegExp) {
        this.pattern = pattern;
    }

    public get Pattern(): RegExp {
        return this.pattern;
    }

    // tslint:disable-next-line:member-ordering
    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null || typeof context.Value !== "string")) {
            return Promise.resolve(true);
        }

        if (!this.pattern.test(context.Value)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        } else {
            return Promise.resolve(true);
        }

    }
}

// tslint:disable-next-line:max-classes-per-file
export class PatternValidator extends PatternValidatorBase {

    constructor(pattern: RegExp,
                errorMessage: StringFormatType =
          "The value of ${DisplayName} must have pattern : ${Pattern} .") {
        super("Pattern", pattern, errorMessage);
    }

}
