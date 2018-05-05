
function pad2(c: string) {
    return c.length === 1 ? "0" + c : "" + c;
}

function clamp01(val: number) {
    return Math.min(1, Math.max(0, val));
}

function isPercentage(n: any) {
    return typeof n === "string" && n.indexOf("%") !== -1;
}

function isOnePointZero(n: any) {
    return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function bound01(n: any, max: any) {
    if (isOnePointZero(n)) { n = "100%"; }

    const processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt((n * max).toString(), 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
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

        const rgb = ColorUtils.toRGB(r, g, b);
        return ((r as number) * 299 + g * 587 + b * 114) / 1000;
    }

    public static toRGB(r: number | string | object, g?: number, b?: number, a?: number) {
        if (!g && !b && typeof r === "string") {
            const c = r.toString().substring(1);      // strip #
            const rgb = parseInt(c, 16);   // convert rrggbb to decimal
            // tslint:disable:no-bitwise
            r = (rgb >> 16) & 0xff;  // extract red
            g = (rgb >> 8) & 0xff;  // extract green
            b = (rgb >> 0) & 0xff;  // extract blue
        }
        if (typeof r === "object") {
            const c: any =  r;
            r = c.r;
            g = c.g;
            b = c.b;
            a = c.a;
        }
        const mr = r as number;
        return {r: mr, g, b , a};
    }
    public static rgbToHex(r: number, g: number, b: number, allow3Char?: boolean) {
        const hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16)),
        ];
        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) === hex[0].charAt(1) &&
             hex[1].charAt(0) === hex[1].charAt(1) && hex[2].charAt(0) === hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join("");
    }
    public static toHex(r: number, g: number, b: number, allow3Char?: boolean) {
        return ColorUtils.rgbToHex(r, g, b, allow3Char);
    }
    public static toHexString(r: number, g: number, b: number, allow3Char?: boolean) {
        return "#" + ColorUtils.toHex(r, g, b, allow3Char);
    }

    public static toHSL(r: number | string, g?: number, b?: number , a?: number) {
        const rgb = ColorUtils.toRGB(r, g, b);
        const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a };
    }

    public static rgbToHsl(r: number, g?: number, b?: number) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        // tslint:disable:one-variable-per-declaration
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        }   else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h, s, l };
    }

    public static getLuminance(r: number | string, g?: number, b?: number) {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        const rgb = ColorUtils.toRGB(r, g, b);
        // tslint:disable-next-line:one-variable-per-declaration
        let RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92; } else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4); }
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92; } else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4); }
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92; } else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4); }
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    }

    public static isDark(r: number | string, g?: number, b?: number): boolean {
        return ColorUtils.getBrightness(r, g, b) < 128;
    }
    public static isLight(r: number | string, g?: number, b?: number): boolean {
        return ColorUtils.getBrightness(r, g, b) > 128;
    }

    public static desaturate(r: number | string, g?: number, b?: number, amount?: number) {
        amount = (amount === 0) ? 0 : (amount || 10);
        const hsl = ColorUtils.toHSL(r, g, b);
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return hsl;
    }

    public static saturate(r: number | string, g?: number, b?: number, amount?: number) {
        amount = (amount === 0) ? 0 : (amount || 10);
        const hsl = ColorUtils.toHSL(r, g, b);
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return hsl;
    }

    public static lighten(r: number | string, g?: number, b?: number, amount?: number) {
        amount = (amount === 0) ? 0 : (amount || 10);
        const hsl = ColorUtils.toHSL(r, g, b);
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return hsl;
    }

    public static brighten(r: number | string, g?: number, b?: number, amount?: number) {
        amount = (amount === 0) ? 0 : (amount || 10);
        const rgb = ColorUtils.toRGB(r, g, b);
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * - (amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * - (amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * - (amount / 100))));
        return rgb;
    }

    public static darken(r: number | string, g?: number, b?: number, amount?: number) {
        amount = (amount === 0) ? 0 : (amount || 10);
        const hsl = ColorUtils.toHSL(r, g, b);
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return hsl;
    }

    public static overlayColor(color: string , lightColor?: string, darkColor?: string) {
        // if only first half of color is defined, repeat it
        if (color.length < 5) {
            color += color.slice(1);
        }
        return parseFloat((color.replace("#", "0x"))) > (0xffffff / 2) ? darkColor || "#333" : lightColor || "#fff";
    }
}
