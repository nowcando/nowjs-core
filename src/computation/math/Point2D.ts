
export class Point2D {
    constructor(private x?: number, private y?: number) {
        // tslint:disable:curly
        if (!x) this.x = 0;
        if (!y) this.y = 0;
    }
    public get X(): number { return this.x; }
    public set X(value: number) { this.x = value; }
    public get Y(): number { return this.y; }
    public set Y(value: number) { this.y = value; }
}
