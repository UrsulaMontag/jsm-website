import {useTranslations} from 'next-intl';
import {FaWater, FaTree, FaSpa, FaCar, FaSun, FaDog} from 'react-icons/fa'; // Icons for highlights

export default function Highlights() {
    const t = useTranslations('HomePage.highlights');

    const features = [
        {
            icon: <FaWater className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('jetty.title'),
            label: t('jetty.title'),
            description: t('jetty.description'),
        },
        {
            icon: <FaTree className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('garden.title'),
            label: t('garden.title'),
            description: t('garden.description'),
        },
        {
            icon: <FaSpa className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('sauna.title'),
            label: t('sauna.title'),
            description: t('sauna.description'),
        },
        {
            icon: <FaCar className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('parking.title'),
            label: t('parking.title'),
            description: t('parking.description'),
        },
        {
            icon: <FaSun className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('sunsets.title'),
            label: t('sunsets.title'),
            description: t('sunsets.description'),
        },
        {
            icon: <FaDog className="text-sunset-orange dark:text-dark-highlight text-4xl"/>,
            title: t('pets.title'),
            label: t('pets.title'),
            description: t('pets.description'),
        },
    ];

    return (
        <section
            aria-labelledby="highlights-heading"
            className="py-20 bg-neutral-beige dark:bg-dark-bg"
        >
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="lg:order-2 text-center lg:text-left space-y-6">
                        <h2
                            id="highlights-heading"
                            className="text-4xl md:text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-4 bg-clip-text bg-gradient-to-r from-sunset-orange to-lake-blue dark:from-amber-glow dark:to-dark-highlight"
                        >
                            {t('title')}
                        </h2>
                        <p className="text-lg md:text-xl text-lake-blue dark:text-dark-text mb-6 leading-relaxed">
                            {t('description')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:order-1">
                        {features.map((feature) => (
                            <div key={feature.label} className="flex flex-col items-center text-center space-y-4">
                                <div
                                    className="bg-white dark:bg-dark-bg shadow-lg rounded-2xl p-6 flex items-center justify-center hover:shadow-xl transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <div className="w-12 h-1 bg-sunset-orange dark:bg-dark-highlight mb-2 rounded-full"/>
                                <p className="text-lg font-semibold text-dark-highlight">
                                    {feature.label}
                                </p>
                                <p className="text-sm text-lake-blue dark:text-dark-text">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
