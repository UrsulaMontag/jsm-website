"use client";

import {useState} from "react";
import {FaBars} from "react-icons/fa";
import LanguageSwitcher from "@/app/components/base/header/LanguageSwitcher";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";


export default function Header() {
    const t = useTranslations("Header");
    const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };
    return (
        <header role="banner"
                className="bg-light-bg dark:bg-dark-bg w-full min-h-[7vh] p-2 sticky top-0 z-10 flex items-center justify-between">
            <div className="nav_logo pl-3">
                <Link href="/" className="text-lg font-semibold">
                    <h2>{t("logo")}</h2>
                </Link>
            </div>

            <div className="hidden sm:flex">
                <LanguageSwitcher/>
            </div>
            <button
                data-testid="menu-button"
                aria-label="Toggle menu"
                aria-expanded={isToggleOpen}
                className="md:hidden"
                onClick={handleToggleOpen}
            >
                <FaBars
                    className={`${isToggleOpen ? "hidden" : "block"} text-light-text dark:text-dark-text text-3xl absolute right-5 top-4 cursor-pointer`}
                />
            </button>
            <ul
                className={`list-none  text-secondary-light ${isToggleOpen ? "block" : "hidden"
                } md:block`}
            >
                <li className="hover:bg-blue-400 p-2 rounded text-secondary-light dark:text-secondary-dark">
                    <Link href="/" onClick={handleToggleOpen}>
                        {t("nav.home")}
                    </Link>
                </li>
                <li className="hover:bg-blue-400 p-2 rounded text-secondary-light dark:text-secondary-dark">
                    <Link href="/about" onClick={handleToggleOpen}>
                        {t("nav.about")}
                    </Link>
                </li>
                <li className="p-2 rounded flex sm:hidden">
                    <LanguageSwitcher/>
                </li>
            </ul>
        </header>
    );
}