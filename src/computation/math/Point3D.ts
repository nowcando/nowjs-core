
import { Point2D } from "./Point2D";

export class Point3D extends Point2D {
    constructor(x?: number, y?: number, private z?: number) {
        super(x, y);
        // tslint:disable:curly
        if (!z) this.z = 0;
    }
    public get Z(): number { return this.z; }
    public set Z(value: number) { this.z = value; }
}
