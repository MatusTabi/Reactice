import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Session {
		user: DefaultSession['user'] & {
			id: string;
		};
	}
}

import { authConfig } from '@/auth.config';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';
import { db } from '@/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	providers: [GitHub],
	session: { strategy: 'jwt' },
	callbacks: {
		...authConfig.callbacks,
		jwt: ({ token, user }) => {
			// Persist the user id inside the JWT on first sign-in
			if (user?.id) token.id = user.id;
			return token;
		},
		session: ({ session, token }) => {
			// Expose the id on the session object for server-side use
			if (token.id && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		}
	}
});
