
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_INRANGE_METADATA_KEY = Symbol("validation:validator:isInRange");
export const VALIDATOR_INLENGTH_METADATA_KEY = Symbol("validation:validator:isInLength");

export function isInRange(min: number | Date, max: number | Date, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_INRANGE_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new InRangeValidator(min, max, errorMessage), target, propertyKey);
    };
}

export function isInLength(min: number | Date, max: number | Date, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_INLENGTH_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new InRangeValidator(min, max, errorMessage), target, propertyKey);
    };
}

export class InRangeValidatorBase extends ValidatorBase {

    constructor(name: string , private min: number | Date,
                private max: number | Date,
                errorMessage: StringFormatType =
                "The value of ${DisplayName} must between as min: ${Min} and max : ${Max}.") {
        super(name, errorMessage);
    }

    public get Min(): number | Date {
        return this.min;
    }

    public get Max(): number | Date {
        return this.max;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }
        if (typeof context.Value === "string") {
            if (context.Value.length < this.min || context.Value.length > this.max) {

                return Promise.reject(new ValidatorException(this.Name,
                    context.Target,
                    context.PropertyName,
                    this.formatErrorMessage(context)));

            }
        }   else if (context.Value < this.min || context.Value > this.max) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        }
        return Promise.resolve(true);
    }

}

// tslint:disable-next-line:max-classes-per-file
export class InRangeValidator extends InRangeValidatorBase {
    constructor( min: number | Date,
                 max: number | Date,
                 errorMessage: StringFormatType =
                  "The value of ${DisplayName} must between as min: ${Min} and max : ${Max}.") {
        super("InRange", min, max, errorMessage);
    }

}

// tslint:disable-next-line:max-classes-per-file
export class InLengthValidator extends InRangeValidatorBase {
    constructor( min: number | Date,
                 max: number | Date,
                 errorMessage: StringFormatType =
                  "The value of ${DisplayName} must between as min: ${Min} and max : ${Max}.") {
        super("InLength", min, max, errorMessage);
    }

}
