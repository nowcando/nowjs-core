import 'jest';
import { BigDecimal } from '../../../src/computation/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Computation', () => {
    describe('Math', () => {
        describe('BigDecimal', () => {
            it('checks plus', () => {
                expect.assertions(1);
                const bn = new BigDecimal(5);
                expect(bn.plus(1).toString()).toEqual('6');
            });
            it('checks plus decimals', () => {
                expect.assertions(1);
                const bn = new BigDecimal(5.32);
                expect(bn.plus(1.4).toString()).toEqual('6.72');
            });
            it('checks plus for very long numbers', () => {
                expect.assertions(1);
                const bn = new BigDecimal('999999999999999999999999999999');
                expect(bn.plus('99999999999999999999999999999999991').toString()).toEqual(
                    '100000999999999999999999999999999990',
                );
            });
            it('checks minus', () => {
                expect.assertions(1);
                const bn = new BigDecimal(-5.15);
                expect(bn.minus(2.3).toString()).toEqual('-7.45');
            });
            it('checks multiply', () => {
                expect.assertions(1);
                const bn = new BigDecimal(5);
                expect(bn.multiply(2).toString()).toEqual('10');
            });
            it('checks multiply very long', () => {
                expect.assertions(1);
                const bn = new BigDecimal('999999999999999999999999999999.873779');
                expect(bn.multiply(2).toString()).toEqual('1999999999999999999999999999999.747558');
            });
            it('checks divide', () => {
                expect.assertions(1);
                const bn = new BigDecimal(10);
                expect(bn.divide(2).toString()).toEqual('5');
            });
            it('checks power', () => {
                expect.assertions(1);
                const bn = new BigDecimal(5);
                expect(bn.power(2).toString()).toEqual('25');
            });
            it('checks power decimal', () => {
                expect.assertions(1);
                const bn = new BigDecimal(25.25);
                expect(bn.power(2).toString()).toEqual('637.5625');
            });
            it('checks max', () => {
                expect.assertions(1);
                const bn = BigDecimal.max(new BigDecimal(5), new BigDecimal(15), new BigDecimal(6));
                expect(bn.toString()).toEqual('15');
            });
            it('checks min', () => {
                expect.assertions(1);
                const bn = BigDecimal.min(new BigDecimal(5), new BigDecimal(15), new BigDecimal(6));
                expect(bn.toString()).toEqual('5');
            });
        });
    });
});
