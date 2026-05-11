/**
 * Seed script — populates the dev DB with sample challenges and submissions
 * so the catalog, dashboard, leaderboard, and profile pages have something
 * to render before real users sign up.
 *
 * Run with: `npm run db:seed`
 *
 * Behavior:
 *   1. Wipes only seed-owned data (matched by fixed seed user IDs) — real
 *      GitHub-OAuth users and any challenges/submissions they create are
 *      left untouched.
 *   2. Inserts a fixed "seed creator" user that owns all sample challenges.
 *   3. Inserts 6 challenges (mixed difficulty + category) with Sandpack-
 *      ready /App.tsx reference code.
 *   4. Inserts 3 fake learner users and 8 submissions across them so the
 *      leaderboard has a deterministic ordering: Alice > Bob > Carol.
 *
 * Requires .env.local with TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.
 * The category column is added automatically if missing (db:push not required).
 */

import { createClient } from '@libsql/client';
import { inArray } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from '../src/db/schema';
import {
	challengeFiles,
	challenges,
	submissions,
	users
} from '../src/db/schema';

// Fixed UUIDs so re-runs target the same rows. Format kept UUID-shaped so
// it round-trips through any code that expects v4.
const SEED_USER_IDS = {
	creator: '00000000-0000-4000-8000-000000000001',
	alice: '00000000-0000-4000-8000-000000000002',
	bob: '00000000-0000-4000-8000-000000000003',
	carol: '00000000-0000-4000-8000-000000000004'
} as const;

const SEED_USER_ID_LIST = Object.values(SEED_USER_IDS);

// Categories mirror the catalog UI's filter list. Keep in sync with frontend.
type ChallengeSeed = {
	title: string;
	description: string;
	difficulty: 'easy' | 'medium' | 'hard';
	category: string;
	files: Array<{ name: string; content: string }>;
};

const CHALLENGE_SEEDS: ChallengeSeed[] = [
	{
		title: 'Button Variants',
		description:
			'Render three buttons side by side: a primary (blue) button, a secondary (outlined) button, and a destructive (red) button. Use Tailwind utility classes.',
		difficulty: 'easy',
		category: 'Buttons',
		files: [
			{
				name: '/App.tsx',
				content: `export default function App() {
	return (
		<div className="flex gap-3 p-8">
			<button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
				Primary
			</button>
			<button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
				Secondary
			</button>
			<button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
				Delete
			</button>
		</div>
	);
}
`
			}
		]
	},
	{
		title: 'Click Counter',
		description:
			'Build a counter with three controls: increment, decrement, and reset. The current value is displayed prominently in the center. Use the useState hook.',
		difficulty: 'easy',
		category: 'UI',
		files: [
			{
				name: '/App.tsx',
				content: `import { useState } from 'react';

export default function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col items-center gap-4 p-8">
			<h1 className="text-4xl font-bold">{count}</h1>
			<div className="flex gap-2">
				<button
					onClick={() => setCount(c => c - 1)}
					className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
				>
					-
				</button>
				<button
					onClick={() => setCount(c => c + 1)}
					className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
				>
					+
				</button>
			</div>
			<button
				onClick={() => setCount(0)}
				className="text-sm text-gray-500 underline"
			>
				Reset
			</button>
		</div>
	);
}
`
			}
		]
	},
	{
		title: 'Profile Card',
		description:
			'Build a centered profile card with an avatar image, name, role, short bio, and a Follow button. Card should have a subtle border, rounded corners, and shadow.',
		difficulty: 'medium',
		category: 'Cards',
		files: [
			{
				name: '/App.tsx',
				content: `export default function App() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-72 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md">
				<img
					src="https://i.pravatar.cc/96?img=12"
					alt="Avatar"
					className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
				/>
				<h2 className="text-lg font-semibold text-gray-900">Jane Doe</h2>
				<p className="text-sm text-gray-500">Frontend Developer</p>
				<p className="mt-3 text-sm text-gray-600">
					Building beautiful UIs one component at a time.
				</p>
				<button className="mt-5 w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
					Follow
				</button>
			</div>
		</div>
	);
}
`
			}
		]
	},
	{
		title: 'Navbar With Active Link',
		description:
			'Build a horizontal navbar with a logo on the left and four links on the right (Home, About, Projects, Contact). Clicking a link sets it as active — the active link is visually distinct (e.g. bold + lighter color).',
		difficulty: 'medium',
		category: 'Navigation',
		files: [
			{
				name: '/App.tsx',
				content: `import { useState } from 'react';

const links = ['Home', 'About', 'Projects', 'Contact'];

export default function App() {
	const [active, setActive] = useState('Home');

	return (
		<nav className="flex items-center justify-between bg-gray-900 px-6 py-4">
			<span className="text-lg font-bold text-white">MyApp</span>
			<ul className="flex gap-6">
				{links.map(link => (
					<li key={link}>
						<button
							onClick={() => setActive(link)}
							className={
								active === link
									? 'text-sm font-medium text-white'
									: 'text-sm text-gray-400 hover:text-white'
							}
						>
							{link}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
`
			}
		]
	},
	{
		title: 'Todo List',
		description:
			'Build a todo list app with an input + Add button, and a list below. Each item has a clickable label (toggles done state with strikethrough) and a Remove button. Enter key in the input also adds. Empty inputs should be ignored.',
		difficulty: 'hard',
		category: 'UI',
		files: [
			{
				name: '/App.tsx',
				content: `import { useState } from 'react';

type Todo = { id: number; text: string; done: boolean };

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState('');

	const add = () => {
		const text = input.trim();
		if (!text) return;
		setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
		setInput('');
	};

	const toggle = (id: number) =>
		setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

	const remove = (id: number) =>
		setTodos(prev => prev.filter(t => t.id !== id));

	return (
		<div className="mx-auto max-w-md p-8">
			<h1 className="mb-6 text-2xl font-bold text-gray-900">Todo List</h1>
			<div className="mb-4 flex gap-2">
				<input
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && add()}
					placeholder="Add a task..."
					className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<button
					onClick={add}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
				>
					Add
				</button>
			</div>
			<ul className="flex flex-col gap-2">
				{todos.map(todo => (
					<li
						key={todo.id}
						className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
					>
						<span
							onClick={() => toggle(todo.id)}
							className={
								todo.done
									? 'cursor-pointer text-sm text-gray-400 line-through select-none'
									: 'cursor-pointer text-sm text-gray-800 select-none'
							}
						>
							{todo.text}
						</span>
						<button
							onClick={() => remove(todo.id)}
							className="text-xs text-red-400 hover:text-red-600"
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
`
			}
		]
	},
	{
		title: 'Login Form',
		description:
			'Build a centered login form with email and password inputs and a submit button. On submit, validate: email must contain "@", password must be at least 8 characters. Display the first validation error above the inputs in a red banner.',
		difficulty: 'hard',
		category: 'Forms',
		files: [
			{
				name: '/App.tsx',
				content: `import { useState, type FormEvent } from 'react';

export default function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email.includes('@')) {
			setError('Enter a valid email address.');
			return;
		}
		if (password.length < 8) {
			setError('Password must be at least 8 characters.');
			return;
		}
		setError('');
		alert('Logged in!');
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-md"
			>
				<h1 className="mb-6 text-2xl font-bold text-gray-900">Sign in</h1>
				{error && (
					<p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
						{error}
					</p>
				)}
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="you@example.com"
					className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<label className="mb-1 block text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					className="mb-6 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<button
					type="submit"
					className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
				>
					Sign in
				</button>
			</form>
		</div>
	);
}
`
			}
		]
	}
];

