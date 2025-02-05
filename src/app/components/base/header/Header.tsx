"use client";

import {useState} from "react";
import {FaBars} from "react-icons/fa";
import LanguageSwitcher from "@/app/components/base/header/LanguageSwitcher";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {body} from "../../../../../styles/fonts";


export default function Header() {
    const t = useTranslations("Header");
    const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };
    const navItems = [
        {path: '/' as const, key: 'home'},
        {path: '/the-house' as const, key: 'theHouse'},
        {path: '/gallery' as const, key: 'gallery'},
        {path: '/activities' as const, key: 'activities'},
        {path: '/contact' as const, key: 'contact'}
    ] as const;

    return (
        <header role="banner"
                className="bg-neutral-beige/95 dark:bg-dark-bg/95 w-full min-h-[7vh] p-2 sticky top-0 z-30 flex items-center justify-between backdrop-blur-sm border-b border-sunset-orange/10 dark:border-dark-highlight/10">
            <div className="nav_logo pl-3">
                <Link href="/"
                      className="text-lg font-semibold text-lake-blue dark:text-dark-text hover:text-sunset-orange dark:hover:text-dark-highlight transition-colors">
                    <h2 className={`${body.className}`}>{t("logo")}</h2>
                </Link>
            </div>

            {/* Navigation Container */}
            <nav className="flex items-center space-x-6">
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 text-lake-blue dark:text-dark-text">
                    {navItems.map(({path, key}) => (
                        <Link
                            key={key}
                            href={path}
                            className="hover:text-sunset-orange dark:hover:text-dark-highlight transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sunset-orange dark:after:bg-dark-highlight after:transition-all hover:after:w-full"
                        >
                            {t(`nav.${key}`)}
                        </Link>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    {/* Mobile Menu Content */}
                    <div
                        className={`absolute top-full left-0 right-0 bg-neutral-beige/95 dark:bg-dark-bg/95 backdrop-blur-sm ${isToggleOpen ? 'block' : 'hidden'}`}>
                        <ul className="space-y-4 p-4 text-center">
                            {navItems.map(({path, key}) => (
                                <li key={key}>
                                    <Link
                                        href={path}
                                        onClick={handleToggleOpen}
                                        className="block py-2 text-sunset-orange dark:text-dark-highlight hover:text-lake-blue dark:hover:text-dark-text transition-colors"
                                    >
                                        {t(`nav.${key}`)}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4 justify-center">
                                <LanguageSwitcher
                                    aria-label="Mobile language switcher"
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Language Switcher (Desktop) */}
                <div className="hidden sm:flex">
                    <LanguageSwitcher aria-label="Language switcher"/>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    data-testid="menu-button"
                    aria-label="Toggle menu"
                    aria-expanded={isToggleOpen}
                    className="md:hidden text-sunset-orange dark:text-dark-highlight"
                    onClick={handleToggleOpen}
                >
                    <FaBars className="text-3xl"/>
                </button>
            </nav>
        </header>
    );
}