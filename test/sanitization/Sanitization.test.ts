import "jest";
import { HtmlSanitizer, Sanitization } from "../../src/sanitization/index";
import { authorize } from "../../src/security/index";
import { JsonSchemaDefinition } from "../../src/utils/index";
import { isEmail, isMobile, isPhone, isRequired, isUrl } from "../../src/validation/index";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
// jest.resetAllMocks();

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {
    // repo.clear();

});

afterAll(() => { });

afterEach(() => { });

describe("Sanitization", async () => {
    describe("HtmlSanitizer", async () => {
        it("checks html sanitization return passed string.", async () => {
            expect.assertions(1);
            const value = "<ul><li>hel<span>ddd</span>lo</li></ul>";
            Sanitization.define("htmlSanitizer", new HtmlSanitizer());

            const result = await Sanitization.sanitize(value, "htmlSanitizer");
            expect(result).toEqual(value);

        });

        it("checks html sanitization special tags return passed string.", async () => {
            expect.assertions(1);
            const value = "<ul><li>hel<span>lili</span>lo</li></ul>";
            Sanitization.define("htmlSanitizer", new HtmlSanitizer({ AllowedTags: ["ul", "li", "span"] }));

            const result = await Sanitization.sanitize(value, "htmlSanitizer");
            expect(result).toEqual(value);

        });

        it("checks html sanitization special tags return empty string.", async () => {
            expect.assertions(1);
            const value = "<ul><li>hel<span>lili</span>lo</li></ul>";
            Sanitization.define("htmlSanitizer", new HtmlSanitizer({ AllowedTags: ["post"] }));

            const result = await Sanitization.sanitize(value, "htmlSanitizer");
            expect(result).toEqual("");

        });

        it("checks html attributes sanitization return passed string.", async () => {
            expect.assertions(1);
            const value = '<ul id="menu1" name="name1"><li>hel<span>ddd</span>lo</li></ul>';
            Sanitization.define("htmlSanitizer", new HtmlSanitizer());

            const result = await Sanitization.sanitize(value, "htmlSanitizer");
            expect(result).toEqual('<ul id="menu1" name="name1" ><li>hel<span>ddd</span>lo</li></ul>');

        });

        it("checks html sanitization remove", async () => {
            expect.assertions(1);
            const value = "<ul><li>hel<span>ddd</span>lo</li></ul>";
            Sanitization.define("htmlSanitizer", new HtmlSanitizer());

            const actual = Sanitization.remove("htmlSanitizer");
            expect(actual).toEqual(true);

        });

        it("checks html sanitization contains", async () => {
            expect.assertions(2);
            const value = "<ul><li>hel<span>ddd</span>lo</li></ul>";
            const snt = new HtmlSanitizer();
            const actualName = snt.Name;
            Sanitization.define("htmlSanitizer", snt);

            const actual = Sanitization.contains("htmlSanitizer");
            expect(actualName).toEqual("HtmlSanitizer");
            expect(actual).toEqual(true);

        });
    });
});
