import "reflect-metadata";

import { JsonSchemaDefinition } from "../utils/index";
import { ValidateIfFunc, VALIDATION_DEFINIIONITEM_KEY,
     VALIDATION_PROPERTYPATH_SEPRATOR,
      VALIDATION_VALIDATEIF_METADATA_KEY, ValidationContext,
       VALIDATOR_METADATA_KEY } from "./index";
import { ValidationDefinition } from "./ValidationDefinition";
import { ValidatorBase } from "./ValidatorBase";

/*
export interface ASyncValidatorFunction {
    (...args: any[]): Promise<boolean>;
}
export interface SyncValidationFunction {
    (...args: any[]): boolean;
}
export interface  ValidatorFunction extends ASyncValidatorFunction,SyncValidationFunction{

}*/
export class Validation {
    private static definitions = new Map<string, ValidationDefinition>();
    private static validators = new Map<string, ValidatorBase>();

    // tslint:disable:member-ordering
    public static registerValidator(validator: ValidatorBase): Validation;
    public static registerValidator(name: string, validator: ValidatorBase): Validation;
    public static registerValidator(data: any, validator?: any): Validation {
        let name = "";
        if (typeof data === "string" && !validator) {
            name = data;
        }        else if (data instanceof ValidatorBase) {
            name = data.Name;
        }        else {
            name = data.constructor.name;
        }
        Validation.validators.set(name, validator);
        return this;
    }
    public static registerDefinition(name: string, definition: ValidationDefinition): Validation {
        if (!name) {
            return this;
        }
        Validation.definitions.set(name, definition);
        return this;
    }

    private static jsonDefine(definition: ValidationDefinition, json: JsonSchemaDefinition) {
        if (definition && json) {
            // tslint:disable:forin
            for (const itemName in json) {
                const item  = json[itemName];
                if (item && item.Validators) {
                    for (const validatorName in item.Validators) {
                        const validatorItem = item.Validators[validatorName];
                        if (validatorItem) {
                          // tslint:disable-next-line:ban-types
                          const validatorFn: Function =  (definition.on(itemName)as any)[`${validatorName}`];
                          if (validatorFn) {
                            validatorItem[VALIDATION_DEFINIIONITEM_KEY] = VALIDATION_DEFINIIONITEM_KEY;
                            validatorFn.apply(definition, [validatorItem]);
                          }
                        }
                    }
                }
            }
        }
    }

    public static define(name?: string, json?: JsonSchemaDefinition): ValidationDefinition {
        if (!name) {
            return new ValidationDefinition();
        }

        const definition = new ValidationDefinition();
        if (json) {
            Validation.jsonDefine(definition, json);
        }
        Validation.definitions.set(name, definition);
        return definition;
    }

    private static nestedValidatorDefine(definition: ValidationDefinition, target: any, parentPropertyName?: string) {
        if (target && typeof target !== "object") {
            return;
        }
        for (const propertyKey of Reflect.ownKeys(Object.getPrototypeOf(target))) {
            let propertyName = propertyKey.toString();
            if (propertyName === "constructor") {
                continue;
            }
            if (typeof target[propertyKey] === "function") {
                continue;
            } else if (typeof target[propertyKey] === "object") {
                // recursive find validator decorators and add to definition
                propertyName = parentPropertyName ? parentPropertyName +
                VALIDATION_PROPERTYPATH_SEPRATOR + propertyName : propertyName;
                Validation.nestedValidatorDefine(definition, target[propertyKey], propertyName);
            }  else {
                const validatorIf: ValidateIfFunc = Reflect.getMetadata(VALIDATION_VALIDATEIF_METADATA_KEY,
                     target, propertyName);
                if (validatorIf) {
                    const result = validatorIf.apply(target);
                    if (!result) {
                        continue;
                    }
                }
                const validator = Reflect.getMetadata(VALIDATOR_METADATA_KEY, target, propertyName);
                if (validator) {
                    propertyName = parentPropertyName ? parentPropertyName +
                    VALIDATION_PROPERTYPATH_SEPRATOR + propertyName : propertyName;
                    definition.on(propertyName).add(validator);
                }
            }

        }

    }

    public static async validate(target: any): Promise<boolean>;
    // tslint:disable:unified-signatures
    public static async validate(target: any, ...validators: ValidatorBase[]): Promise<boolean>;
    public static async validate(target: any, definitionName: string): Promise<boolean>;
    public static async validate(target: any, definition: ValidationDefinition): Promise<boolean>;
    public static async validate(target: any, arg1?: any): Promise<boolean> {

        let definitionName = "";
        const validatorPromises: Array<Promise<boolean>> = [];
        if (!arg1) {

            if (Validation.definitions.has(target.constructor.name)) {
                definitionName = target.constructor.name;
            } else {
                const definition = Validation.define();
                arg1 = definition;

                // recursive find validator decorators and add to definition
                Validation.nestedValidatorDefine(definition, target);

            }
        }     else if (typeof arg1 === "string") {
            definitionName = arg1;
            arg1 = Validation.definitions.get(definitionName);
            if (!arg1) {
                throw new Error(`There is no registered definition by name : "${definitionName}"`);
            }
        }
        if (arg1 && (arg1 instanceof ValidationDefinition)) {
            for (const item of arg1.Definitions) {
                const validators = item[1];
                const context = new ValidationContext(target, item[0]);
                for (const validator of validators) {
                    validatorPromises.push(validator.validate(context));
                }
            }
        }  else if (arg1 instanceof Array || typeof arg1 === "object") {
            const context = new ValidationContext(target, "");
            const validators = new Map<string, ValidatorBase>();
            if (typeof arg1 === "object") {
                validators.set(arg1.Name, arg1);
            }   else {
                for (const member of (arg1 as ValidatorBase[])) {
                    validators.set(member.Name, member);
                }
            }
            for (const item of validators) {
                validatorPromises.push(item[1].validate(context));
            }

        }

        return Promise.all(validatorPromises)
            .then((results) => {
                return results.every((item) => item === true);
            });
    }
}
