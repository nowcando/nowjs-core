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
  it("checks addFirst items", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>([1, 2, 3]);
    list.addFirst(9);
    expect(list.size).toEqual(4) ;
  });
  it("checks addLast items", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>([1, 2, 3]);
    list.addLast(9);
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
  it("checks removeLast", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.removeLast();
    expect(list.size).toEqual(2) ;
  });
  it("checks removeFirst", async () => {
    expect.assertions(1);
    const list = new LinkedList<number>();
    list.add(1, 2, 3);
    list.removeFirst();
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
    expect.assertions(3);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.indexOf(3)).toEqual(2) ;
    expect(list.indexOf(9)).toEqual(-1) ;
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
  it("checks clone", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    const listclone =  list.clone();
    expect(listclone.size).toEqual(list.size) ;
  });
  it("checks contains", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.contains(3)).toEqual(true) ;
  });
  it("checks contains not contains", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.contains(8)).toEqual(false) ;
  });

  it("checks getFirst & getLast", async () => {
    expect.assertions(3);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.getFirst()).toEqual(1) ;
    expect(list.getLast()).toEqual(4) ;
  });

  it("checks toCollection", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toCollection().size).toEqual(list.size) ;
  });
  it("checks toList", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toList().size).toEqual(list.size) ;
  });
  it("checks toArray", async () => {
    expect.assertions(2);
    const list = new LinkedList<number>([1 , 2 , 3 , 4]);
    expect(list.size).toEqual(4) ;
    expect(list.toArray().length).toEqual(list.size) ;
  });

});
