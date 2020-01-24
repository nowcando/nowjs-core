import 'jest';
import { ColorUtils } from '../../src/utils/index';

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => {});

beforeEach(() => {});

afterAll(() => {});

afterEach(() => {});

describe('ColorUtils', () => {
    it('checks isDark', () => {
        expect.assertions(2);
        const black = '#000';
        const white = '#fff';
        const actual1 = ColorUtils.isDark(black);
        const actual2 = ColorUtils.isDark(white);
        expect(actual1).toEqual(true);
        expect(actual2).toEqual(false);
    });

    it('checks isLight', () => {
        expect.assertions(2);
        const black = '#000';
        const white = '#fff';
        const actual1 = ColorUtils.isLight(black);
        const actual2 = ColorUtils.isLight(white);
        expect(actual1).toEqual(false);
        expect(actual2).toEqual(true);
    });
    it('checks complement', () => {
        expect.assertions(2);
        const black = '#000';
        const white = '#fff';
        const actual1 = ColorUtils.complement(black);
        const actual2 = ColorUtils.complement(white);
        expect(actual1.l).toEqual(0);
        expect(actual2.l).toEqual(1);
    });
    it('checks overlayColor', () => {
        expect.assertions(12);
        const black = '#000';
        const white = '#fff';
        const red = '#ff0000';
        const blue = '#0000ff';
        const green = '#00ff00';
        const yellow = '#ffff00';
        const orange = '#ffa500';
        const lightblue = '#add8e6';
        const lightgreen = '#90ee90';
        const darkblue = '#00008b';
        const darkgreen = '#006400';
        const darkred = '#8b0000';
        const actual1 = ColorUtils.overlayColorToRgbString(black);
        const actual2 = ColorUtils.overlayColorToRgbString(white);
        const actual3 = ColorUtils.overlayColorToRgbString(red);
        const actual4 = ColorUtils.overlayColorToRgbString(blue);
        const actual5 = ColorUtils.overlayColorToRgbString(green);
        const actual6 = ColorUtils.overlayColorToRgbString(yellow);
        const actual7 = ColorUtils.overlayColorToRgbString(orange);
        const actual8 = ColorUtils.overlayColorToRgbString(lightblue);
        const actual9 = ColorUtils.overlayColorToRgbString(lightgreen);
        const actual10 = ColorUtils.overlayColorToRgbString(darkblue);
        const actual11 = ColorUtils.overlayColorToRgbString(darkgreen);
        const actual12 = ColorUtils.overlayColorToRgbString(darkred);
        expect(actual1).toEqual('#cccccc');
        expect(actual2).toEqual('#333333');
        expect(actual3).toEqual('#ffffff');
        expect(actual4).toEqual('#ffffff');
        expect(actual5).toEqual('#000000');
        expect(actual6).toEqual('#000000');
        expect(actual7).toEqual('#000000');
        expect(actual8).toEqual('#000000');
        expect(actual9).toEqual('#000000');
        expect(actual10).toEqual('#ffffff');
        expect(actual11).toEqual('#fffdfd');
        expect(actual12).toEqual('#ffffff');
    });
});
