/* eslint-disable prefer-const */
// taken from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License
function pad2(c: string) {
    return c.length === 1 ? '0' + c : '' + c;
}

function clamp01(val: number) {
    return Math.min(1, Math.max(0, val));
}

function isPercentage(n: any) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}

function isOnePointZero(n: any) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
function bound01(n: any, max: any) {
    if (isOnePointZero(n)) {
        n = '100%';
    }

    const processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt((n * max).toString(), 10) / 100;
    }

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}
export class ColorUtils {
    /**
     * Detect Brghness color for input color and return brightness value
     * @param r Red color value or Color hex code . [0-255] or #23ffdd
     * @param g Green color value
     * @param b Blue color value
     */
    public static getBrightness(r: number | string, g?: number, b?: number): number {
        const rgb = ColorUtils.toRgb(r, g, b);
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    }

    public static toRgb(r: number | string | object, g?: number, b?: number, a?: number) {
        if (!g && !b && typeof r === 'string') {
            let c = r.toString().substring(1); // strip #
            if (c.length === 3) {
                const tr = c[0] + c[0] || '0';
                const tg = c[1] + c[1] || '0';
                const tb = c[2] + c[2] || '0';
                c = `${tr + tg + tb}`;
            }
            const rgb = parseInt(c, 16); // convert rrggbb to decimal
            // tslint:disable:no-bitwise
            r = (rgb >> 16) & 0xff; // extract red
            g = (rgb >> 8) & 0xff; // extract green
            b = (rgb >> 0) & 0xff; // extract blue
        }
        if (typeof r === 'object') {
            const c: any = r;
            r = c.r;
            g = c.g;
            b = c.b;
            a = c.a;
        }
        const mr = r as number;
        return { r: mr, g, b, a };
    }
    public static rgbToHex(r: number, g: number, b: number, allow3Char?: boolean) {
        const hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16)),
        ];
        // Return a 3 character hex if possible
        if (
            allow3Char &&
            hex[0].charAt(0) === hex[0].charAt(1) &&
            hex[1].charAt(0) === hex[1].charAt(1) &&
            hex[2].charAt(0) === hex[2].charAt(1)
        ) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join('');
    }
    public static toHex(r: number, g: number, b: number, allow3Char?: boolean) {
        return ColorUtils.rgbToHex(r, g, b, allow3Char);
    }
    public static toHexString(r: number, g: number, b: number, allow3Char?: boolean) {
        return '#' + ColorUtils.toHex(r, g, b, allow3Char);
    }

    public static toHsl(r: number | string, g?: number, b?: number, a?: number) {
        const rgb = ColorUtils.toRgb(r, g, b);
        const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a };
    }

    public static toHslString(r: number | string, g?: number, b?: number, a?: number) {
        const rgb = ColorUtils.toRgb(r, g, b);
        const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        // tslint:disable-next-line:one-variable-per-declaration
        const h = Math.round(hsl.h * 360),
            s = Math.round(hsl.s * 100),
            l = Math.round(hsl.l * 100);
        return rgb.a === 1
            ? 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
            : 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + rgb.a + ')';
    }

    public static rgbToHsl(r: number, g?: number, b?: number) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        // tslint:disable:one-variable-per-declaration
        const max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return { h, s, l };
    }

    public static hue2rgb(p: number, q: number, t: number) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }

    public static hslToRgb(h: number, s: number, l: number) {
        let r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = ColorUtils.hue2rgb(p, q, h + 1 / 3);
            g = ColorUtils.hue2rgb(p, q, h);
            b = ColorUtils.hue2rgb(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    public static getLuminance(r: number | string, g?: number, b?: number) {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        const rgb = ColorUtils.toRgb(r, g, b);
        // tslint:disable-next-line:one-variable-per-declaration
        let RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;

        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        } else {
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        } else {
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        } else {
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    public static isDark(r: number | string, g?: number, b?: number): boolean {
        return ColorUtils.getBrightness(r, g, b) < 128;
    }
    public static isLight(r: number | string, g?: number, b?: number): boolean {
        return ColorUtils.getBrightness(r, g, b) > 128;
    }

    public static desaturate(r: number | string, g?: number, b?: number, amount?: number) {
        amount = amount === 0 ? 0 : amount || 10;
        const hsl = ColorUtils.toHsl(r, g, b);
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return hsl;
    }

    public static saturate(r: number | string, g?: number, b?: number, amount?: number) {
        amount = amount === 0 ? 0 : amount || 10;
        const hsl = ColorUtils.toHsl(r, g, b);
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return hsl;
    }

    public static lighten(r: number | string, g?: number, b?: number, amount?: number) {
        amount = amount === 0 ? 0 : amount || 10;
        const hsl = ColorUtils.toHsl(r, g, b);
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return hsl;
    }

    public static brighten(r: number | string, g?: number, b?: number, amount?: number) {
        amount = amount === 0 ? 0 : amount || 10;
        const rgb = ColorUtils.toRgb(r, g, b);
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return rgb;
    }

    public static darken(r: number | string, g?: number, b?: number, amount?: number) {
        amount = amount === 0 ? 0 : amount || 10;
        const hsl = ColorUtils.toHsl(r, g, b);
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return hsl;
    }

    public static overlayColorToRgbString(color: string, amount?: number, lightColor?: string, darkColor?: string) {
        const rgb = ColorUtils.overlayColorToRgb(color, amount, lightColor, darkColor);
        return ColorUtils.toHexString(rgb.r, rgb.g, rgb.b);
    }
    public static overlayColorToHsl(color: string, amount?: number, lightColor?: string, darkColor?: string) {
        amount = amount || 80;
        const hsl = ColorUtils.isDark(color)
            ? ColorUtils.lighten(color, null, null, amount)
            : ColorUtils.darken(color, null, null, amount);
        return hsl;
    }
    public static overlayColorToRgb(color: string, amount?: number, lightColor?: string, darkColor?: string) {
        const hsl = ColorUtils.overlayColorToHsl(color, amount, lightColor, darkColor);
        const rgb = ColorUtils.hslToRgb(hsl.h * 360, hsl.s * 100, hsl.l * 100);
        return rgb;
    }

    public static complement(color: string) {
        const hsl = ColorUtils.toHsl(color);
        hsl.h = (hsl.h + 180) % 360;
        return hsl;
    }

    public static triad(color: string) {
        const hsl = ColorUtils.toHsl(color);
        const h = hsl.h;
        return [hsl, { h: (h + 120) % 360, s: hsl.s, l: hsl.l }, { h: (h + 240) % 360, s: hsl.s, l: hsl.l }];
    }

    public static tetrad(color: string) {
        const hsl = ColorUtils.toHsl(color);
        const h = hsl.h;
        return [
            hsl,
            { h: (h + 90) % 360, s: hsl.s, l: hsl.l },
            { h: (h + 180) % 360, s: hsl.s, l: hsl.l },
            { h: (h + 270) % 360, s: hsl.s, l: hsl.l },
        ];
    }
}
