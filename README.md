# Reactice

Next.js app with Auth.js + Drizzle + Turso.

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill `.env.local`:

```env
TURSO_DATABASE_URL="libsql://<your-db>.<region>.turso.io"
TURSO_AUTH_TOKEN="<your-turso-token>"

AUTH_SECRET="<your-auth-secret>"
AUTH_GITHUB_ID="<your-github-client-id>"
AUTH_GITHUB_SECRET="<your-github-client-secret>"

OPENROUTER_API_KEY="<your-openrouter-key>"
```

Generate `AUTH_SECRET`:

```bash
npx auth secret
```

Set GitHub OAuth (local):

- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/auth/callback/github

Push schema:

```bash
npm run db:push
```

## Run

```bash
npm run dev
```

Open: http://localhost:3000

## Useful commands

```bash
npm run build
npm run start
npm run lint
npm run db:push
npm run db:studio
```

## Security

- Do not commit `.env.local`.
- Rotate any leaked secrets immediately.
