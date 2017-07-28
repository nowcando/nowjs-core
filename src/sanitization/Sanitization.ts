
import { SanitizerBase } from "./index";

export class Sanitization {
    private static sanitizers = new Map<string, SanitizerBase<any>>();

    // tslint:disable-next-line:member-ordering
    public static define(sanitizerName: string, sanitizer: SanitizerBase<any>) {

        Sanitization.sanitizers.set(sanitizerName, sanitizer);
    }

    // tslint:disable-next-line:member-ordering
    public static remove(sanitizerName: string) {
        if (Sanitization.sanitizers.has(sanitizerName)) {
            Sanitization.sanitizers.delete(sanitizerName);
        }

    }

    // tslint:disable-next-line:member-ordering
    public static async Sanitize(value: string, sanitizerName: string): Promise<string> {
        const sanitizer = Sanitization.sanitizers.get(sanitizerName);
        if (sanitizer) {
            return sanitizer.sanitize(value);
        } else {
            return Promise.resolve(value);
        }
    }

}
