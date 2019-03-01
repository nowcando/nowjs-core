
import { Exception } from "../../exceptions/index";
import { getObjetctNestedPath, StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";
import { ValueTypeValidatorBase } from "./index";

export const VALIDATOR_JSON_SCHEMA_METADATA_KEY = Symbol("validation:validator:isJsonSchema");

export function isJsonSchema(errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_JSON_SCHEMA_METADATA_KEY, null, target, propertyKey);
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY, new JsonSchemaValidator(errorMessage), target, propertyKey);
    };
}

export class JsonSchemaValidator extends ValidatorBase {
    private schema: any;
    constructor(schema: object | string,
                errorMessage: StringFormatType = "The value of ${DisplayName} must have value type: ${ValueType} .") {
        super("JsonSchema", errorMessage);
        this.schema = this.getSchema(schema);
    }

    // see schema : https://trac.tools.ietf.org/html/draft-wright-json-schema-validation-01

    private getSchema(schemaName: string | object): object {
        if (typeof schemaName === "string") {
            return {}; // TODO: implement the schema repository access .
        } else if (typeof schemaName === "object") {
            return schemaName;
        }
    }

    private isMatch(value: any) {
        // https://en.wikipedia.org/wiki/JSON#JSON_Schema
        try {
            this.traverseProperties(this.schema, value, "");
            return true;
        } catch (error) {
            return false;
        }
    }

    private traverseProperties(schema: any, target: any, path: string) {

        const typeName = schema.type || "any";
        const actualValue = path === "" ? target : getObjetctNestedPath(target, path);
        let actualType: string = typeof actualValue;
        if (actualType === "object" && Array.isArray(actualValue)) {
            actualType = "array";
        }
        if (actualType === "undefined") {
            throw new Exception(`Property "${path} is not defined"`);
        } else if (typeName !== "any") {
            if (actualType !== typeName) {
                throw new Exception(`Property "${path} is not defined type"`);
            }
        }
        if (actualType === "string") {
            const format = schema.format;
            if (format) {
                const meetFormat = 1 !== 1; // format;
                if (meetFormat === false) {
                    throw new Exception(`Property "${path}" does not meet format rule.`);
                }
            }
            const maxLength = schema.maxLength;
            if (maxLength) {
                const meetMaxLength = (actualValue as string).length <= maxLength;
                if (meetMaxLength === false) {
                    throw new Exception(`Property "${path}" does not meet max length rule.`);
                }
            }
            const minLength = schema.minLength;
            if (minLength) {
                const meetMinLength = (actualValue as string).length >= minLength;
                if (meetMinLength === false) {
                    throw new Exception(`Property "${path}" does not meet min length rule.`);
                }
            }
            const pattern = schema.pattern ? new RegExp(schema.pattern) : null;
            if (pattern) {
                const meetPattern = pattern.test(actualValue);
                if (meetPattern === false) {
                    throw new Exception(`Property "${path}" does not meet pattern rule.`);
                }
            }
        } else if (actualType === "number") {
            const maximum = schema.maximum;
            const minimum = schema.minimum;
            if (maximum) {
                const meetMaxItems = actualValue <= maximum;
                if (meetMaxItems === false) {
                    throw new Exception(`Property "${path}" does not meet maximum rule.`);
                }
            }
            if (minimum) {
                const meetMinItems = actualValue >= minimum;
                if (meetMinItems === false) {
                    throw new Exception(`Property "${path}" does not meet minimum rule.`);
                }
            }
        } else if (actualType === "array") {
            const maxItems = schema.maxItems;
            if (maxItems) {
                const meetMaxItems = (actualValue as any[]).length <= maxItems;
                if (meetMaxItems === false) {
                    throw new Exception(`Property "${path}" does not meet max items rule.`);
                }
            }
            const minItems = schema.minItems;
            if (minItems) {
                const meetMinItems = (actualValue as any[]).length >= minItems;
                if (meetMinItems === false) {
                    throw new Exception(`Property "${path}" does not meet min items rule.`);
                }
            }
            const uniqueItems = schema.uniqueItems;
            if (uniqueItems) {
                const meetUniqueItems = !((actualValue as any[]).hasDuplicate());
                if (meetUniqueItems === false) {
                    throw new Exception(`Property "${path}" does not meet unique items rule.`);
                }
            }
            const itemsTypeName = schema.items ? schema.items.type || "any" : "any";
            if (itemsTypeName !== "any") {
                const meetItemsType = (actualValue as any[]).every((item) => typeof item === itemsTypeName);
                if (meetItemsType === false) {
                    throw new Exception(`Property "${path}" does not meet array item types rule.`);
                }
            }

        } else if (actualType === "object") {
            const definitions: any = schema.definitions || {};
            const properties = schema.properties || {};
            const requiredProperties: string[] = schema.required || [];
            const targetKeys = Object.keys(actualValue );
            const propertyNames = schema.propertyNames || Object.keys(schema.properties);

            const maxProperties = schema.maxProperties;
            if (maxProperties) {
                const meetMaxProperties = targetKeys.length >= maxProperties;
                if (meetMaxProperties === false) {
                    throw new Exception(`Property "${path}" does not meet max properties rule.`);
                }
            }

            const minProperties = schema.minProperties;
            if (minProperties) {
                const meetMinProperties = targetKeys.length <= minProperties;
                if (meetMinProperties === false) {
                    throw new Exception(`Property "${path}" does not meet min properties rule.`);
                }
            }

            if (requiredProperties.length > 0) {
                if (targetKeys.length < requiredProperties.length) {
                    throw new Exception(`Property "${path}" does not meet required properties count rule.`);
                }
                const meetRequired = requiredProperties.every((item) => targetKeys.includes(item));
                if (meetRequired === false) {
                    throw new Exception(`Property "${path}" does not meet required properties rule.`);
                }
            }
            if (targetKeys.length > propertyNames.length) {
                throw new Exception(`Property "${path}" does not meet properties count rule.`);
            } else {
                // tslint:disable-next-line:forin
                for (const property in properties) {
                    const sc = "$ref" === property ?
                        // tslint:disable-next-line:no-string-literal
                        definitions[schema.properties["$ref"]] : schema.properties[property];
                    if (!sc) {
                        throw new Exception(`Schema does not exists.`);
                    }
                    this.traverseProperties(sc,
                        target, path === "" ? property : `${path}.${property}`);
                }
            }

        }
    }

    // tslint:disable-next-line:member-ordering
    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }
        try {
            this.traverseProperties(this.schema, context.Value, "");
            return Promise.resolve(true);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error.message);
            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                error.message )); // ? this.formatErrorMessage(context)
        }
        // if (!this.isMatch(context.Value)) {

        // }
        // return Promise.resolve(true);
    }
}
