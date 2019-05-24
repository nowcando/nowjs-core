import "jest";
import { SortedList } from "../../src/collections/index";
import { numberComparator } from "../../src/core/index";

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("SortedList",  () => {

  it("add items",  () => {
    expect.assertions(1);
    const list = new SortedList<number>(numberComparator);
    list.add(1, 2, 3);
    list.add(4);
    expect(list.size).toEqual(4) ;
  });
  it("remove items",  () => {
    expect.assertions(1);
    const list = new SortedList<number>(numberComparator);
    list.add(1, 2, 3);
    list.remove(4);
    list.remove(2);
    expect(list.size).toEqual(2) ;
  });
  it("get item",  () => {
    expect.assertions(1);
    const list = new SortedList<number>(numberComparator);
    list.add(1, 2, 3);
    expect(list.get(2)).toEqual(3) ;
  });
  it("clear",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("linq",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("lastIndexOf",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4, 3 , 4, 2]);
    expect(list.size).toEqual(7) ;
    expect(list.lastIndexOf(3)).toEqual(4) ;
  });
  it("indexOf",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
  });

  it("contains",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.contains(3)).toEqual(true);
  });
  it("toCollection",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toCollection().size).toEqual(list.size);
  });
  it("toList",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toList().size).toEqual(list.size);
  });
  it("toArray",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toArray().length).toEqual(list.size);
  });
  it("toSet",  () => {
    expect.assertions(2);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toSet().size).toEqual(list.size) ;
  });
  it("isEmpty",  () => {
    expect.assertions(3);
    const list = new SortedList<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.isEmpty()).toEqual(false) ;
    list.clear();
    expect(list.isEmpty()).toEqual(true) ;
  });

});
