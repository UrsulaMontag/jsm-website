import createMiddleware from "next-intl/middleware";
import {routing} from "@/i18n/routing";
import {NextRequest} from 'next/server';


const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Bypass static files
    if (request.nextUrl.pathname.startsWith('/_next')) {
        return intlMiddleware(request);
    }

    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const pathLocale = request.nextUrl.pathname.split('/')[1];

    if (cookieLocale && cookieLocale !== pathLocale) {
        const newUrl = new URL(`/${cookieLocale}${request.nextUrl.pathname}`, request.url);
        return Response.redirect(newUrl);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
        '/',
        '/(de|en)/:path*'
    ]
};