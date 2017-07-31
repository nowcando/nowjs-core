import "jest";
import {  PriorityQueue } from "../../src/collections/index";
import { Comparator, numberComparator } from "../../src/core/Comparator";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections PriorityQueue tests", async () => {

  it("checks enqueu items", async () => {
    expect.assertions(1);
    const list = new PriorityQueue<number>(numberComparator);
    list.enqueue(7, 5, 10 , 2);
    list.enqueue(4);
    expect(list.size).toEqual(5) ;
  });

  it("checks dequeu items", async () => {
    expect.assertions(6);
    const list = new PriorityQueue<number>(numberComparator);
    list.enqueue(7, 5, 10 , 2);
    const item1 = list.dequeue();
    const item2 = list.dequeue();
    const item3 = list.dequeue();
    const item4 = list.dequeue();
    const item5 = list.dequeue();
    expect(item1).toEqual(2) ;
    expect(item2).toEqual(5) ;
    expect(item3).toEqual(7) ;
    expect(item4).toEqual(10) ;
    expect(item5).toEqual(undefined) ;
    expect(list.size).toEqual(0) ;
  });

  it("checks peek item", async () => {
    expect.assertions(4);
    const list = new PriorityQueue<number>(numberComparator);
    list.enqueue(7, 5, 10 , 2);
    const item = list.peek();
    expect(item).toEqual(2) ;
    expect(list.size).toEqual(4) ;
    list.dequeue();
    list.dequeue();
    list.dequeue();
    list.dequeue();
    const itemnull = list.peek();
    expect(itemnull).toEqual(null) ;
    expect(list.size).toEqual(0) ;
  });

  it("checks clear", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator, [7, 5, 10 , 2]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });

  it("checks linq", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator , [7, 5, 10 , 2]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });

  it("checks itreation", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator , [7, 5, 10 , 2, 4 , 10 , 2]);
    expect(list.size).toEqual(7) ;
    const list2 = new PriorityQueue<number>(numberComparator);
    for (const item of list){
        list2.enqueue(list.dequeue());
    }
    expect(list2.size).toEqual(4) ;
  });

  it("checks contains", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.contains(3)).toEqual(true);
  });
  it("checks toCollection", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toCollection().size).toEqual(list.size);
  });
  it("checks toList", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toList().size).toEqual(list.size);
  });
  it("checks toArray", async () => {
    expect.assertions(2);
    const list = new PriorityQueue<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toArray().length).toEqual(list.size);
  });

});
