
export const PROPERTY_METADATA_KEY = Symbol("object.property.metadata.key");
export const PROPERTY_PRESENTATION_KEY = Symbol("object.property.presentation.key");
export const OBJECT_DISPLAYNAME_METADATA_KEY = Symbol("object.displayName.key");
export const OBJECT_DISPLAYSHORTNAME_METADATA_KEY = Symbol("object.displayShortName.key");
export const OBJECT_DISPLAYHINT_METADATA_KEY = Symbol("object.displayHint.key");
export const OBJECT_DISPLAYORDER_METADATA_KEY = Symbol("object.displayOrder.key");
export type StringFormatType = ((name: string, ...args: any[]) => string) | string;

export interface IJsonSchemaDefinitionValidator {
    [key: string]: any;
}

// tslint:disable:interface-name
export interface JsonSchemaDefinitionDisplay {
    DisplayName?: StringFormatType;
    DisplayShortName?: StringFormatType;
    DisplayHintName?: StringFormatType;
    DisplayOrder?: number;
}

export interface JsonSchemaDefinitionItem {
    Display?: JsonSchemaDefinitionDisplay;
    Validators?: IJsonSchemaDefinitionValidator;
}

export interface JsonSchemaDefinition {
    [key: string]: JsonSchemaDefinitionItem;
}

// decorators

function deprecated(message: StringFormatType = 'The {type} "{name}" is deprecated.') {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        let localMessage = "";
        if (typeof message === "string") {
            localMessage = message.replace("{type}", (typeof target).toUpperCase());
            localMessage = message.replace("{name}", propertyName);
        } else if (typeof message === "function") {
            localMessage = message("DeprecatedMessage", target, propertyName, original);
        }

        descriptor.value = () => {
            // tslint:disable-next-line:no-console
            console.warn(localMessage);

            return original.apply(target, arguments);
        };

        return descriptor;
    };
}

export function getReflectdDisplayName(target: any, propertyName: string, defaultName: string): string {
    const name = Reflect.getMetadata(OBJECT_DISPLAYNAME_METADATA_KEY, target, propertyName);
    return name ? name : defaultName;
}

export function displayName(name: StringFormatType) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        let localName = ""; // message.replace('{type}', (typeof target).toUpperCase());
        if (typeof name === "string") {
            localName = name;
        } else if (typeof name === "function") {
            localName = name(propertyName, target, propertyName, original);
        } else {
            localName = "";
        }

        Reflect.defineMetadata(OBJECT_DISPLAYNAME_METADATA_KEY, localName, target, propertyName);
    };
}

export function displayShortName(name: StringFormatType) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        let localName = ""; // message.replace('{type}', (typeof target).toUpperCase());
        if (typeof name === "string") {
            localName = name;
        } else if (typeof name === "function") {
            localName = name(propertyName, target, propertyName, original);
        } else {
            localName = "";
        }

        Reflect.defineMetadata(OBJECT_DISPLAYSHORTNAME_METADATA_KEY, localName, target, propertyName);
    };
}

export function displayHint(hint: StringFormatType) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        let localName = ""; // message.replace('{type}', (typeof target).toUpperCase());
        if (typeof hint === "string") {
            localName = hint;
        } else if (typeof name === "function") {
            localName = hint(propertyName, target, propertyName, original);
        } else {
            localName = "";
        }

        Reflect.defineMetadata(OBJECT_DISPLAYHINT_METADATA_KEY, localName, target, propertyName);
    };
}

export function displayOrder(num: number) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(OBJECT_DISPLAYHINT_METADATA_KEY, num, target, propertyName);
    };
}

/* export function definePresentation<T>(mclass: new (...args: any[]) => T, props: PropertyPresentationMap<T>): void {
    for (const propertyName in props) {
        if (props.hasOwnProperty(propertyName)) {
            // presentableProperties.push(propertyName);
            Reflect.defineMetadata(PROPERTY_PRESENTATION_KEY, props[propertyName], mclass.prototype, propertyName);
        }
    }
} */

// tslint:disable-next-line:ban-types
export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        // tslint:disable-next-line:member-access
        newProperty = "new property";
        // tslint:disable-next-line:member-access
        hello = "override";
    };
}

export function enumerable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.enumerable = value;
    };
}

export function configurable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.configurable = value;
    };
}

export function propertySet<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    const set = descriptor.set;
    descriptor.set = (value: T) => {
        const type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
        set(value);
    };
}

// tslint:disable-next-line:ban-types
export function readonlyObject<TFunction extends Function>(Target: TFunction): TFunction {
    const newConstructor = () => {
        Target.apply(this);
        Object.freeze(this);
    };

    newConstructor.prototype = Object.create(Target.prototype);
    newConstructor.prototype.constructor = Target;

    return newConstructor as any;
}

export function defineProperty(target: object, propertyKey: string) {
    const columns: string[] = Reflect.getMetadata(PROPERTY_METADATA_KEY, target.constructor) || [];
    columns.push(propertyKey);
    Reflect.defineMetadata(PROPERTY_METADATA_KEY, columns, target.constructor);
}

