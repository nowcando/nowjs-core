import 'jest';
import { Matrix4x4 } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('Matrix4x4', () => {
            it('checks transpose matrix', () => {
                expect.assertions(16);
                const matrix1 = new Matrix4x4([1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]);
                const matrix3 = matrix1.transpose();
                expect(matrix3.get(0, 0)).toEqual(1);
                expect(matrix3.get(0, 1)).toEqual(5);
                expect(matrix3.get(0, 2)).toEqual(9);
                expect(matrix3.get(0, 3)).toEqual(13);
                expect(matrix3.get(1, 0)).toEqual(2);
                expect(matrix3.get(1, 1)).toEqual(6);
                expect(matrix3.get(1, 2)).toEqual(10);
                expect(matrix3.get(1, 3)).toEqual(14);
                expect(matrix3.get(2, 0)).toEqual(3);
                expect(matrix3.get(2, 1)).toEqual(7);
                expect(matrix3.get(2, 2)).toEqual(11);
                expect(matrix3.get(2, 3)).toEqual(15);
                expect(matrix3.get(3, 0)).toEqual(4);
                expect(matrix3.get(3, 1)).toEqual(8);
                expect(matrix3.get(3, 2)).toEqual(12);
                expect(matrix3.get(3, 3)).toEqual(16);
            });
        });
    });
});
