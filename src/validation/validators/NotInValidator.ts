
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_NOTIN_METADATA_KEY = Symbol("validation:validator:isNotIN");

export function isNotIn(values: any[], errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NOTIN_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new NotInValidator(values, errorMessage), target, propertyKey);
    };
}

export class NotInValidator extends ValidatorBase {

    constructor(private values: any[],
                errorMessage: StringFormatType =
         "The value of ${DisplayName} must greater than min: ${Min} .") {
        super("NotIn", errorMessage);
    }

    public get Values(): any[] {
        return this.values;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        if (this.values.some((item) => item === context.Value)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        }
        return Promise.resolve(true);
    }

}
