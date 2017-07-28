
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_IN_METADATA_KEY = Symbol("validation:validator:isIN");

export function isIn(values: any[], errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_IN_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new InValidator(values, errorMessage), target, propertyKey);
    };
}

export class InValidator extends ValidatorBase {

    constructor(private values: any[],
                errorMessage: StringFormatType =
         "The value of ${DisplayName} must greater than min: ${Min} .") {
        super("In", errorMessage);
    }

    public get Values(): any[] {
        return this.values;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        if (!this.values.some((item) => item === context.Value)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));
        }
        return Promise.resolve(true);
    }

}
