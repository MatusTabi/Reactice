import {
	integer,
	primaryKey,
	sqliteTable,
	text
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccountType } from 'next-auth/adapters';

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
export const users = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	seqId: integer('seq_id').unique(),
	name: text('name'),
	email: text('email').unique().notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
});

// ---------------------------------------------------------------------------
// Accounts  (OAuth provider links)
// ---------------------------------------------------------------------------
export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	account => [
		primaryKey({ columns: [account.provider, account.providerAccountId] })
	]
);

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------
export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

// ---------------------------------------------------------------------------
// Verification tokens  (e-mail magic-link / OTP)
// ---------------------------------------------------------------------------
export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	vt => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ---------------------------------------------------------------------------
// Inferred types (re-exported for use across the app)
// ---------------------------------------------------------------------------
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
