import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
    loginPage: "/api/auth/login",
    isReturnToCurrentPage: true,
})

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|about|privacypolicy|termsofservice|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
    ],
}