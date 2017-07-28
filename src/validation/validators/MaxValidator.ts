
// tslint:disable-next-line:ordered-imports
import { ValidatorBase, ValidationContext, ValidatorException, VALIDATOR_METADATA_KEY } from "../index";
import { StringFormatType } from "../../utils/index";

export const VALIDATOR_MAX_METADATA_KEY = Symbol("validation:validator:isMax");

export function isMax(max: number | Date, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_MAX_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new MaxValidator(max, errorMessage), target, propertyKey);
    };
}

export class MaxValidator extends ValidatorBase {

    constructor(private max: number | Date,
                errorMessage: StringFormatType = "The value of ${DisplayName} must smaller than min: ${Max} .") {
        super("Max", errorMessage);
    }

    public get Max(): number | Date {
        return this.max;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        if (context.Value > this.max) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        }
        return Promise.resolve(true);
    }

}
