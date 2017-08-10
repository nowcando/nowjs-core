import "jest";
import { SortedSet } from "../../src/collections/index";
import { numberComparator } from "../../src/core/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("SortedSet", async () => {

  it("checks add items", async () => {
    expect.assertions(1);
    const list = new SortedSet<number>(numberComparator);
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    expect(list.size).toEqual(4) ;
  });
  it("checks remove items", async () => {
    expect.assertions(1);
    const list = new SortedSet<number>(numberComparator);
    list.add(1);
    list.add(2);
    list.add(3);
    list.delete(4);
    list.delete(2);
    expect(list.size).toEqual(2) ;
  });
  it("checks get item", async () => {
    expect.assertions(1);
    const list = new SortedSet<number>(numberComparator);
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.get(2)).toEqual(3) ;
  });
  it("checks clear", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("checks linq", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("checks lastIndexOf", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1 , 2 , 3 , 4, 3 , 4, 2]);
    expect(list.size).toEqual(7) ;
    expect(list.lastIndexOf(3)).toEqual(4) ;
  });
  it("checks indexOf", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
  });

  it("checks has", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.has(3)).toEqual(true);
  });
  it("checks toCollection", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toCollection().size).toEqual(list.size);
  });
  it("checks toList", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toList().size).toEqual(list.size);
  });
  it("checks toArray", async () => {
    expect.assertions(2);
    const list = new SortedSet<number>(numberComparator, [1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toArray().length).toEqual(list.size);
  });

});
