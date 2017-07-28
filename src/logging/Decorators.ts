
import { PerformanceCounter } from "../diagnostics/index";
import { ILoggingProvider } from "./index";

export function log(message?: string, level?: string , store?: string, logger?: ILoggingProvider) {

    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {

        const original = descriptor.value;

        descriptor.value = () => {
            const traceName = target.constructor.name + "." + name;
            logger.Default.info(store, message);
            let pcounter = PerformanceCounter.start(traceName);
            try {
                const result = original.apply(target, arguments);
                pcounter = PerformanceCounter.finish(traceName);
                return result;
            } catch (error) {
                pcounter = PerformanceCounter.finish(traceName);
                logger.Default.error(store, message, pcounter);
                throw error;
            } finally {
                logger.Default.info(store, message, pcounter);
            }
        };
        return descriptor;
    };
}

export function error(store?: string, logger?: ILoggingProvider) {

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

export function warn(store?: string, logger?: ILoggingProvider) {

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

export function debug(store?: string, logger?: ILoggingProvider) {

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

export function info(store?: string, logger?: ILoggingProvider) {

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

export  function trace(store: string, mlogger: () => ILoggingProvider) {

return  (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {

        const original = descriptor.value;
        descriptor.value = function() {
            const logger = mlogger();
            const traceName = target.constructor.name + "." + propertyName;
            let pcounter = PerformanceCounter.start(traceName);
            logger.Default.info(store, `The ${traceName} method has been started.`, pcounter);
            try {
                // tslint:disable-next-line:ban-types
                const result =  (original as Function).apply(this, arguments);
                if (result.constructor.name === "Promise") {
                    return (result as Promise<any>)
                    .then((res) => {
                         pcounter = PerformanceCounter.finish(traceName);
                         logger.Default.info(store, `The ${traceName} async method has been finished.`, pcounter);
                         return this;
                    })
                    .catch((errorc) => {
                         pcounter = PerformanceCounter.finish(traceName);
                         logger.Default.error(store, `The ${traceName} async method has an error .` , pcounter, errorc);
                         return Promise.reject(errorc);
                    });
                } else {
                      pcounter = PerformanceCounter.finish(traceName);
                      logger.Default.info(store, `The ${traceName} method has been finished.`, pcounter);
                }

                return result;
            } catch (error) {
                pcounter = PerformanceCounter.finish(traceName);
                logger.Default.error(store, `The ${traceName} method has an error .` , pcounter, error);
                throw error;
            // tslint:disable-next-line:no-empty
            } finally {

            }

        };

        return descriptor;

    };

}
