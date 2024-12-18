import getRequestConfig from "@/i18n/request";
import {GetRequestConfigParams, RequestConfig} from "next-intl/server";

jest.mock("next-intl/server", () => ({
    getRequestConfig: (
        handler: (params: GetRequestConfigParams) => RequestConfig | Promise<RequestConfig>
    ) => (params: GetRequestConfigParams) => handler(params)
}));

jest.mock("@/i18n/routing", () => ({
    routing: {
        locales: ["en", "de"],
        defaultLocale: "en",
    },
}));

jest.mock("../../messages/en.json", () => ({default: {welcome: "Welcome"}}), {
    virtual: true,
});

jest.mock("../../messages/de.json", () => ({default: {welcome: "Willkommen"}}), {
    virtual: true,
});

describe("getRequestConfig", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the correct config for a valid locale", async () => {
        const mockRequestLocale = Promise.resolve("de");


        const config = await getRequestConfig({
            locale: "de",
            requestLocale: mockRequestLocale
        })
        expect(config).toEqual({
            locale: "de",
            messages: {
                default:
                    {
                        welcome: "Willkommen"
                    }
            },
        });
    });

    it("returns the default locale when the locale is invalid", async () => {
        const mockRequestLocale = Promise.resolve("fr");

        const config = await getRequestConfig(
            {
                locale: "fr",
                requestLocale: mockRequestLocale
            }
        );

        expect(config).toEqual({
            locale: "en",
            messages: {default: {welcome: "Welcome"}},
        });
    });

    it("returns the default locale when no locale is provided", async () => {
        const mockRequestLocale = Promise.resolve(undefined);

        const config = await getRequestConfig({
            locale: "undefined",
            requestLocale: mockRequestLocale
        });

        expect(config).toEqual({
            locale: "en",
            messages: {
                default:
                    {
                        welcome: "Welcome"
                    }
            },
        });
    });
});
