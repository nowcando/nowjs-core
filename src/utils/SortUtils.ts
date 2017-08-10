
import { LinkedList } from "../collections/index";
import { Comparator } from "../core/index";

// Credit for algorithm implementation is for : https://github.com/mgechev/javascript-algorithms/tree/master/src/sorting

/**
 * A HeapSort alogorithm implementation by : O(n log n)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function heapSort<T>(input: T[], comparator: Comparator<T, T>): T[] {
    const computeHeap = (array: T[], index: number, heapSize: number, cmp: Comparator<T, T>) => {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;

        if (left < heapSize && cmp(array[left], array[index]) > 0) {
            largest = left;
        }

        if (right < heapSize && cmp(array[right], array[largest]) > 0) {
            largest = right;
        }

        if (largest !== index) {
            const temp1 = array[index];
            array[index] = array[largest];
            array[largest] = temp1;
            computeHeap(array, largest, heapSize, cmp);
        }
    };
    const buildMaxHeap = (array: T[], cmp: Comparator<T, T>) => {
        for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
            computeHeap(array, i, array.length, cmp);
        }
        return array;
    };

    let size = input.length;
    let temp: T;
    buildMaxHeap(input, comparator);
    for (let i = input.length - 1; i > 0; i -= 1) {
        temp = input[0];
        input[0] = input[i];
        input[i] = temp;
        size -= 1;
        computeHeap(input, 0, size, comparator);
    }
    return input;

}
/**
 * A QuickSort alogorithm implementation by : O(n log n)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function quickSort<T>(input: T[], comparator: Comparator<T, T>): T[] {
    const swap = (array: T[], i: number, j: number) => {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      return array;
    };
    const partition = (array: T[], left: number, right: number, compare: Comparator<T, T>) => {
      const cmp = array[right - 1];
      let minEnd = left;
      let maxEnd;
      for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
        if (compare(array[maxEnd], cmp) < 0) {
          swap(array, maxEnd, minEnd);
          minEnd += 1;
        }
      }
      swap(array, minEnd, right - 1);
      return minEnd;
    };
    const quickSortImpl = (array: T[], left: number, right: number, cmp: Comparator<T, T>) => {
      if (left < right) {
        const p = partition(array, left, right, cmp);
        quickSortImpl(array, left, p, cmp);
        quickSortImpl(array, p + 1, right, cmp);
      }
      return array;
    };
    return quickSortImpl(input, 0, input.length, comparator);
}

/**
 * A InsertionSort alogorithm implementation by : O(n ^ 2)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function insertionSort<T>(input: T[], comparator: Comparator<T, T>): T[] {
    let current;
    let j;
    for (let i = 1; i < input.length; i += 1) {
      current = input[i];
      j = i - 1;
      while (j >= 0 && comparator(input[j], current) > 0) {
        input[j + 1] = input[j];
        j -= 1;
      }
      input[j + 1] = current;
    }
    return input;
}

/**
 * A MergeSort alogorithm implementation by : O(n log n)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function mergeSort<T>(input: T[], comparator: Comparator<T, T>): T[] {
    const mergeSortImpl = (array: T[], cmp: Comparator<T, T>, start: number, end: number) => {
    start = start || 0;
    end = end || array.length;
    if (Math.abs(end - start) <= 1) {
      return [];
    }
    const middle = Math.ceil((start + end) / 2);

    mergeSortImpl(array, cmp, start, middle);
    mergeSortImpl(array, cmp, middle, end);

    return mergeImpl(array, cmp, start, middle, end);
  };

    const mergeImpl =  (array: T[], cmp: Comparator<T, T>, start: number , middle: number, end: number) => {
    const left = new LinkedList<T>();
    const right = new LinkedList<T>();

    const leftSize = middle - start;
    const rightSize = end - middle;
    const maxSize = Math.max(leftSize, rightSize);
    const size = end - start;
    let i;

    for (i = 0; i < maxSize; i += 1) {
      if (i < leftSize) {
        left.add(array[start + i]);
      }
      if (i < rightSize) {
        right.add(array[middle + i]);
      }
    }
    i = 0;
    while (i < size) {
      if (left.first && right.first) {
        if (cmp(left.first, right.first) > 0) {
          array[start + i] = right.shift();
        } else {
          array[start + i] = left.shift();
        }
      } else if (left.first) {
        array[start + i] = left.shift();
      } else {
        array[start + i] = right.shift();
      }
      i += 1;
    }
    return array;
  };
    return mergeSortImpl(input, comparator, 0, input.length);
}

/**
 * A BucketSort alogorithm implementation by : O(n+k)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function bucketSort(input: number[]): number[] {
    const insertionSortImpl = (array: number[] ) => {
      let current: number;
      let j: number;
      for (let i = 1; i < array.length; i += 1) {
        current = array[i];
        j = i - 1;
        while (j >= 0 && current < array[j]) {
          array[j + 1] = array[j];
          j -= 1;
        }
        array[j + 1] = current;
      }
      return array;
    };
    const createBuckets = (array: number[]) => {
      const buckets: number[][] = [];
      let currentBucket;
      let current: any;
      for (let i = 0; i < array.length; i += 1) {
        current = array[i];
        currentBucket = Math.floor(current);
        buckets[currentBucket] = buckets[currentBucket] || [];
        buckets[currentBucket].push(current);
      }
      return buckets;
    };
    const sortBuckets = (buckets: number[][]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < buckets.length; i += 1) {
        if (buckets[i] !== undefined) {
          insertionSortImpl(buckets[i]);
        }
      }
      return buckets;
    };

    const unionBuckets = (buckets: number[][]) => {
      let result: any = [];
      let currentBucket;
      for (let i = 0; i < buckets.length; i += 1) {
        currentBucket = buckets[i];
        if (currentBucket !== undefined) {
          result = result.concat(currentBucket);
        }
      }
      return result;
    };

    const bucketsm = createBuckets(input);
    sortBuckets(bucketsm);
    return unionBuckets(bucketsm);

}

/**
 * A CountingSort alogorithm implementation by : O(n+k)
 *
 * @export
 * @template T
 * @param {T[]} input
 * @param {Comparator<T, T>} comparator
 * @returns {T[]}
 */
export function countingSort(input: number[]): number[] {
    const getCount = (array: number[]) => {
      const count: any[] = [];
      let current: number;
      for (let i = 0; i < array.length; i += 1) {
        current = array[i];
        count[current] = (count[current] || 0) + 1;
      }
      return count;
    };
    const getLessCount = (array: number[]) => {
      const less: number[] = [];
      let last;
      less[0] = array[0] || 0;
      for (let i = 1; i < array.length; i += 1) {
        last = array[i - 1] || 0;
        less[i] = last + less[i - 1];
      }
      return less;
    };
    const sortImpl = (array: number[], less: number[]) => {
      const result: number[] = [];
      const currentPositions: number[] = [];
      let current;
      let position;
      for (let i = 0; i < array.length; i += 1) {
        current = array[i];
        position = less[current];
        if (currentPositions[current] === undefined) {
          currentPositions[current] = position;
        }
        result[currentPositions[current]] = current;
        currentPositions[current] += 1;
      }
      return result;
    };

    const lessy = getLessCount(getCount(input));
    return sortImpl(input, lessy);

}
