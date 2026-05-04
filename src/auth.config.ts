import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible Auth.js config.
 * No DB imports — safe to use in Next.js middleware (Edge Runtime).
 * Providers are intentionally empty here; they are declared in src/auth.ts.
 */
export const authConfig = {
	trustHost: true,
	providers: [],
	pages: {
		signIn: '/sign-in'
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const { pathname } = nextUrl;
			const isLoggedIn = !!auth?.user;
			const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
			const isAuthApiRoute = pathname.startsWith('/api/auth');

			if (isAuthApiRoute || isAuthRoute) {
				return true;
			}

			return isLoggedIn;
		}
	}
} satisfies NextAuthConfig;