// Points formula mirrors src/modules/submission/actions.ts.
const POINTS_BY_DIFFICULTY = { easy: 10, medium: 25, hard: 50 } as const;
const computePoints = (
	difficulty: 'easy' | 'medium' | 'hard',
	score: number
): number => Math.round((POINTS_BY_DIFFICULTY[difficulty] * score) / 100);

// Deterministic submission plan — leaderboard order: Alice > Bob > Carol.
// Each entry uses the seed challenge's index (resolved after challenges insert).
type SubmissionSeed = {
	userId: string;
	challengeIndex: number;
	score: number;
	feedback: string;
};

const SUBMISSION_SEEDS: SubmissionSeed[] = [
	// Alice — high performer
	{
		userId: SEED_USER_IDS.alice,
		challengeIndex: 0,
		score: 92,
		feedback: 'Excellent variant coverage and clean Tailwind usage.'
	},
	{
		userId: SEED_USER_IDS.alice,
		challengeIndex: 2,
		score: 78,
		feedback: 'Card layout matches; avatar sizing slightly off.'
	},
	{
		userId: SEED_USER_IDS.alice,
		challengeIndex: 4,
		score: 55,
		feedback:
			'Core add/remove works; toggle styling and Enter handler need refinement.'
	},
	// Bob — middle of the pack
	{
		userId: SEED_USER_IDS.bob,
		challengeIndex: 1,
		score: 65,
		feedback: 'Counter functional; reset button styling is missing.'
	},
	{
		userId: SEED_USER_IDS.bob,
		challengeIndex: 2,
		score: 88,
		feedback: 'Strong layout fidelity; minor padding differences.'
	},
	{
		userId: SEED_USER_IDS.bob,
		challengeIndex: 3,
		score: 40,
		feedback:
			'Navbar renders but active state is not implemented — all links look identical.'
	},
	// Carol — just getting started
	{
		userId: SEED_USER_IDS.carol,
		challengeIndex: 0,
		score: 45,
		feedback:
			'Only the primary button is styled; secondary and destructive variants are missing.'
	},
	{
		userId: SEED_USER_IDS.carol,
		challengeIndex: 1,
		score: 70,
		feedback: 'Counter logic is correct; missing the reset control.'
	}
];

