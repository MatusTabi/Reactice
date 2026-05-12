# Reactice

Next.js app with Auth.js + Drizzle + Turso + SandPack and the others

Reactice is a React component practice platform where users choose pre-made UI components (e.g., header, card, navbar) filterable by criteria such as difficulty and rebuild them in an integrated editor. The interface features a split-screen mode with a live preview of the user's solution alongside a reference design. Upon submission, the backend uses AI to evaluate accuracy against the official solution, awarding a percentage score, points, and specific feedback on visual differences. Users can also create their own component challenges for others and track their status on a global leaderboard, including stats like components finished, challenges created, and average points earned.

Users can:

Solve frontend coding challenges
Edit React/TypeScript code in-browser
See live preview updates instantly
Compare against a target design
View runtime console output
Submit solutions for AI evaluation
Compare themselfts with the other
Create custom challenges

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill `.env.local`:

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