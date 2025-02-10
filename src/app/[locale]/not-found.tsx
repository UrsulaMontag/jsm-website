import {Link} from "@/i18n/routing";

export default function NotFound() {

    return (
        <section
            className=" flex flex-col items-center justify-center h-screen bg-neutral-beige dark:bg-dark-bg z-10">
            <h1 className="text-5xl font-bold text-lake-blue dark:text-dark-highlight mb-8">Page Not Found</h1>
            <p className="text-lg text-center mb-6">The page you are looking for does not exist.</p>
            <p className="text-lg text-center mb-8">This page will be available soon.</p>

            {/* Link back to homepage or other useful page */}
            <Link href="/" aria-label="Go back to the homepage"
                  className="inline-block bg-sunset-orange hover:bg-sunset-orange-dark text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:shadow-xl">
                Go back to the homepage
            </Link>
        </section>
    );
}
