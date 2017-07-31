import "jest";
import { Collection, ReadonlyCollection } from "../../src/collections/index";

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("Collections ReadonlyCollection tests", async () => {

  it("checks get item", async () => {
    expect.assertions(1);
    const list = new ReadonlyCollection<number>([1, 2, 3]);
    expect(list.get(2)).toEqual(3) ;
  });
  it("checks clone", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    const listclone =  list.clone();
    expect(listclone.size).toEqual(list.size) ;
  });
  it("checks clear", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    list.clear();
    expect(list.size).toEqual(0) ;
  });
  it("checks linq", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.linq().count()).toEqual(4) ;
  });
  it("checks lastIndexOf", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4, 3 , 4, 2]);
    expect(list.size).toEqual(7) ;
    expect(list.lastIndexOf(3)).toEqual(4) ;
  });
  it("checks indexOf", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
  });
  it("checks contains", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.contains(3)).toEqual(true) ;
  });
  it("checks toCollection", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toCollection().size).toEqual(list.size) ;
  });
  it("checks toList", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toList().size).toEqual(list.size) ;
  });
  it("checks toArray", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toArray().length).toEqual(list.size) ;
  });
  it("checks itreation", async () => {
    expect.assertions(2);
    const list = new ReadonlyCollection<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    const list2 = new Collection<number>();
    for (const item of list){
        list2.add(item);
    }
    expect(list2.size).toEqual(list.size) ;
  });

});
