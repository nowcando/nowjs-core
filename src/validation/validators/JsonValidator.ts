
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_JSON_METADATA_KEY = Symbol("validation:validator:isJson");

export function isJson( errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_JSON_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new JsonValidator( errorMessage), target, propertyKey);
    };
}

export class JsonValidator extends ValidatorBase {
    constructor(
        errorMessage: StringFormatType = "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("Json", errorMessage);
    }

    private isMatch(value: any) {
        try {
           return  JSON.parse(value) !== null;
        } catch (error) {
            return false;
        }
    }

      // tslint:disable-next-line:member-ordering
      public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        if (!this.isMatch(context.Value)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));

        }
        return Promise.resolve(true);
    }
}
