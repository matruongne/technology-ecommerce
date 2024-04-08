/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#f42c37',
				secondary: '#ff676f',
				brandYellow: '#fdc62e',
				brandGreen: '#2dcc6f',
				brandBlue: '#1376f4',
				brandWhite: '#eeeeee',
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '3rem',
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
	],
}
