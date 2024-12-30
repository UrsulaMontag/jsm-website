"use client";

import {useState} from "react";
import {FaBars} from "react-icons/fa";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/base/header/LanguageSwitcher";
import {useTranslations} from "next-intl";


export default function Header() {
    const t = useTranslations("Header");
    const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };
    return (
        <header role="banner"
                className="bg-light-bg w-screen min-h-[7vh] p-2 sticky top-0 z-10 flex items-center justify-between">
            <div className="nav_logo px-3">
                <Link href="/public" className=" text-lg font-semibold">
                    <h1>{t("logo")}</h1>
                </Link>
            </div>
            <LanguageSwitcher/>
            <ul
                className={`list-none flex md:flex-row  text-white ${isToggleOpen ? "block" : "hidden"
                } md:block`}
            >
                <li className="hover:bg-blue-400 p-2 rounded">
                    <Link href="/public" className="text-white">
                        {t("nav.home")}
                    </Link>
                </li>
                <li className="hover:bg-blue-400 p-2 rounded">
                    <Link href="/about" className="text-white">
                        {t("nav.about")}
                    </Link>
                </li>
            </ul>

            <button
                data-testid="menu-button"
                aria-label="Toggle menu"
                aria-expanded={isToggleOpen}
                className="md:hidden"
                onClick={handleToggleOpen}
            >
                <FaBars
                    className="text-white text-3xl absolute right-5 top-4 cursor-pointer"
                />
            </button>
        </header>
    );
}