'use client';

import CustomError from '@/app/components/CustomError';
import {useParams} from "next/navigation";
import {Locale} from "@/i18n/routing";

type ErrorProps = {
    error: Error;
    reset: () => void;
};
export default function ClientError({
                                        error,
                                        reset,
                                    }: Readonly<ErrorProps>) {
    const params = useParams();
    const locale = params.locale as Locale;

    return (
        <CustomError error={error} resetAction={reset} locale={locale}/>
    );
}