import {render, screen} from '@testing-library/react';
import Imprint from '@/app/[locale]/imprint/page';
import {NextIntlClientProvider} from 'next-intl';
import enMessages from '@/../messages/en.json';
import {ReactNode} from 'react';

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => {
        const translations: Record<string, string> = {
            'title': 'Imprint',
            'companyInfo': 'Company Information',
            'companyName': 'Test Company Name',
            'address': 'Test Address',
            'contact': 'Contact Information',
            'legalInfo': 'Legal Information',
            'legalDetails': 'Legal Details'
        };
        return translations[key] || key;
    },
    NextIntlClientProvider: ({children}: { children: ReactNode }) => <>{children}</>
}));

describe('Imprint Page', () => {
    const renderImprint = () => {
        return render(
            <NextIntlClientProvider locale="en" messages={enMessages}>
                <Imprint/>
            </NextIntlClientProvider>
        );
    };

    it('renders the imprint page with correct heading', () => {
        renderImprint();
        expect(screen.getByRole('heading', {name: 'Imprint', level: 1})).toBeInTheDocument();
    });

    it('renders company information section', () => {
        renderImprint();

        expect(screen.getByRole('heading', {name: 'Company Information', level: 2})).toBeInTheDocument();
        expect(screen.getByText('Test Company Name')).toBeInTheDocument();
        expect(screen.getByText('Test Address')).toBeInTheDocument();
        expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });

    it('renders legal information section', () => {
        renderImprint();

        expect(screen.getByRole('heading', {name: 'Legal Information', level: 2})).toBeInTheDocument();
        expect(screen.getByText('Legal Details')).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        renderImprint();

        expect(screen.getByLabelText('Company Information')).toBeInTheDocument();
        expect(screen.getByLabelText('Legal Information')).toBeInTheDocument();

        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});