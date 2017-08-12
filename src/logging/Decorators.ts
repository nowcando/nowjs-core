
import { PerformanceCounter } from "../diagnostics/index";
import { ILoggingProvider, LoggingProvider } from "./index";

export function log(message?: string, level?: string , ...args: any[]) {

    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const logger = LoggingProvider.get();
            const traceName = target.constructor.name + "." + name;
            logger.info(message);
            let pcounter = PerformanceCounter.start(traceName);
            try {
                const result = original.apply(target, arguments);
                pcounter = PerformanceCounter.finish(traceName);
                return result;
            } catch (error) {
                pcounter = PerformanceCounter.finish(traceName);
                logger.error(message, pcounter);
                throw error;
            } finally {
                logger.info(message, pcounter);
            }
        };
        return descriptor;
    };
}

export function error(store?: string, level?: string) {

    // tslint:disable-next-line:ban-types
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const traceName = target.constructor.name + "." + name;

            const result = original.apply(target, arguments);

            return result;
        };

        return descriptor;

    };

}

export function warn(store?: string, level?: string) {

    // tslint:disable-next-line:ban-types
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const traceName = target.constructor.name + "." + name;

            const result = original.apply(target, arguments);

            return result;
        };

        return descriptor;

    };

}

export function debug(store?: string, level?: string) {

    // tslint:disable-next-line:ban-types
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const traceName = target.constructor.name + "." + name;

            const result = original.apply(target, arguments);

            return result;
        };

        return descriptor;

    };

}

export function info(store?: string, level?: string) {

    // tslint:disable-next-line:ban-types
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const traceName = target.constructor.name + "." + name;

            const result = original.apply(target, arguments);

            return result;
        };

        return descriptor;

    };
}

export  function trace(store: string, level?: string) {

  return  (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {

        const original = descriptor.value;
        descriptor.value = function() {
            const logger = LoggingProvider.get();
            const traceName = target.constructor.name + "." + propertyName;
            let pcounter = PerformanceCounter.start(traceName);
            logger.info(`The ${traceName} method has been started.`, pcounter);
            try {
                // tslint:disable-next-line:ban-types
                const result =  (original as Function).apply(this, arguments);
                if (result.constructor.name === "Promise") {
                    return (result as Promise<any>)
                    .then((res) => {
                         pcounter = PerformanceCounter.finish(traceName);
                         logger.info(`The ${traceName} async method has been finished.`, pcounter);
                         return this;
                    })
                    .catch((errorc) => {
                         pcounter = PerformanceCounter.finish(traceName);
                         logger.error(`The ${traceName} async method has an error .` , pcounter, errorc);
                         return Promise.reject(errorc);
                    });
                } else {
                      pcounter = PerformanceCounter.finish(traceName);
                      logger.info(`The ${traceName} method has been finished.`, pcounter);
                }

                return result;
            } catch (error) {
                pcounter = PerformanceCounter.finish(traceName);
                logger.error(`The ${traceName} method has an error .` , pcounter, error);
                throw error;
            // tslint:disable-next-line:no-empty
            } finally {

            }

        };

        return descriptor;

    };

}
