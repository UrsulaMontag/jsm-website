import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageSwitcher from "@/app/components/base/header/LanguageSwitcher";
import {routing} from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {ReactElement} from "react";
import {Locale} from "@/i18n/models/translation";

const mockUsePathname = jest.fn();
const mockUseRouter = jest.fn();
const mockUseParams = jest.fn();

jest.mock('next/navigation', () => ({
    usePathname() {
        return mockUsePathname();
    },
    useRouter() {
        return mockUseRouter();
    },
    useParams() {
        return mockUseParams();
    },
}));

const mockLocales: Readonly<["en", "de"]> = ["en", "de"];
routing.locales = mockLocales;

const messages: Record<Locale, { LanguageSwitcher: { label: string; locale: Record<Locale, string> } }> = {
    en: {LanguageSwitcher: {label: "Change Language", locale: {en: "English", de: "German"}}},
    de: {LanguageSwitcher: {label: "Sprache wechseln", locale: {en: "Englisch", de: "Deutsch"}}},

};

const renderWithProvider = (ui: ReactElement, locale: string) => {
    const selectedMessages = messages[locale as Locale];
    if (!selectedMessages) {
        throw new Error(`No messages found for locale: ${locale}`);
    }
    return render(
        <NextIntlClientProvider locale={locale as Locale} messages={selectedMessages}>
            {ui}
        </NextIntlClientProvider>
    );
};

describe("LanguageSwitcher", () => {
    beforeEach(() => {
        mockUseRouter.mockImplementation(() => ({
            push: jest.fn(),
            replace: jest.fn(),
        }));
        mockUseParams.mockImplementation(() => ({}))
    });

    it("renders correctly with the current locale selected", () => {
        mockUsePathname.mockImplementation(() => '/');
        renderWithProvider(<LanguageSwitcher/>, "en");

        expect(screen.getByText("Change Language")).toBeInTheDocument();

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toHaveValue("en");
    });

    it("displays all supported locales", () => {
        mockUsePathname.mockImplementation(() => '/');
        renderWithProvider(<LanguageSwitcher/>, "en");

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(mockLocales.length);

        expect(screen.getByRole("option", {name: "English"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "German"})).toBeInTheDocument();
    });

    it("changes locale on select", () => {
        mockUsePathname.mockImplementation(() => '/');
        renderWithProvider(<LanguageSwitcher/>, "en");

        const selectElement = screen.getByRole("combobox");

        fireEvent.change(selectElement, {target: {value: "de"}});

        expect(selectElement).toHaveValue("de");
    });


    it("updates the label text on locale change", () => {
        mockUsePathname.mockImplementation(() => '/');
        renderWithProvider(<LanguageSwitcher/>, "en");

        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, {target: {value: "de"}});

        renderWithProvider(<LanguageSwitcher/>, "de");

        expect(selectElement).toHaveValue("de");
        expect(screen.getByRole("option", {name: "Deutsch"})).toBeInTheDocument();

    });

    it("handles unsupported locale gracefully", () => {
        const unsupportedLocale = "fr";
        const fallbackMessages = messages.en;

        render(
            <NextIntlClientProvider locale={unsupportedLocale as Locale} messages={fallbackMessages}>
                <LanguageSwitcher/>
            </NextIntlClientProvider>
        );

        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toHaveValue(unsupportedLocale);

        // Verify that the unsupported locale is rendered in the dropdown
        expect(screen.getByRole("option", {name: unsupportedLocale})).toBeInTheDocument();
    });
});