interface IPresentationOptions<PropertyType> {
    required?: boolean;
    searchable?: boolean;
    sortable?: boolean;
    displayName?: string;
    tableDisplay?: boolean;
    columnWidth?: number;
    defaultValue?: PropertyType;
}

type PropertyPresentationMap<T> = {
    [P in keyof T]?: IPresentationOptions<T[P]>;
};

export function extend<T, U>(first: T, second: U): T & U {
    const result = {} as T & U;
    // tslint:disable-next-line:forin
    for (const id in first) {
        (result as any)[id] = (first as any)[id];
    }
    for (const id in second) {
        if (!result.hasOwnProperty(id)) {
            (result as any)[id] = (second as any)[id];
        }
    }
    return result;
}

export function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}

export function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

export function getObjetctNestedPath(theObject: any, path: string, separator: string= "."): any {
    try {
        separator = separator || ".";

        return path.
            replace("[", separator).replace("]", "").
            split(separator).
            reduce((obj, mproperty) => {
                return obj[mproperty];
            }, theObject,
        );

    } catch (err) {
        return undefined;
    }
}

export function getObjectLastParentOfPath(theObject: any, path: string, separator: string): any {
    try {
        separator = separator || ".";

        const objPath = path.
            replace("[", separator).replace("]", "")
            .split(separator);
        const lastPath = objPath.splice(objPath.length - 1, 1);
        return objPath.reduce((obj, mproperty) => {
            return obj[mproperty];
        }, theObject,
        );

    } catch (err) {
        return undefined;
    }
}

export function getObjectLastKeyOfPath(theObject: any, path: string, separator: string): string {
    try {
        separator = separator || ".";

        const objPath = path.
            replace("[", separator).replace("]", "")
            .split(separator);
        return objPath[objPath.length - 1];
    } catch (err) {
        return undefined;
    }
}

/**
 * Check is object any value
 *
 * @export
 * @param {*} item value to check
 * @returns {boolean}
 */
export function isObjectType(item: any): boolean {
    return (item && typeof item === "object" && !Array.isArray(item));
}

/**
 * Deep shallow object merging properties .
 *
 * @export
 * @template T
 * @template U
 * @param {T} target
 * @param {U} source1
 * @returns {(T & U)}
 */
export function deepAssign<T, U>(target: T, source1: U): T & U;
/**
 * Deep shallow object merging properties .
 *
 * @export
 * @template T
 * @template U
 * @template V
 * @param {T} target
 * @param {U} source1
 * @param {V} source2
 * @returns {(T & U & V)}
 */
export function deepAssign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
export function deepAssign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
export function deepAssign<T, U, V, W, X>(target: T, source1: U,
                                          source2: V, source3: W, source4: X): T & U & V & W & X;
export function deepAssign<T, U, V, W, X, Y>(target: T, source1: U,
                                             source2: V, source3: W,
                                             source4: X, source5: Y):
                                             T & U & V & W & X & Y;
export function deepAssign<T, U, V, W, X, Y , Z>(target: T, source1: U,
                                                 source2: V, source3: W,
                                                 source4: X, source5: Y, source6: Z):
                                             T & U & V & W & X & Y & Z;
export function deepAssign<T>(target: T, ...sources: any[]): T & any;
/**
 * Deep shallow object merging properties .
 *
 * @export
 * @template T
 * @param {T} target
 * @param {...any[]} sources
 * @returns {T}
 */
export function deepAssign<T>(target: T, ...sources: any[]): T & any {
    // tslint:disable-next-line:curly
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObjectType(target) && isObjectType(source)) {
        for (const key in source) {
            // tslint:disable-next-line:curly
            if (!source.hasOwnProperty(key)) continue;
            if (isObjectType(source[key]) && Object.keys(source[key]).length > 0) {
                // tslint:disable-next-line:curly
                if (!(target as any)[key]) {
                    Object.assign(target, { [key]: {} }) ;
                }
                deepAssign((target as any)[key], (source as any)[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepAssign(target, ...sources);
    /* sources.forEach((source) => {
        // tslint:disable-next-line:no-shadowed-variable
        const descriptors = Object.keys(source).reduce((descriptors: any, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
          return descriptors;
        }, {});
        // by default, Object.assign copies enumerable Symbols too
        Object.getOwnPropertySymbols(source).forEach((sym) => {
          const descriptor = Object.getOwnPropertyDescriptor(source, sym);
          if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
          }
        });
        Object.defineProperties(target, descriptors);
      });
    return target; */
}

/**
 * Shallow copy or clone an object
 *
 * @export
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function cloneObject<T>(obj: T): T {
    return deepAssign({}, obj);
}

function toCloneObject<T>(target: T): T {
    return cloneObject(target);
}

function toDeepAssign<T>(target: T, ...sources: any[]): T {
    return deepAssign(target, ...sources);
}

Object.deepAssign = toDeepAssign;
Object.isObjectType = isObjectType;
Object.cloneObject = toCloneObject;