const main = async () => {
	const url = process.env.TURSO_DATABASE_URL;

	if (!url) {
		throw new Error(
			'TURSO_DATABASE_URL is not set. Add it to .env.local before running db:seed.'
		);
	}

	const client = createClient({
		url,
		authToken: process.env.TURSO_AUTH_TOKEN
	});
	const db = drizzle(client, { schema });

	// Ensure category column exists — db:push can fail silently on some setups.
	// SQLite ignores the error if the column already exists via this try/catch.
	console.log('Ensuring schema is up to date...');
	try {
		await client.execute(
			"ALTER TABLE challenge ADD COLUMN category TEXT NOT NULL DEFAULT ''"
		);
		console.log('  Added category column.');
	} catch {
		// Column already exists — safe to continue.
	}

	console.log('Wiping existing seed data...');

	// FK-safe order: submissions → challenge_files → challenges → users.
	// All scoped to seed user IDs so real OAuth users and their data survive.
	const seedChallenges = await db.query.challenges.findMany({
		where: inArray(challenges.creatorId, SEED_USER_ID_LIST)
	});
	const seedChallengeIds = seedChallenges.map(c => c.id);

	if (seedChallengeIds.length > 0) {
		await db
			.delete(submissions)
			.where(inArray(submissions.challengeId, seedChallengeIds));
		await db
			.delete(challengeFiles)
			.where(inArray(challengeFiles.challengeId, seedChallengeIds));
		await db.delete(challenges).where(inArray(challenges.id, seedChallengeIds));
	}

	// Also wipe submissions made BY seed users on any (now-deleted or real) challenges.
	await db
		.delete(submissions)
		.where(inArray(submissions.userId, SEED_USER_ID_LIST));

	await db.delete(users).where(inArray(users.id, SEED_USER_ID_LIST));

	console.log('Inserting seed users...');

	await db.insert(users).values([
		{
			id: SEED_USER_IDS.creator,
			email: 'seed-creator@reactice.local',
			name: 'Reactice Bot',
			image: null
		},
		{
			id: SEED_USER_IDS.alice,
			email: 'seed-alice@reactice.local',
			name: 'Alice Johnson',
			image: 'https://i.pravatar.cc/64?img=5'
		},
		{
			id: SEED_USER_IDS.bob,
			email: 'seed-bob@reactice.local',
			name: 'Bob Smith',
			image: 'https://i.pravatar.cc/64?img=12'
		},
		{
			id: SEED_USER_IDS.carol,
			email: 'seed-carol@reactice.local',
			name: 'Carol White',
			image: 'https://i.pravatar.cc/64?img=32'
		}
	]);

	console.log(`Inserting ${CHALLENGE_SEEDS.length} challenges...`);

	const challengeIds: string[] = [];

	for (const seed of CHALLENGE_SEEDS) {
		const [inserted] = await db
			.insert(challenges)
			.values({
				title: seed.title,
				description: seed.description,
				difficulty: seed.difficulty,
				category: seed.category,
				creatorId: SEED_USER_IDS.creator,
				referenceImageUrl: null
			})
			.returning({ id: challenges.id });

		if (!inserted) {
			throw new Error(`Failed to insert challenge "${seed.title}"`);
		}

		challengeIds.push(inserted.id);

		await db.insert(challengeFiles).values(
			seed.files.map(f => ({
				challengeId: inserted.id,
				name: f.name,
				content: f.content
			}))
		);
	}

	console.log(`Inserting ${SUBMISSION_SEEDS.length} submissions...`);

	await db.insert(submissions).values(
		SUBMISSION_SEEDS.map(s => {
			const challengeId = challengeIds[s.challengeIndex];

			if (!challengeId) {
				throw new Error(
					`Submission seed references invalid challenge index ${s.challengeIndex}`
				);
			}

			const challenge = CHALLENGE_SEEDS[s.challengeIndex];

			if (!challenge) {
				throw new Error(
					`Submission seed references invalid challenge index ${s.challengeIndex}`
				);
			}

			return {
				userId: s.userId,
				challengeId,
				submittedCode: challenge.files[0]?.content ?? '',
				score: s.score,
				feedback: s.feedback,
				pointsAwarded: computePoints(challenge.difficulty, s.score)
			};
		})
	);

	console.log('Seed complete.');
	console.log(`  users:       ${SEED_USER_ID_LIST.length}`);
	console.log(`  challenges:  ${CHALLENGE_SEEDS.length}`);
	console.log(`  submissions: ${SUBMISSION_SEEDS.length}`);
};

main().catch(err => {
	console.error('Seed failed:', err);
	process.exit(1);
});
