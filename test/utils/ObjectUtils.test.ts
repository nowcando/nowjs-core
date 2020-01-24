import 'jest';
import { cloneObject, deepAssign, isObjectType } from '../../src/utils/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('ObjectUtils', () => {
    it('checks isObject', async () => {
        expect.assertions(4);
        const obj = { a: 1 };
        const fn = () => 1;
        const str = '1';
        const num = 1;
        expect(isObjectType(obj)).toEqual(true);
        expect(isObjectType(fn)).toEqual(false);
        expect(isObjectType(str)).toEqual(false);
        expect(isObjectType(num)).toEqual(false);
    });
    it('checks deepAssign', async () => {
        expect.assertions(4);
        const tobj = { a: 1, h: { k: 5 }, c: 9 };
        const tobj1 = { h: { b: { c: 1 } } };
        const tobj2 = { h: { b: { c: 4 }, d: { e: 1 } } };
        const actual = deepAssign(tobj, tobj1, tobj2);
        expect(actual.a).toEqual(1);
        expect(actual.c).toEqual(9);
        expect(actual.h.b.c).toEqual(4);
        expect(actual.h.d.e).toEqual(1);
    });

    it('checks deepAssign to object that no have any keys', async () => {
        expect.assertions(5);
        const dt1 = new Date(1970, 1, 1, 0, 0, 0, 0);
        const dt2 = new Date(1980, 2, 2, 0, 0, 0, 0);
        const tobj = { a: dt1, h: { k: 5 }, c: 9 };
        const tobj1 = { h: { b: { c: 1 } }, m: dt2 };
        const tobj2 = { h: { b: { c: 4 }, d: { e: 1 } } };
        const actual = deepAssign({}, tobj, tobj1, tobj2);
        expect(actual.a).toEqual(dt1);
        expect(actual.c).toEqual(9);
        expect(actual.m).toEqual(dt2);
        expect(actual.h.b.c).toEqual(4);
        expect(actual.h.d.e).toEqual(1);
    });

    it('checks deepAssign to object mixed date and array and function', async () => {
        expect.assertions(7);
        const dt1 = new Date(1970, 1, 1, 0, 0, 0, 0);
        const dt2 = new Date(1980, 2, 2, 0, 0, 0, 0);
        const arr1 = [10, 11, 12, 13, 14];
        const arr2 = [20, 21, 22, 23, 24];
        const fn1 = () => 35;
        const fn2 = () => 45;
        const tobj = { a: dt1, h: { k: 5 }, c: 9, age: fn1 };
        const tobj1 = { h: { b: { c: 1 } }, m: dt2, n: arr1 };
        const tobj2 = { h: { b: { c: 4 }, d: { e: 1 } }, n: arr2, age: fn2 };
        const actual = deepAssign({}, tobj, tobj1, tobj2);
        expect(actual.a).toEqual(dt1);
        expect(actual.c).toEqual(9);
        expect(actual.m).toEqual(dt2);
        expect(actual.n).toEqual(arr2);
        expect(actual.age).toEqual(fn2);
        expect(actual.h.b.c).toEqual(4);
        expect(actual.h.d.e).toEqual(1);
    });

    it('checks cloneObject', async () => {
        expect.assertions(3);
        const tobj = { a: 1, h: { k: 5 }, c: 9 };
        const actual = cloneObject(tobj);
        expect(actual.a).toEqual(1);
        expect(actual.c).toEqual(9);
        expect(actual.h.k).toEqual(5);
    });
});
