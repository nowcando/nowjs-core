import 'jest';
import { t, Translator } from '../../../src/globalization/translation';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {
    Translator.configure({
        locales: {
            global: {
                'consts.hello': 'Hello',
                'consts.world': 'World',
                'consts.person': 'Person',
            },
            en: {
                'consts.hello': 'Hello',
                'consts.world': 'World',
                'consts.person': 'Person',
            },
            fa: {
                'consts.hello': 'درود',
                'consts.world': 'دنیا',
                'consts.person': 'فرد',
            },
        },
        defaultLocale: 'en',
    });
});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('Translator', () => {
    it('checks translate', () => {
        expect.assertions(2);
        const key = 'consts.hello';
        const expected_en = 'Hello';
        const expected_fa = 'درود';
        const actual1 = t(key);
        const actual2 = t(key, 'fa');
        expect(actual1).toEqual(expected_en);
        expect(actual2).toEqual(expected_fa);
    });

    // it("checks translate with plural",  () => {
    //     expect.assertions(2);
    //     const key = "consts.person";
    //     const expected_en = "people";
    //     const expected_fa = "افراد";
    //     const actual1 = t(key, {plural: true});
    //     const actual2 = t(key, "fa", {plural: true});
    //     expect(actual1).toEqual(expected_en);
    //     expect(actual2).toEqual(expected_fa);
    // });
});
