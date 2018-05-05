
// tslint:disable:object-literal-sort-keys
// tslint:disable:no-console

import "reflect-metadata";

const formatMetadataKey = Symbol("format");
export function deprecated(message: string = "Function {name} is deprecated.") {
    return (instance: any, name: string, descriptor: any) => {
        const original = descriptor.value;
        const localMessage = message.replace("{name}", name);

        descriptor.value = () => {

            console.warn(localMessage);

            return original.apply(instance, arguments);
        };

        return descriptor;
    };
}

export function deprecateInNextVersion(message: string = "Function {name} is deprecate in next version.") {
    return (instance: any, name: string, descriptor: any) => {
        const original = descriptor.value;
        const localMessage = message.replace("{name}", name);

        descriptor.value = () => {
            // tslint:disable-next-line:no-console
            console.warn(localMessage);

            return original.apply(instance, arguments);
        };

        return descriptor;
    };
}

// tslint:disable:ban-types
export function readonly<TFunction extends Function>(Target: TFunction): TFunction {
    const newConstructor =  () => {
        Target.apply(this);
        Object.freeze(this);
    };

    newConstructor.prototype = Object.create(Target.prototype);
    newConstructor.prototype.constructor = Target;
    return newConstructor as any;
}

export function timeout( milliseconds: number = 0 ) {
    return ( target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;

      descriptor.value =  () => {
        setTimeout(() => {
          originalMethod.apply(this, arguments);
         }, milliseconds);
      };
      return descriptor;
    };

  }

export function logProperty(target: any, key: string) {

    let value = target[key];

    const getter = () => {
      // tslint:disable:no-console
      console.log(`Get => ${key}`);
      return value;
    };

    const setter = (newVal: any) => {
      console.log(`Set: ${key} => ${newVal}`);
      value = newVal;
    };

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }
  }

export  function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function enumerable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.enumerable = value;
    };
}

export function configurable(value: boolean) {
    return  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.configurable = value;
    };
}

export function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export function override(instance: any, name: string, descriptor: any) {
    const baseType = Object.getPrototypeOf(instance);
    if (typeof baseType[name] !== "function") {
        // tslint:disable-next-line:max-line-length
        throw new Error("Method " + name + " of " + instance.constructor.name + " does not override any base class method.");
    }
}
