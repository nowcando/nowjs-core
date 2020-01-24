import 'jest';
import '../../src';
// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Promise', () => {
    describe('Promise extra futures.', () => {
        it('checks static wait', async () => {
            expect.assertions(1);
            const start = Date.now();
            const pr = await Promise.wait(15).then(() => {
                return 99;
            });
            const finish = Date.now();
            const duration = finish - start;
            expect(duration).toBeGreaterThanOrEqual(14);
        });

        it('checks static delay', async () => {
            expect.assertions(1);
            const start = Date.now();
            const pr = await Promise.delay(15).then(() => {
                return 99;
            });
            const finish = Date.now();
            const duration = finish - start;
            expect(duration).toBeGreaterThanOrEqual(14);
        });

        it('checks timeout & wait ', async () => {
            expect.assertions(1);
            const start = Date.now();
            const pr = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(99);
                }, 10);
            })
                .wait(30)
                .timeout(50)
                .then(rr => {
                    return 999;
                });
            const finish = Date.now();
            const duration = finish - start;
            expect(duration).toBeGreaterThanOrEqual(39);
        });

        it('checks timeout & delay ', async () => {
            expect.assertions(1);
            const start = Date.now();
            const pr = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(99);
                }, 10);
            })
                .delay(30)
                .timeout(50)
                .then(rr => {
                    return 999;
                });
            const finish = Date.now();
            const duration = finish - start;
            expect(duration).toBeGreaterThanOrEqual(39);
        });

        it('checks spread for all', async () => {
            expect.assertions(1);
            const actual = await Promise.all([Promise.delay(10, 'hello'), Promise.delay(20, 'saeed')]).spread(
                (msg1, msg2) => {
                    return `${msg1} ${msg2}`;
                },
            );
            expect(actual).toEqual('hello saeed');
        });

        it('checks spread for one', async () => {
            expect.assertions(1);
            const actual = await Promise.delay(10, 'hello saeed').spread(msg1 => {
                return `${msg1}`;
            });
            expect(actual).toEqual('hello saeed');
        });

        it('checks ExtendedPromise progress', async () => {
            expect.assertions(1);
            const pr = Promise.extendedPromise(Promise.delay(10, 'hello saeed'), {
                onProgress: data => {
                    // tslint:disable-next-line:no-console
                    console.log(data);
                },
            });
            pr.progress(100);
            const actual = await pr;
            expect(actual).toEqual('hello saeed');
        });
    });
});
