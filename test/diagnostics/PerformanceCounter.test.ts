import 'jest';
import { PerformanceCounter } from '../../src/diagnostics/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('PerformanceCounter tests', () => {
    it('checks start', () => {
        expect.assertions(1);
        PerformanceCounter.start('atest');
        const actual = PerformanceCounter.finish('atest');
        expect(actual).not.toEqual(null);
    });
});
