import 'jest';
import '../../src/linq';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Array', () => {
    it('contains', () => {
        expect.assertions(2);
        const arr = [1, 2, 3, 4, 2, 5];
        expect(arr.contains(2)).toEqual(true);
        expect(arr.contains(8)).toEqual(false);
    });

    it('hasDuplicate', () => {
        expect.assertions(3);
        const arr1 = [1, 2, 3, 4, 2, 5];
        const arr2 = [1, 2, 3, 4, 5, 6];
        const arr3 = [2, 2, 2];
        expect(arr1.hasDuplicate()).toEqual(true);
        expect(arr2.hasDuplicate()).toEqual(false);
        expect(arr3.hasDuplicate()).toEqual(true);
    });

    it('clear', () => {
        expect.assertions(2);
        const arr1 = [1, 2, 3, 4, 2, 5];
        const c = arr1.length;
        arr1.clear();
        expect(c).toEqual(6);
        expect(arr1.length).toEqual(0);
    });

    it('groupBy', () => {
        expect.assertions(1);
        const arr1 = [
            { name: 'A', age: 15 },
            { name: 'B', age: 10 },
            { name: 'D', age: 30 },
            { name: 'A', age: 15 },
            { name: 'D', age: 10 },
            { name: 'D', age: 20 },
        ];
        const g = arr1.groupBy('name');
        expect(g.length).toEqual(3);
    });

    it('itemCount', () => {
        expect.assertions(1);
        const arr3 = [2, 2, 5, 2, 5];
        expect(arr3.itemCount()).toEqual([
            { item: 2, count: 3 },
            { item: 5, count: 2 },
        ]);
    });

    it('toUnique', () => {
        expect.assertions(1);
        const arr3 = [1, 2, 3, 4, 2, 5];
        expect(arr3.toUnique()).toEqual([1, 2, 3, 4, 5]);
    });
});
