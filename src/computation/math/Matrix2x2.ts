
import { NumericSquareMatrix } from "./NumericSquareMatrix";

export class Matrix2x2 extends NumericSquareMatrix {
    constructor(...rows: number[][]) {
        super(2, ...rows);
    }
}
