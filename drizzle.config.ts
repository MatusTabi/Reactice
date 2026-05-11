import { config as loadEnv } from 'dotenv';
import type { Config } from 'drizzle-kit';

loadEnv({ path: '.env.local' });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
	throw new Error('Missing TURSO_DATABASE_URL. Set it in .env.local');
}

export default {
	schema: './src/db/schema',
	out: './drizzle',
	dialect: 'turso',
	dbCredentials: {
		url,
		authToken
	}
} satisfies Config;
