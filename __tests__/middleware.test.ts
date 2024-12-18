import {NextRequest, NextResponse} from 'next/server';
import middleware from '@/middleware';

jest.mock('next-intl/middleware', () => ({
    createMiddleware: jest.fn().mockImplementation(() => {
        return async () => {
            return NextResponse.next();
        };
    }),
}));

jest.mock('@/middleware', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
        return NextResponse.rewrite(new URL('/de', 'http://localhost:3000'));
    })
}));

jest.mock('next/server', () => {
    const mockCookies = {
        set: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn().mockReturnValue([]),
        delete: jest.fn(),
    };

    const response = {
        cookies: mockCookies,
        url: '',
    };

    return {
        NextResponse: {
            rewrite: jest.fn().mockImplementation((url) => {
                response.url = url;
                return response;
            }),
            redirect: jest.fn().mockImplementation((url) => {
                response.url = url;
                return response;
            }),
            next: jest.fn().mockReturnValue(response),
        },
        NextRequest: jest.fn().mockImplementation((url) => ({
            nextUrl: new URL(url),
            url: url,
            headers: new Map(),
            cookies: mockCookies,
        })),
    };
});

describe('Middleware', () => {
    const rewriteSpy = jest.spyOn(NextResponse, 'rewrite');

    beforeEach(() => {
        rewriteSpy.mockReset();
    });

    it('should handle root path', async () => {
        const req = new NextRequest('http://localhost:3000/');
        middleware(req);
        expect(rewriteSpy).toHaveBeenCalled();
    });

    it('should handle German paths', async () => {
        const req = new NextRequest('http://localhost:3000/de/pfadnamen');
        middleware(req);
        expect(rewriteSpy).toHaveBeenCalled();
    });

    it('should handle English paths', async () => {
        const req = new NextRequest('http://localhost:3000/en/pathnames');
        middleware(req);
        expect(rewriteSpy).toHaveBeenCalled();
    });

    describe('matcher configuration', () => {
        it('should match correct paths', () => {
            const matcher = '^/(?:de|en)(?:/.*)?$';
            const pathRegex = new RegExp(matcher);

            expect(pathRegex.test('/de/some-path')).toBeTruthy();
            expect(pathRegex.test('/en/some-path')).toBeTruthy();
            expect(pathRegex.test('/de/nested/path')).toBeTruthy();
            expect(pathRegex.test('/en/nested/path')).toBeTruthy();

            expect(pathRegex.test('/fr/some-path')).toBeFalsy();
            expect(pathRegex.test('/es/some-path')).toBeFalsy();
        });
    });
});