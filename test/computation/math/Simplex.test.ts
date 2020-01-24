import 'jest';
import { Simplex } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('Simplex', () => {
            it('checks simplex should return z = 13', async () => {
                expect.assertions(4);
                const sdef = {
                    Type: 'maximize',
                    // tslint:disable-next-line:object-literal-sort-keys
                    Objective: 'x1 + 2x2 - x3',
                    Constraints: ['2x1 + x2 + x3 <= 14', '4x1 + 2x2 + 3x3 <= 28', '2x1 + 5x2 + 5x3 <= 30'],
                };
                const response = Simplex.solve(sdef).Result;
                expect(response.z).toEqual(13);
                expect(response.x1).toEqual(5);
                expect(response.x2).toEqual(4);
                expect(response.x3).toEqual(0);
            });
            it('checks simplex should return z = 1360', async () => {
                expect.assertions(3);
                const sdef = {
                    Type: 'maximize',
                    // tslint:disable-next-line:object-literal-sort-keys
                    Objective: '40x1 + 50x2',
                    Constraints: ['x1 + 2x2 <= 40', '4x1 + 3x2 <= 120'],
                };
                const response = Simplex.solve(sdef).Result;
                expect(response.z).toEqual(1360);
                expect(response.x1).toEqual(24);
                expect(response.x2).toEqual(8);
            });
            it('checks simplex should return z = 1360', async () => {
                expect.assertions(3);
                const sdef = {
                    Type: 'maximize',
                    // tslint:disable:object-literal-sort-keys
                    Objective: '40Fe + 50Cu',
                    Constraints: ['Fe + 2Cu <= 40', '4Fe + 3Cu <= 120'],
                };
                const response = Simplex.solve(sdef).Result;
                expect(response.z).toEqual(1360);
                expect(response.Fe).toEqual(24);
                expect(response.Cu).toEqual(8);
            });
            it('checks simplex should return z = 17.142857142857146', async () => {
                expect.assertions(6);
                const sdef = {
                    Type: 'maximize',
                    Objective: '5x1 + 4x2',
                    Constraints: ['x1 + 2x2 <= 6', '2x1 - x2 <= 4', '5x1 + 3x2 <= 15'],
                };
                const response = Simplex.solve(sdef).Result;
                expect(response.z).toEqual(17.142857142857146);
                expect(response.x1).toEqual(1.7142857142857146);
                expect(response.x2).toEqual(2.142857142857143);
                expect(response.slack1).toEqual(0);
                expect(response.slack2).toEqual(2.7142857142857135);
                expect(response.slack3).toEqual(0);
            });
        });
    });
});
