"use client";

import {useState} from "react";
import {FaBars} from "react-icons/fa";
import LanguageSwitcher from "@/app/components/base/header/LanguageSwitcher";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {body} from "@/../../styles/fonts";


export default function Header() {
    const t = useTranslations("Header");
    const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };
    return (
        <header role="banner"
                className="bg-neutral-beige dark:bg-dark-bg w-full min-h-[7vh] p-2 sticky top-0 z-30 flex items-center justify-between">
            {/* Logo */}
            <div className="nav_logo pl-3">
                <Link href="/" className="text-lg font-semibold text-lake-blue dark:text-dark-text">
                    <h2 className={`${body.className}`}>{t("logo")}</h2>
                </Link>
            </div>

            {/* Mobile Navigation Links */}
            <nav>
                <ul className={`md:hidden space-y-2 mt-2 text-sunset-orange dark:text-dark-highlight ${isToggleOpen ? 'block' : 'hidden'}`}>
                    <li><Link href="/" onClick={handleToggleOpen}>{t("nav.home")}</Link></li>
                    <li><Link href="/the-house" onClick={handleToggleOpen}>{t("nav.theHouse")}</Link></li>
                    <li><Link href="/gallery" onClick={handleToggleOpen}>{t("nav.gallery")}</Link></li>
                    <li><Link href="/activities" onClick={handleToggleOpen}>{t("nav.activities")}</Link></li>
                    <li><Link href="/contact" onClick={handleToggleOpen}>{t("nav.contact")}</Link></li>
                    <li>
                        <LanguageSwitcher aria-label="Language switcher"/>
                    </li>
                </ul>
            </nav>

            {/* Navigation Links (Desktop Only) */}
            <nav className="hidden md:flex space-x-4 text-lake-blue dark:text-dark-text">
                <Link href="/">{t("nav.home")}</Link>
                <Link href="/the-house">{t("nav.theHouse")}</Link>
                <Link href="/gallery">{t("nav.gallery")}</Link>
                <Link href="/activities">{t("nav.activities")}</Link>
                <Link href="/contact">{t("nav.contact")}</Link>
            </nav>

            {/* Language Switcher */}
            <div className="hidden sm:flex">
                <LanguageSwitcher
                    aria-label="Language switcher"
                />
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
                data-testid="menu-button"
                aria-label="Toggle menu"
                aria-expanded={isToggleOpen}
                className="md:hidden text-sunset-orange dark:text-dark-highlight"
                onClick={handleToggleOpen}
            >
                <FaBars className="text-3xl"/>
            </button>
        </header>
    );
}