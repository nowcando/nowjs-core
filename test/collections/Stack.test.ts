import "jest";
import {  Stack } from "../../src/collections/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections Stack tests", async () => {

  it("checks push items", async () => {
    expect.assertions(1);
    const list = new Stack<number>();
    list.push(1, 2, 3);
    list.push(4);
    expect(list.size).toEqual(4) ;
  });
  it("checks pop items", async () => {
    expect.assertions(5);
    const list = new Stack<number>();
    list.push(1, 2, 3);
    const item1 = list.pop();
    const item2 = list.pop();
    const item3 = list.pop();
    const item4 = list.pop();
    expect(item1).toEqual(3) ;
    expect(item2).toEqual(2) ;
    expect(item3).toEqual(1) ;
    expect(item4).toEqual(undefined) ;
    expect(list.size).toEqual(0) ;
  });
  it("checks peek item", async () => {
    expect.assertions(2);
    const list = new Stack<number>();
    list.push(1, 2, 3);
    const item = list.peek();
    expect(item).toEqual(1) ;
    expect(list.size).toEqual(3) ;
  });
  it("checks clear", async () => {
    expect.assertions(2);
    const list = new Stack<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("checks linq", async () => {
    expect.assertions(2);
    const list = new Stack<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("checks itreation", async () => {
    expect.assertions(2);
    const list = new Stack<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    const list2 = new Stack<number>();
    for (const item of list){
        list2.push(list.pop());
    }
    expect(list2.size).toEqual(2) ;
  });

});
