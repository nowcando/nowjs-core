
import { Exception } from "../exceptions";

export class ValidatorException extends Exception {
    constructor(
        private validatorName: string,
        // tslint:disable-next-line:ban-types
        private target: Object,
        private property: string,
        message: string,
        private children?: ValidatorException[],
    ) {
        super(message);
     }
    public get ValidatorName(): string { return this.validatorName; }
    // tslint:disable-next-line:ban-types
    public get Target(): Object { return this.target; }
    public get Property(): string { return this.property; }
    public get Message(): string { return this.message; }
    public get Children(): ValidatorException[] { return this.children || []; }

}
