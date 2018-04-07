import "jest";
import { List } from "../../src/collections/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections List tests", async () => {

  it("add items", async () => {
    expect.assertions(1);
    const list = new List<number>();
    list.add(1, 2, 3);
    list.add(4);
    expect(list.size).toEqual(4) ;
  });
  it("remove items", async () => {
    expect.assertions(1);
    const list = new List<number>();
    list.add(1, 2, 3);
    list.remove(4);
    list.remove(2);
    expect(list.size).toEqual(2) ;
  });
  it("get item", async () => {
    expect.assertions(1);
    const list = new List<number>();
    list.add(1, 2, 3);
    expect(list.get(2)).toEqual(3) ;
  });
  it("clear", async () => {
    expect.assertions(2);
    const list = new List<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("linq", async () => {
    expect.assertions(2);
    const list = new List<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("lastIndexOf", async () => {
    expect.assertions(2);
    const list = new List<number>([1 , 2 , 3 , 4, 3 , 4, 2]);
    expect(list.size).toEqual(7) ;
    expect(list.lastIndexOf(3)).toEqual(4) ;
  });
  it("indexOf", async () => {
    expect.assertions(2);
    const list = new List<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
  });

  it("contains", async () => {
    expect.assertions(2);
    const list = new List<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.contains(3)).toEqual(true);
  });
  it("toCollection", async () => {
    expect.assertions(2);
    const list = new List<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toCollection().size).toEqual(list.size);
  });
  it("toList", async () => {
    expect.assertions(2);
    const list = new List<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toList().size).toEqual(list.size);
  });
  it("toArray", async () => {
    expect.assertions(2);
    const list = new List<number>([1, 2, 3, 4]);
    expect(list.size).toEqual(4);
    expect(list.toArray().length).toEqual(list.size);
  });
  it("toSet", async () => {
    expect.assertions(2);
    const list = new List<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toSet().size).toEqual(list.size) ;
  });
  it("isEmpty", async () => {
    expect.assertions(3);
    const list = new List<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.isEmpty()).toEqual(false) ;
    list.clear();
    expect(list.isEmpty()).toEqual(true) ;
  });

});
