import "jest";
import "../../src/";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Array", async () => {

    it("contains", async () => {
        expect.assertions(2);
        const arr = [1, 2, 3, 4, 2, 5];
        expect(arr.contains(2)).toEqual(true);
        expect(arr.contains(8)).toEqual(false);
    });

    it("hasDuplicate", async () => {
        expect.assertions(3);
        const arr1 = [1, 2, 3, 4, 2, 5];
        const arr2 = [1, 2, 3, 4, 5, 6];
        const arr3 = [2, 2, 2];
        expect(arr1.hasDuplicate()).toEqual(true);
        expect(arr2.hasDuplicate()).toEqual(false);
        expect(arr3.hasDuplicate()).toEqual(true);
    });

    it("itemCount", async () => {
        expect.assertions(1);
        const arr3 = [2, 2, 5, 2, 5];
        expect(arr3.itemCount()).toEqual([{ item: 2, count: 3 }, { item: 5, count: 2 }]);
    });

    it("toUnique", async () => {
        expect.assertions(1);
        const arr3 = [1, 2, 3, 4, 2, 5];
        expect(arr3.toUnique()).toEqual([1, 2, 3, 4, 5]);
    });

});
