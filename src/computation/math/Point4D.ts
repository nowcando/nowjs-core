
import { Point3D } from "./Point3D";

export class Point4D extends Point3D {
    constructor(x?: number, y?: number, z?: number, private w?: number) {
        super(x, y);
        // tslint:disable:curly
        if (!w) this.w = 0;
    }
    public get W(): number { return this.w; }
    public set W(value: number) { this.w = value; }
}
