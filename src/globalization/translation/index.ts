export interface LocaleLanguage {
    [name: string]: LocaleData;
}

export interface LocaleData {
    [name: string]: string | LocaleDataOptions;
}

export interface LocaleDataOptions {
    value: string;
    plural?: string;
}

export interface TranslateOptions {
    plural?: boolean;
}

export interface TranslatorOptions {
    locales?: LocaleLanguage;
    defaultLocale?: string;
    globalLocaleKey?: string;
}

export class Translator {
    private static localeData: LocaleLanguage;
    private static activeLocale: string;
    private static activeOptions: TranslatorOptions;
    public static configure(options: TranslatorOptions) {
        Translator.activeOptions = options || {};
        Translator.activeOptions.defaultLocale = Translator.activeOptions.defaultLocale || 'global';
        Translator.activeOptions.globalLocaleKey = Translator.activeOptions.globalLocaleKey || 'global';
        Translator.localeData = options.locales || {};
        Translator.activeLocale = Translator.activeLocale || Translator.activeOptions.defaultLocale;
    }

    public static setActiveLocale(locale: string) {
        Translator.activeLocale = locale;
    }
    public static setLocaleData(locale: string, data: LocaleData) {
        Translator.localeData[locale] = data;
    }

    public static translate(key: string, options?: TranslateOptions): string;
    public static translate(key: string, locale?: string, options?: TranslateOptions): string;
    public static translate(key: string, locale?: string | TranslateOptions, options?: TranslateOptions) {
        const localeData = Translator.localeData;
        const activeLocale = typeof locale === 'string' ? locale || Translator.activeLocale : Translator.activeLocale;
        if (!localeData || !localeData[activeLocale] || !localeData.global) {
            return key;
        }
        const ld = localeData[activeLocale || 'global'];
        const settings = typeof locale === 'object' ? (locale as TranslateOptions) : options;

        return ld[key] || key;
    }
}

export const t = Translator.translate;
export const translate = t;
