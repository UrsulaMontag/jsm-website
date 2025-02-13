'use client';

import {useTranslations} from 'next-intl';

type ErrorProps = {
    error: Error;
    reset: () => void;
};
export default function CustomError({error, reset}: Readonly<ErrorProps>) {
    const t = useTranslations('Error');

    return (
        <div>
            <h1>{t('title') + error}</h1>
            <button onClick={reset}>{t('retry')}</button>
        </div>
    );
}