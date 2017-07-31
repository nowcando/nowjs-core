
import { SanitizerBase } from "./index";

export class Sanitization {
    private static sanitizers = new Map<string, SanitizerBase<any>>();

    // tslint:disable-next-line:member-ordering
    public static define(sanitizerName: string, sanitizer: SanitizerBase<any>) {

        Sanitization.sanitizers.set(sanitizerName, sanitizer);
    }

    // tslint:disable-next-line:member-ordering
    public static contains(sanitizerName: string): boolean {
        return Sanitization.sanitizers.has(sanitizerName);
    }

    // tslint:disable-next-line:member-ordering
    public static remove(sanitizerName: string): boolean {
        if (Sanitization.sanitizers.has(sanitizerName)) {
            Sanitization.sanitizers.delete(sanitizerName);
            return true;
        }
        return false;
    }

    // tslint:disable-next-line:member-ordering
    public static async sanitize(value: string, sanitizerName: string): Promise<string> {
        const sanitizer = Sanitization.sanitizers.get(sanitizerName);
        if (sanitizer) {
            return sanitizer.sanitize(value);
        } else {
            return Promise.resolve(value);
        }
    }

}
