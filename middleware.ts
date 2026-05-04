import NextAuth from 'next-auth';

import { authConfig } from '@/auth.config';

/**
 * Middleware runs on the Edge Runtime.
 * It uses the lightweight authConfig (no DB) to protect routes.
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
	/*
	 * Match all routes except:
	 *   - Next.js internals (_next/static, _next/image)
	 *   - Static assets (favicon, images, fonts)
	 *   - The sign-in page itself (to avoid redirect loops)
	 */
	matcher: ['/((?!_next/static|_next/image|favicon.ico|sign-in).*)']
};
