import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { sql } from 'drizzle-orm';
import NextAuth, { type DefaultSession } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Session {
		user: DefaultSession['user'] & {
			id: string;
			seqId: number;
		};
	}
}

import { authConfig } from '@/auth.config';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';
import { db } from '@/lib/db';

const baseAdapter = DrizzleAdapter(db, {
	usersTable: users,
	accountsTable: accounts,
	sessionsTable: sessions,
	verificationTokensTable: verificationTokens
}) as Adapter;

const adapter: Adapter = {
	...baseAdapter,
	createUser: async data => {
		const [{ nextSeqId }] = await db
			.select({ nextSeqId: sql<number>`COALESCE(MAX(seq_id), 0) + 1` })
			.from(users);

		const [user] = await db
			.insert(users)
			.values({ ...data, id: crypto.randomUUID(), seqId: nextSeqId })
			.returning();

		return user;
	}
};

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	adapter,
	providers: [GitHub],
	session: { strategy: 'jwt' },
	callbacks: {
		...authConfig.callbacks,
		jwt: ({ token, user }) => {
			if (user?.id) token.id = user.id;
			if ((user as typeof user & { seqId?: number })?.seqId) {
				token.seqId = (user as typeof user & { seqId?: number }).seqId;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token.id && session.user) {
				session.user.id = token.id as string;
			}
			if (token.seqId && session.user) {
				session.user.seqId = token.seqId as number;
			}
			return session;
		}
	}
});
