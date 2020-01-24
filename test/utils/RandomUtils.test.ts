import 'jest';
import { secureMathRandom, uuid } from '../../src/utils/index';

// jest.resetAllMocks();
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Random Util tests', () => {
    it('checks generate secureMathRandom', () => {
        expect.assertions(2);
        const actual = secureMathRandom();
        expect(actual).toBeGreaterThanOrEqual(0);
        expect(actual).toBeLessThanOrEqual(1);
    });
});
