
import { Exception } from "../../exceptions/index";
import { NumericMatrix } from "./index";

export class NumericIdentityMatrix extends NumericMatrix {
    constructor(size: number = 2) {
        super(size, size);
        this.arr = [];
        for (let i = 0; i < size; i++) {
            this.arr.push([]);
            for (let j = 0; j < size; j++) {
                this.arr[i].push(i === j ? 1 : 0);
            }
        }
    }
    public add(other: NumericMatrix | number): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public subtract(other: NumericMatrix | number): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public multiply(other: NumericMatrix | number): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public divide(other: NumericMatrix | number): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public power(other: NumericMatrix | number): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public dotProduct(other: NumericMatrix): NumericMatrix {
        throw new Exception("Operation is not permitted.");
    }
    public set(value: number, row: number, col: number) {
        throw new Exception("Operation is not permitted.");
    }

}
