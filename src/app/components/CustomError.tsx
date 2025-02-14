'use client';

import {useTranslations} from 'next-intl';

type ErrorProps = {
    error: Error;
    resetAction: () => void;
    locale?: string;
};
export default function CustomError({error, resetAction, locale}: Readonly<ErrorProps>) {
    const t = useTranslations('Error');

    return (
        <div className="min-h-screen bg-neutral-beige dark:bg-dark-bg p-8">
            <h1 className="text-3xl text-lake-blue dark:text-dark-highlight mb-4">
                {t('title')}
            </h1>
            <p className="text-red-600 dark:text-red-400 mb-6">{error.message} {locale && `(Locale: ${locale})`}</p>
            <button
                onClick={resetAction}
                className="bg-sunset-orange text-white px-4 py-2 rounded hover:bg-sunset-orange-dark"
            >
                {t('retry')}
            </button>
        </div>
    );
}