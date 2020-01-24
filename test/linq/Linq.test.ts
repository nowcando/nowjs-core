import 'jest';
import { List } from '../../src/collections/List';
import '../../src/index';
import { Enumerable } from '../../src/linq/Enumerable';
import { Collectors } from '../../src/collections/Collectors';
import { Stack, Queue, PriorityQueue } from '../../src/collections';
import { numberComparator } from '../../src/core';

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
const testList = new List<string>();
const testNumberList = new List<number>();
const testNumberList1 = new List<number>();
const personList = new List<{ Name: string; Age: number }>();
const personList1 = new List<{ Name: string; Age: number }>();

const school = new List<{ Students: List<{ Name: string; Age: number }> }>();
beforeAll(() => {});

beforeEach(() => {
    testList.clear();
    testNumberList.clear();
    testNumberList1.clear();
    personList.clear();
    personList1.clear();
    school.clear();
});

afterAll(() => {});

afterEach(() => {});

describe('Linq', () => {
    describe('Enumerable', () => {
        describe('Static methods', () => {
            it('checks range .', () => {
                expect.assertions(1);
                const array = Enumerable.range(1, 3).toArray();
                const actual = array.linq().sum();
                expect(actual).toEqual(6);
            });
            it('checks repeat .', () => {
                expect.assertions(1);
                const array = Enumerable.repeat(1, 3).toArray();
                const actual = array.linq().sum();
                expect(actual).toEqual(3);
            });
            it('checks range percentile .', () => {
                expect.assertions(1);
                const array = Enumerable.range(1, 20).toArray();
                const actual = array.linq().percentile(0.25);
                expect(actual).toEqual(5);
            });
            it('checks range satistical methods .', () => {
                expect.assertions(5);
                const array = Enumerable.range(1, 20).toArray();
                array.push(5);
                const median = array.linq().median();
                const mode = array.linq().mode();
                const variance = array.linq().variance();
                const varianceP = array.linq().varianceP();
                const percentRank = array.linq().percentRank(5);
                expect(median).toEqual(10);
                expect(mode).toEqual(5);
                expect(variance).toEqual(33.03854875283447);
                expect(varianceP).toEqual(34.69047619047619);
                expect(percentRank).toEqual(0.23809523809523808);
            });
        });
        describe('Collector methods', () => {
            it('checks toList', () => {
                expect.assertions(2);
                testNumberList.add(1, 2, 3, 4, 5);
                const actual = testNumberList.linq().collect(Collectors.toList<number>());
                expect(actual instanceof List).toEqual(true);
                expect(actual.size).toEqual(5);
            }),
                it('checks toArray', () => {
                    expect.assertions(2);
                    testNumberList.add(1, 2, 3, 4, 5);
                    const actual = testNumberList.linq().collect(Collectors.toArray<number>());
                    expect(actual instanceof Array).toEqual(true);
                    expect(actual.length).toEqual(5);
                }),
                it('checks toSet', () => {
                    expect.assertions(2);
                    testNumberList.add(1, 2, 3, 4, 5);
                    const actual = testNumberList.linq().collect(Collectors.toSet<number>());
                    expect(actual instanceof Set).toEqual(true);
                    expect(actual.size).toEqual(5);
                }),
                it('checks toStack', () => {
                    expect.assertions(2);
                    testNumberList.add(1, 2, 3, 4, 5);
                    const actual = testNumberList.linq().collect(Collectors.toStack<number>());
                    expect(actual instanceof Stack).toEqual(true);
                    expect(actual.size).toEqual(5);
                }),
                it('checks toQueue', () => {
                    expect.assertions(2);
                    testNumberList.add(1, 2, 3, 4, 5);
                    const actual = testNumberList.linq().collect(Collectors.toQueue<number>());
                    expect(actual instanceof Queue).toEqual(true);
                    expect(actual.size).toEqual(5);
                }),
                it('checks toPriorityQueue', () => {
                    expect.assertions(2);
                    testNumberList.add(1, 2, 3, 4, 5);
                    const actual = testNumberList.linq().collect(Collectors.toPriorityQueue<number>(numberComparator));
                    expect(actual instanceof PriorityQueue).toEqual(true);
                    expect(actual.size).toEqual(5);
                });
        });
        it('checks isEmpty .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual = testNumberList.linq().isEmpty();
            expect(actual).toEqual(false);
        });
        it('checks count .', () => {
            expect.assertions(6);
            testList.add('A', 'B', 'C', 'D', 'A', 'C', 'A', 'C', 'B');
            const actualCount = testList.linq().count();
            const actualCountA = testList.linq().count(x => x === 'A');
            const actualCountB = testList.linq().count(x => x === 'B');
            const actualCountC = testList.linq().count(x => x === 'C');
            const actualCountD = testList.linq().count(x => x === 'D');
            const actualCountF = testList.linq().count(x => x === 'F');
            expect(actualCount).toEqual(testList.size);
            expect(actualCountA).toEqual(3);
            expect(actualCountB).toEqual(2);
            expect(actualCountC).toEqual(3);
            expect(actualCountD).toEqual(1);
            expect(actualCountF).toEqual(0);
        });
        it('checks any .', () => {
            expect.assertions(2);
            testList.add('A', 'B', 'C', 'D', 'A', 'C', 'A', 'C', 'B');
            const actualTrue = testList.linq().any(x => x === 'A');
            const actualFalse = testList.linq().any(x => x === 'F');
            expect(actualTrue).toEqual(true);
            expect(actualFalse).toEqual(false);
        });
        it('checks all .', () => {
            expect.assertions(2);
            testList.add('A', 'B', 'C', 'D', 'A', 'C', 'A', 'C', 'B');
            const actualFalse = testList.linq().all(x => x === 'F');
            testList.clear();
            testList.add('A', 'A', 'A');
            const actualTrue = testList.linq().all(x => x === 'A');
            expect(actualTrue).toEqual(true);
            expect(actualFalse).toEqual(false);
        });
        it('checks contains .', () => {
            expect.assertions(2);
            testList.add('A', 'B', 'C', 'D', 'A', 'C', 'A', 'C', 'B');
            const actualFalse = testList.linq().contains('F');
            const actualTrue = testList.linq().contains('A');
            expect(actualTrue).toEqual(true);
            expect(actualFalse).toEqual(false);
        });
        it('checks average .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualAverage = testNumberList.linq().average();
            const actualConditionalAverage = testNumberList.linq().average(
                item => item,
                item => item >= 3,
            );
            expect(actualAverage).toEqual(3);
            expect(actualConditionalAverage).toEqual(4);
        });
        it('checks sum .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualSum = testNumberList.linq().sum();
            const actualConditionalSum = testNumberList.linq().sum(
                item => item,
                item => item >= 3,
            );
            expect(actualSum).toEqual(15);
            expect(actualConditionalSum).toEqual(12);
        });
        it('checks max .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualMax = testNumberList.linq().max();
            const actualConditionalMax = testNumberList.linq().max(
                item => item,
                item => item <= 3,
            );
            expect(actualMax).toEqual(5);
            expect(actualConditionalMax).toEqual(3);
        });
        it('checks min .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualMin = testNumberList.linq().min();
            const actualConditionalMin = testNumberList.linq().min(
                item => item,
                item => item >= 3,
            );
            expect(actualMin).toEqual(1);
            expect(actualConditionalMin).toEqual(3);
        });

        it('checks aggregate .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualSum = testNumberList.linq().aggregate((prev, current) => (prev += current));
            const actualFactorial = testNumberList.linq().aggregate((prev, current) => (prev *= current));
            expect(actualSum).toEqual(15);
            expect(actualFactorial).toEqual(120);
        });

        it('checks reverse .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualArray = testNumberList
                .linq()
                .reverse()
                .toArray();
            expect(actualArray).toEqual(testNumberList.toArray().reverse());
        });

        it('checks first .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualFirst = testNumberList.linq().first();
            const actualConditionalFirst = testNumberList.linq().first(x => x >= 4);
            expect(actualFirst).toEqual(1);
            expect(actualConditionalFirst).toEqual(4);
        });

        it('checks last .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualLast = testNumberList.linq().last();
            const actualConditionalLast = testNumberList.linq().last(x => x <= 3);
            expect(actualLast).toEqual(5);
            expect(actualConditionalLast).toEqual(3);
        });

        it('checks take .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualTake = testNumberList
                .linq()
                .take(3)
                .toArray();
            expect(actualTake.length).toEqual(3);
            expect(actualTake).toEqual([1, 2, 3]);
        });

        it('checks takeWhile .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualTake = testNumberList
                .linq()
                .takeWhile(x => x > 3)
                .toArray();
            expect(actualTake.length).toEqual(3);
        });

        it('checks skip .', () => {
            expect.assertions(2);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualSkip = testNumberList
                .linq()
                .skip(3)
                .toArray();
            expect(actualSkip.length).toEqual(2);
            expect(actualSkip).toEqual([4, 5]);
        });

        it('checks skipWhile .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actualSkip = testNumberList
                .linq()
                .skipWhile(x => x > 2)
                .toArray();
            expect(actualSkip.length).toEqual(3);
        });

        it('checks distinct .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5, 1, 8, 4);
            const actual = testNumberList
                .linq()
                .distinct()
                .toArray();
            expect(actual.length).toEqual(6);
        });

        it('checks select .', () => {
            expect.assertions(2);
            personList.add({ Name: 'Saeed', Age: 35 }, { Name: 'Amir', Age: 25 });
            const actual = personList
                .linq()
                .select()
                .toArray();
            const actualSelector = personList
                .linq()
                .select(x => x.Name)
                .toArray();
            expect(actual).toEqual(personList.toArray());
            expect(actualSelector).toEqual(['Saeed', 'Amir']);
        });
        it('checks selectMany .', () => {
            expect.assertions(2);
            personList1.add({ Name: 'Saeed', Age: 35 }, { Name: 'Amir', Age: 25 });
            personList.add({ Name: 'Ali', Age: 18 }, { Name: 'Samad', Age: 12 });
            school.add({ Students: personList1 }, { Students: personList });
            const actualSelector = school
                .linq()
                .selectMany(
                    x => x.Students,
                    (s: any) => s.Name,
                )
                .toArray();
            const actualSelectorSimple = school
                .linq()
                .selectMany(x => x.Students)
                .toArray();
            expect(actualSelector).toEqual(['Saeed', 'Amir', 'Ali', 'Samad']);
            expect(actualSelectorSimple.length).toEqual(4);
        });

        it('checks union .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual = testNumberList
                .linq()
                .union([1, 4, 7])
                .toArray();
            expect(actual).toEqual([1, 2, 3, 4, 5, 7]);
        });
        it('checks intersect .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual = testNumberList
                .linq()
                .intersect([1, 4, 7])
                .toArray();
            expect(actual).toEqual([1, 4]);
        });
        it('checks subtract .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual = testNumberList
                .linq()
                .subtract([1, 4, 7])
                .toArray();
            expect(actual).toEqual([2, 3, 5]);
        });
        it('checks where .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual = testNumberList
                .linq()
                .where(x => x > 2)
                .toArray();
            expect(actual).toEqual([3, 4, 5]);
        });
        it('checks join .', () => {
            expect.assertions(1);
            const list1 = [
                { name: 'A', age: 12 },
                { name: 'B', age: 15 },
                { name: 'C', age: 15 },
            ];
            const list2 = [
                { name: 'A', color: 'red' },
                { name: 'B', color: 'blue' },
                { name: 'C', color: 'red' },
                { name: 'D', color: 'black' },
            ];

            const actual = list1
                .linq()
                .join(
                    list2,
                    xx => xx.name,
                    xx => xx.name,
                    (x, y) => ({ name: x.name, age: x.age, color: y.color }),
                )
                .toArray();
            expect(actual.length).toEqual(3);
        });
        it('checks groupBy.', () => {
            expect.assertions(5);

            const list2 = [
                { name: 'A', color: 'red' },
                { name: 'B', color: 'blue' },
                { name: 'C', color: 'red' },
                { name: 'D', color: 'black' },
                { name: 'A', color: 'orange' },
            ];
            const actual = list2
                .linq()
                .groupBy(xx => xx.name)
                .toArray();
            expect(actual.length).toEqual(4);
            expect(actual[0].values.count()).toEqual(2);
            expect(actual[1].values.count()).toEqual(1);
            expect(actual[2].values.count()).toEqual(1);
            expect(actual[3].values.count()).toEqual(1);
        });
        it('checks groupBy nested.', () => {
            expect.assertions(1);

            const list2 = [
                { name: 'A', color: 'red', category: 'sport' },
                { name: 'B', color: 'blue', category: 'book' },
                { name: 'C', color: 'red', category: 'sport' },
                { name: 'D', color: 'black', category: 'book' },
                { name: 'A', color: 'orange', category: 'sport' },
                { name: 'F', color: 'black', category: 'book' },
                { name: 'G', color: 'black', category: 'book' },
            ];
            const actual = list2
                .linq()
                .groupBy(xx => ({ color: xx.color, category: xx.category }))
                .groupBy(xx => xx.key.category)
                .toArray();
            expect(actual.length).toEqual(2);
            // expect(actual[0].values.count()).toEqual(2);
            // expect(actual[1].values.count()).toEqual(1);
            // expect(actual[2].values.count()).toEqual(1);
            // expect(actual[3].values.count()).toEqual(1);
        });

        it('checks join & groupBy .', () => {
            expect.assertions(1);
            const list1 = [
                { name: 'A', age: 12 },
                { name: 'B', age: 15 },
                { name: 'C', age: 15 },
                { name: 'A', age: 18 },
            ];
            const list2 = [
                { name: 'A', color: 'red' },
                { name: 'B', color: 'blue' },
                { name: 'C', color: 'red' },
                { name: 'D', color: 'black' },
                { name: 'A', color: 'orange' },
            ];
            const actual = list1
                .linq()
                .join(
                    list2,
                    xx => xx.name,
                    xx => xx.name,
                    (x, y) => ({ name: x.name, age: x.age, color: y.color }),
                )
                .groupBy(xx => xx.name)
                .toArray();
            expect(actual.length).toEqual(3);
        });
        it('checks covariance .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            testNumberList1.add(10, 24, 33, 54, 10);
            const actual = testNumberList.linq().covariance(testNumberList1.linq());
            expect(Math.round(actual * 100) / 100).toEqual(187.75);
        });
        it('checks pearson .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            testNumberList1.add(10, 24, 33, 54, 10);
            const actual = testNumberList.linq().pearson(testNumberList1.linq());
            expect(Math.round(actual * 10000) / 10000).toEqual(0.2552);
        });
        it('checks variance .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            const actual = testNumberList.linq().variance();
            expect(actual).toEqual(1284);
        });
        it('checks stdDev .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            const actual = testNumberList.linq().stdDev();
            expect(Math.round(actual * 10000) / 10000).toEqual(35.8329);
        });
        it('checks mean .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            const actual = testNumberList.linq().mean();
            expect(actual).toEqual(49);
        });
        it('checks range .', () => {
            expect.assertions(1);
            testNumberList.add(5, 20, 40, 80, 100);
            const actual = testNumberList.linq().range();
            expect(actual).toEqual(95);
        });
        it('checks percentile .', () => {
            expect.assertions(6);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual15 = testNumberList.linq().percentile(0.15);
            const actual25 = testNumberList.linq().percentile(0.25);
            const actual55 = testNumberList.linq().percentile(0.55);
            const actual75 = testNumberList.linq().percentile(0.75);
            const actual95 = testNumberList.linq().percentile(0.95);
            const actual100 = testNumberList.linq().percentile(1);
            expect(actual15).toEqual(1);
            expect(actual25).toEqual(2);
            expect(actual55).toEqual(3);
            expect(actual75).toEqual(4);
            expect(actual95).toEqual(4);
            expect(actual100).toEqual(5);
        });
        it('checks percentRank .', () => {
            expect.assertions(1);
            testNumberList.add(1, 2, 3, 4, 5);
            const actual3 = testNumberList.linq().percentRank(3);
            expect(actual3).toEqual(0.5);
        });
    });
});
