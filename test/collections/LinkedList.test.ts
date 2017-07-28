import "jest";
import { LinkedList } from "../../src/collections/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections LinkedList tests", async () => {

  it("checks add items", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.add(4);
    expect(list.size).toEqual(4) ;
  });
  it("checks insert item", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.add(4);
    list.insert(2, 8);
    expect(list.size).toEqual(5) ;
  });
  it("checks get item", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    expect(list.get(2)).toEqual(3) ;
  });
  it("checks get item after insert", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.insert(1, 8);
    expect(list.get(1)).toEqual(8) ;
  });
  it("checks remove items", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.remove(4);
    list.remove(2);
    expect(list.size).toEqual(2) ;
  });

  it("checks clear", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("checks linq", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("checks lastIndexOf", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4, 3 , 4, 2]);
    expect(list.size).toEqual(7) ;
    expect(list.lastIndexOf(3)).toEqual(4) ;
  });
  it("checks indexOf", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
  });
  it("checks itreation", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    const list2 = new LinkedList<number>();
    for (const item of list){
        list2.add(item);
    }
    expect(list2.size).toEqual(list.size) ;
  });
});
