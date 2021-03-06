import "jest";
import { Queue } from "../../src/collections/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections Queue tests",  () => {

  it("enqueu items",  () => {
    expect.assertions(1);
    const list = new Queue<number>();
    list.enqueue(1, 2, 3);
    list.enqueue(4);
    expect(list.size).toEqual(4);
  });
  it("dequeu items",  () => {
    expect.assertions(5);
    const list = new Queue<number>();
    list.enqueue(1, 2, 3);
    const item1 = list.dequeue();
    const item2 = list.dequeue();
    const item3 = list.dequeue();
    const item4 = list.dequeue();
    expect(item1).toEqual(1);
    expect(item2).toEqual(2);
    expect(item3).toEqual(3);
    expect(item4).toEqual(undefined);
    expect(list.size).toEqual(0);
  });
  it("peek item",  () => {
    expect.assertions(2);
    const list = new Queue<number>();
    list.enqueue(1, 2, 3);
    const item = list.peek();
    expect(item).toEqual(1);
    expect(list.size).toEqual(3);
  });
  it("clear",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    list.clear();
    expect(list.size).toEqual(0);
  });
  it("linq",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.linq().count()).toEqual(4);
  });
  it("itreation",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    const list2 = new Queue<number>();
    for (const item of list) {
      list2.enqueue(list.dequeue());
    }
    expect(list2.size).toEqual(2);
  });

  it("contains",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.contains(3)).toEqual(true);
  });
  it("toCollection",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toCollection().size).toEqual(list.size);
  });
  it("toList",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toList().size).toEqual(list.size);
  });
  it("toArray",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toArray().length).toEqual(list.size);
  });
  it("toSet",  () => {
    expect.assertions(2);
    const list = new Queue<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toSet().size).toEqual(list.size) ;
  });
  it("isEmpty",  () => {
    expect.assertions(3);
    const list = new Queue<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.isEmpty()).toEqual(false) ;
    list.clear();
    expect(list.isEmpty()).toEqual(true) ;
  });

});
