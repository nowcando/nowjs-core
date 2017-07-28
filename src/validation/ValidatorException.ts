
import { Exception } from "../exceptions";

export class ValidatorException extends Exception {
    constructor(
        private validatorName: string,
        private target: object,
        private property: string,
        message: string,
        private children?: ValidatorException[],
    ) {
        super(message);
     }
    public get ValidatorName(): string { return this.validatorName; }
    public get Target(): object { return this.target; }
    public get Property(): string { return this.property; }
    public get Message(): string { return this.message; }
    public get Children(): ValidatorException[] { return this.children || []; }

}
