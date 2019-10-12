import "jest";
import { numberComparator } from "../../src/core/index";
import {
    bucketSort, countingSort, heapSort, insertionSort,
    mergeSort, quickSort,
} from "../../src/utils/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("SortUtils Tests",  () => {
    describe("HepSort",  () => {
        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = heapSort(array, numberComparator);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
    describe("QuickSort",  () => {

        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = quickSort(array, numberComparator);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
    describe("InsertionSort",  () => {

        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = insertionSort(array, numberComparator);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
    describe("MergeSort",  () => {

        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = mergeSort(array, numberComparator);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
    describe("BucketSort",  () => {

        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = bucketSort(array);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
    describe("CountingSort",  () => {

        it("should return a sorted array", async () => {
            expect.assertions(1);
            const array = [1, 5, 6, 8, 4, 2, 7, 3];
            const actual = countingSort(array);
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });

    });
});
