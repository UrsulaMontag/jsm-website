import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import LocaleSwitcherSelect from "@/app/components/base/header/LocaleSwitcherSelect";
import {useRouter, usePathname} from "@/i18n/routing";
import {useParams} from "next/navigation";
import {useTransition} from "react";


jest.mock('@/i18n/routing', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useTransition: jest.fn(),
}));

describe("LocaleSwitcherSelect", () => {
    const mockUseRouter = useRouter as jest.Mock;
    const mockUsePathname = usePathname as jest.Mock;
    const mockUseParams = useParams as jest.Mock;
    const mockUseTransition = useTransition as jest.Mock;


    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            replace: jest.fn(),
        });
        mockUsePathname.mockReturnValue('/current-path');
        mockUseParams.mockReturnValue({});
        mockUseTransition.mockReturnValue([false, (callback: () => void) => callback()]);

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders with default value and label", () => {
        render(
            <LocaleSwitcherSelect defaultValue="en" label="Select Language">
                <option value="en">English</option>
                <option value="de">German</option>
            </LocaleSwitcherSelect>
        );

        expect(screen.getByText("Select Language")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveValue("en");
    });

    it("displays all children options", () => {
        render(
            <LocaleSwitcherSelect defaultValue="en" label="Select Language">
                <option value="en">English</option>
                <option value="de">German</option>
            </LocaleSwitcherSelect>
        );

        expect(screen.getByRole("option", {name: "English"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "German"})).toBeInTheDocument();
    });

    it("calls router.replace with the correct locale on change", () => {
        const mockReplace = jest.fn();
        mockUseRouter.mockReturnValue({replace: mockReplace});

        render(
            <LocaleSwitcherSelect defaultValue="en" label="Select Language">
                <option value="en">English</option>
                <option value="de">German</option>
            </LocaleSwitcherSelect>
        );

        fireEvent.change(screen.getByRole("combobox"), {target: {value: "de"}});

        expect(mockReplace).toHaveBeenCalledWith(
            {pathname: '/current-path', params: {}},
            {locale: "de"}
        );
    });

    it("disables the select element when isPending is true", () => {
        mockUseTransition.mockReturnValue([true, jest.fn()]);

        render(
            <LocaleSwitcherSelect defaultValue="en" label="Select Language">
                <option value="en">English</option>
                <option value="de">German</option>
            </LocaleSwitcherSelect>
        );

        expect(screen.getByRole("combobox")).toBeDisabled();
    });
});