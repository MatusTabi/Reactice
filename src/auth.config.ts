import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible Auth.js config.
 * No DB imports — safe to use in Next.js middleware (Edge Runtime).
 * Providers are intentionally empty here; they are declared in src/auth.ts.
 */
export const authConfig = {
	providers: [],
	pages: {
		signIn: '/sign-in'
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;
			const isOnApp = nextUrl.pathname.startsWith('/app');

			if (isOnApp) {
				return isLoggedIn;
			}

			return true;
		}
	}
} satisfies NextAuthConfig;
