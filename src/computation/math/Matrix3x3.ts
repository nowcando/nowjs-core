import { NumericSquareMatrix } from './NumericSquareMatrix';

export class Matrix3x3 extends NumericSquareMatrix {
    constructor(...rows: number[][]) {
        super(3, ...rows);
    }
}
