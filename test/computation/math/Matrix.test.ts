import "jest";
import { Matrix } from "../../../src/computation/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Computation",  () => {
    describe("Math",  () => {
        describe("Matrix",  () => {
            it("checks transpose matrix",  () => {
                expect.assertions(6);
                const matrix1 = new Matrix<number>(2, 3, [1, 2, 3], [4, 5, 6]);
                const matrix3 = matrix1.transpose();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(4);
                expect(matrix3.get(1, 0)).toEqual(2);
                expect(matrix3.get(1, 1)).toEqual(5);
                expect(matrix3.get(2, 0)).toEqual(3);
                expect(matrix3.get(2, 1)).toEqual(6);
            });
        });
    });
});
