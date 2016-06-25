/*
 *
 *  *  Copyright 2016 Now Can DO LTD (info(at)nowcando.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.nowcando.com
 *
 */

/**
 * This File Created by Saeed on 25/06/2016.
 */
import * as core from "../core"


export class ValidationContext {
    private values:any[] = [];
    constructor(private key:string,private refto:any,...values:any[]){
        this.values = values;
    }
    get Key():string{return this.key;}
    get RefTo():any{return this.refto;}
    get Values():any[]{return this.values;}
}

export class ValidationResult {
    constructor(private validator:Validator, private key:string, private refto:any, private messages:string[]) {
    }

    get Validator():Validator {
        return this.validator;
    };

    get Key():string {
        return this.key;
    };

    get RefTo():any {
        return this.refto;
    };

    get IsValid():boolean {
        return this.messages.length === 0;
    }

    get Messages():core.collections.IEnumerable<string> {
        return new core.collections.Enumerable(this.messages);
    };
}

export abstract class Validator {
    constructor(private message:string | (()=>string),options?:any) {
    }

    get Message():string {
        if (typeof this.message === "string") {
            return <string>this.message;
        }
        else {
            return (<()=>string>this.message)();
        }

    }

    isValid(context:ValidationContext):Promise<boolean> {
        return this.validate(context)
            .then((result:ValidationResult)=> {
                if (result && !result.IsValid) {
                    return false;
                }
                else {
                    return true;
                }
            });
    }

    validate(context:ValidationContext):Promise<ValidationResult> {
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export class RequiredValidator extends Validator {
    constructor(message:string |(()=>string)){
        super(message);
    }
    validate(context:ValidationContext):Promise<ValidationResult> {
        if (context) {
            let value = context.Values[0];
            if (!value || value.toString() === "") {
                let result = new ValidationResult(this, context.Key, context.RefTo, [this.Message]);
                return Promise.resolve(result)
            }
        }
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export class RegexValidator extends Validator {
    constructor(message:string |(()=>string),private regex:RegExp){
        super(message);
    }
    validate(context:ValidationContext):Promise<ValidationResult> {
        if (context) {
            let value = context.Values[0];
            if (this.regex.test(value)===false) {
                let result = new ValidationResult(this, context.Key, context.RefTo, [this.Message]);
                return Promise.resolve(result)
            }
        }
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export class StringLengthValidator extends Validator {
    constructor(message:string |(()=>string),
                private maxLength:number,
                private minLength:number=0){
        super(message);
    }
    validate(context:ValidationContext):Promise<ValidationResult> {
        if (context ) {
            let value = context.Values[0];
            if (!(value && value.toString().length <= this.maxLength &&
                value.toString().length >= this.minLength)) {
                let result = new ValidationResult(this, context.Key, context.RefTo, [this.Message]);
                return Promise.resolve(result);
            }
        }
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export class RangeValidator extends Validator {
    constructor(message:string |(()=>string),
                private maxValue:number,
                private minValue:number){
        super(message);
    }
    validate(context:ValidationContext):Promise<ValidationResult> {
        if (context ) {
            let value = context.Values[0];
            if (value && value <= this.maxValue &&
                this.minValue && ( value >= this.minValue) ) {
                let result = new ValidationResult(this, context.Key, context.RefTo, [this.Message]);
                return Promise.resolve(result)
            }
        }
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export class RemoteValidator extends Validator {
    constructor(message:string |(()=>string),
                options:{url:string,method?:string}) {
        super(message,options);
    }

    validate(context:ValidationContext):Promise<ValidationResult> {
        if (context ) {
            let value = context.Values[0];
            if (!value || value.toString() === "") {
                let result = new ValidationResult(this, context.Key, context.RefTo, [this.Message]);
                return Promise.resolve(result) ;
            }
        }
        let result = new ValidationResult(this, context.Key, context.RefTo, []);
        return Promise.resolve(result);
    }
}

export interface IValidable {
    addValidator(validator:Validator):void;
    Validators:core.collections.IEnumerable<Validator>;
    validate():Promise<core.collections.IEnumerable<ValidationResult>>;
    onValidationChange:(validationResults:core.collections.IEnumerable<ValidationResult>)=>void;
}

