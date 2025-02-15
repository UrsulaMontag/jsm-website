import {ChangeEvent, ReactNode, useTransition} from "react";
import {Locale, usePathname, useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";

type Props = {
    children: ReactNode;
    defaultValue: string;
    label: string;
}

export default function LocaleSwitcherSelect({children, defaultValue, label}: Readonly<Props>) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams()
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value as Locale;
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                {pathname, params},
                {locale: nextLocale}
            );
        });
    }

    return (
        <label className={`relative ${isPending ? 'transition-opacity [&:disabled]:opacity-30' : ''}`}>
            <p className="sr-only">{label}</p>
            <select className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
                    defaultValue={defaultValue}
                    disabled={isPending}
                    onChange={onSelectChange}>
                {children}</select>
            <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
        </label>
    )
}