export default {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				'surface': 'var(--color-surface)',
				'on-surface': 'var(--color-on-surface)',
				'surface-container-heighest': 'var(--color-surface-container-heighest)',
				'outline': 'var(--color-outline)'
			}
		}
	}
};
