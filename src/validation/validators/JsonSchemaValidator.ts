
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_JSON_SCHEMA_METADATA_KEY = Symbol("validation:validator:isJsonSchema");

export function isJsonSchema( errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_JSON_SCHEMA_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new JsonSchemaValidator( errorMessage), target, propertyKey);
    };
}

export class JsonSchemaValidator extends ValidatorBase {
    private schema: object;
    constructor(schema: object | string,
                errorMessage: StringFormatType = "The value of ${DisplayName} must have valu type: ${ValueType} .") {
        super("JsonSchema", errorMessage);
        this.schema = this.getSchema(schema) ;
    }

    private getSchema(schemaName: string|object): object {
        if (typeof schemaName === "string") {
            return {}; // TODO: implement the schema repository access .
        } else if (typeof schemaName === "object") {
            return schemaName;
        }
    }

    private isMatch(value: any) {
        throw new Error("Not implemented method.");
        try {
            // https://en.wikipedia.org/wiki/JSON#JSON_Schema
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
