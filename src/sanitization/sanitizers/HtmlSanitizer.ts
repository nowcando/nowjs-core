
import { SanitizerBase } from "../index";

export interface IAllowedHtmlAttribute {
    [key: string]: string[];
}

export interface IAllowedHtmlClass {
    [key: string]: string[];
}

export interface ITransformHtmlTag {
    [key: string]: ((item: string, attribs?: any) => string) | string;
}

export interface IFilterHtmlTag {
    [key: string]: (item: string, attribs?: any) => boolean;
}

export interface IHtmlSanitizerOptions {
    AllowedTags?: string[];
    AllowedAttributes?: IAllowedHtmlAttribute;
    AllowedClasses?: IAllowedHtmlClass[];
    AllowedSchemes?: string[];
    SelfClosingTags?: string[];
    TransformTags?: ITransformHtmlTag;
    FilterTags?: IFilterHtmlTag | string[];

}

const DEFAULT_ALLOWED_TAGS = ["h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
    "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br", "div",
    "table", "thead", "caption", "tbody", "tr", "th", "td", "pre"];
const DEFAULT_ALLOWED_ATTRIBUTES = {
    a: ["href", "name", "target"],
    // We don't currently allow img itself by default, but this
    // would make sense if we did
    img: ["src"],
};
const DEFAULT_SELFCLOSING = ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"];

const DEFAULT_ALLOWED_SCHEMAS = ["http", "https", "ftp", "mailto"];

const HTML_TAG_REGEX = /^\<.+\>/igm;
const HTML_TAG_ATTRIBUTE_REGEX = /(([a-zA-Z0-9]+)\=\"([a-zA-Z0-9]+)\")+/igm;

export class HtmlSanitizer extends SanitizerBase<IHtmlSanitizerOptions> {

    private tagRegex: RegExp;
    private tagAttrRegex: any;
    constructor(private options?: IHtmlSanitizerOptions) {
        super("HtmlSanitizer");
        this.options = this.options || {};
        this.options.AllowedAttributes = this.options.AllowedAttributes || DEFAULT_ALLOWED_ATTRIBUTES;
        this.options.AllowedTags = this.options.AllowedTags || DEFAULT_ALLOWED_TAGS;
        this.options.AllowedSchemes = this.options.AllowedSchemes || DEFAULT_ALLOWED_SCHEMAS;
        // options.AllowedAttributes =options.AllowedAttributes || DEFAULT_ALLOWED_ATTRIBUTES;
    }
    public sanitize(value: string): Promise<string> {
        if (!value) { return Promise.resolve(value); }

        const allowedTags = (this.options.AllowedTags || DEFAULT_ALLOWED_TAGS).join("|");
        const selfcloseTags = (this.options.SelfClosingTags || DEFAULT_SELFCLOSING).join("|");
        this.tagRegex = new RegExp(`^((\<(${allowedTags
            })\\s*([a-zA-Z0-9\"\=\\s]*\\s*)\>)(.*)\<\/(${allowedTags
            })\\s*\>)|(<!--[\\s\\S]*?-->)|((\<(${selfcloseTags})\\s*\/\>))$`, "gmi");
        if (this.options.AllowedAttributes) {
            this.tagAttrRegex = {};
        }
        // tslint:disable-next-line:forin
        for (const item in this.options.AllowedAttributes) {
            const attrs = this.options.AllowedAttributes[item];
            this.tagAttrRegex[item] = [];
        }
        return Promise.resolve(this.sanitizeInnerText(value, ""));
    }

    private sanitizeInnerText(value: string, parentValue?: string) {
        const results: string[] = [];
        const tags = this.getTagParts(value);
        if (!tags) { return (this.hasTag(value) ? "" : value); } // (parentValue!=="" ? value : "");
        if (tags[3] && tags[3] === tags[6]) {
            let tagst = "";
            if (tags[4]) {
                tagst = `<${tags[3]} ${this.sanitizeTagAttributes(tags[3], tags[4])} >`;
            } else {
                tagst = `<${tags[3]}>`;
            }
            const innerText = this.sanitizeInnerText(tags[5], tags[2]);
            const tagText = `${tagst}${innerText}</${tags[6]}>`;
            results.push(tagText);
        }
        return results.join("");
    }

    private hasTag(value: string): boolean {
        return HTML_TAG_REGEX.test(value);
    }

    private sanitizeTagAttributes(value: string, tag: string) {
        const results: string[] = [];
        HTML_TAG_ATTRIBUTE_REGEX.lastIndex = 0;
        let attrs: any;
        // tslint:disable-next-line:no-conditional-assignment
        while (attrs = this.getTagAttributeParts(value, tag)) {
            results.push(attrs[1]);
        }
        return results.join(" ");
    }

    private getTagAttributeParts(tag: string, value: string) {
        if (this.tagAttrRegex && tag && this.tagAttrRegex[tag]) {
            return this.tagAttrRegex[tag].exec(value);
        } else if (tag && HTML_TAG_ATTRIBUTE_REGEX) {
            return HTML_TAG_ATTRIBUTE_REGEX.exec(value);
        } else {
            return [];
        }
    }

    private getTagParts(value: string) {
        this.tagRegex.lastIndex = 0;
        return this.tagRegex.exec(value);
    }

    private escapeHtml(s: string): string {
        if (typeof (s) !== "string") {
            s = s + "";
        }
        return s.replace(/\&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/\>/g, "&gt;")
        .replace(/\"/g, "&quot;");
    }

}
